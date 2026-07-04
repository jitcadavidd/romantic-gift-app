import { readFileSync, writeFileSync } from "node:fs";
import { inflateSync, deflateSync } from "node:zlib";

const source = "public/assets/paper/aged-parchment-letter.png";
const output = "public/assets/paper/aged-parchment-letter.png";

const pngSignature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
const colorTypeToChannels = new Map([
  [2, 3],
  [6, 4]
]);

function crc32(buffer) {
  let crc = 0xffffffff;

  for (const byte of buffer) {
    crc ^= byte;

    for (let index = 0; index < 8; index += 1) {
      crc = crc & 1 ? 0xedb88320 ^ (crc >>> 1) : crc >>> 1;
    }
  }

  return (crc ^ 0xffffffff) >>> 0;
}

function readChunks(buffer) {
  if (!buffer.subarray(0, 8).equals(pngSignature)) {
    throw new Error("Input is not a PNG file.");
  }

  const chunks = [];
  let offset = 8;

  while (offset < buffer.length) {
    const length = buffer.readUInt32BE(offset);
    const type = buffer.subarray(offset + 4, offset + 8).toString("ascii");
    const data = buffer.subarray(offset + 8, offset + 8 + length);
    chunks.push({ type, data });
    offset += 12 + length;

    if (type === "IEND") {
      break;
    }
  }

  return chunks;
}

function paethPredictor(left, above, upperLeft) {
  const p = left + above - upperLeft;
  const pa = Math.abs(p - left);
  const pb = Math.abs(p - above);
  const pc = Math.abs(p - upperLeft);

  if (pa <= pb && pa <= pc) {
    return left;
  }

  if (pb <= pc) {
    return above;
  }

  return upperLeft;
}

function unfilterScanlines(data, width, height, bytesPerPixel) {
  const stride = width * bytesPerPixel;
  const pixels = Buffer.alloc(stride * height);
  let sourceOffset = 0;

  for (let y = 0; y < height; y += 1) {
    const filter = data[sourceOffset];
    sourceOffset += 1;
    const rowStart = y * stride;
    const previousRowStart = rowStart - stride;

    for (let x = 0; x < stride; x += 1) {
      const raw = data[sourceOffset + x];
      const left = x >= bytesPerPixel ? pixels[rowStart + x - bytesPerPixel] : 0;
      const above = y > 0 ? pixels[previousRowStart + x] : 0;
      const upperLeft = y > 0 && x >= bytesPerPixel ? pixels[previousRowStart + x - bytesPerPixel] : 0;
      let value;

      if (filter === 0) {
        value = raw;
      } else if (filter === 1) {
        value = raw + left;
      } else if (filter === 2) {
        value = raw + above;
      } else if (filter === 3) {
        value = raw + Math.floor((left + above) / 2);
      } else if (filter === 4) {
        value = raw + paethPredictor(left, above, upperLeft);
      } else {
        throw new Error(`Unsupported PNG filter: ${filter}`);
      }

      pixels[rowStart + x] = value & 0xff;
    }

    sourceOffset += stride;
  }

  return pixels;
}

function isCheckerPixel(r, g, b) {
  const neutral = Math.max(r, g, b) - Math.min(r, g, b) <= 6;
  const bright = r >= 220 && g >= 220 && b >= 220;
  return neutral && bright;
}

function createChunk(type, data) {
  const typeBuffer = Buffer.from(type, "ascii");
  const chunk = Buffer.alloc(12 + data.length);
  chunk.writeUInt32BE(data.length, 0);
  typeBuffer.copy(chunk, 4);
  data.copy(chunk, 8);
  chunk.writeUInt32BE(crc32(Buffer.concat([typeBuffer, data])), 8 + data.length);
  return chunk;
}

const input = readFileSync(source);
const chunks = readChunks(input);
const ihdr = chunks.find((chunk) => chunk.type === "IHDR")?.data;

if (!ihdr) {
  throw new Error("Missing IHDR chunk.");
}

const width = ihdr.readUInt32BE(0);
const height = ihdr.readUInt32BE(4);
const bitDepth = ihdr[8];
const colorType = ihdr[9];
const interlace = ihdr[12];

if (bitDepth !== 8 || interlace !== 0 || !colorTypeToChannels.has(colorType)) {
  throw new Error("Only 8-bit non-interlaced RGB/RGBA PNG files are supported.");
}

const channels = colorTypeToChannels.get(colorType);
const compressed = Buffer.concat(chunks.filter((chunk) => chunk.type === "IDAT").map((chunk) => chunk.data));
const pixels = unfilterScanlines(inflateSync(compressed), width, height, channels);
const transparent = new Uint8Array(width * height);
const queue = [];

function enqueue(x, y) {
  if (x < 0 || y < 0 || x >= width || y >= height) {
    return;
  }

  const index = y * width + x;

  if (transparent[index]) {
    return;
  }

  const pixelOffset = index * channels;
  const r = pixels[pixelOffset];
  const g = pixels[pixelOffset + 1];
  const b = pixels[pixelOffset + 2];

  if (isCheckerPixel(r, g, b)) {
    transparent[index] = 1;
    queue.push([x, y]);
  }
}

for (let x = 0; x < width; x += 1) {
  enqueue(x, 0);
  enqueue(x, height - 1);
}

for (let y = 0; y < height; y += 1) {
  enqueue(0, y);
  enqueue(width - 1, y);
}

for (let index = 0; index < queue.length; index += 1) {
  const [x, y] = queue[index];
  enqueue(x + 1, y);
  enqueue(x - 1, y);
  enqueue(x, y + 1);
  enqueue(x, y - 1);
}

const rgba = Buffer.alloc(width * height * 4);

for (let index = 0; index < width * height; index += 1) {
  const sourceOffset = index * channels;
  const outputOffset = index * 4;
  rgba[outputOffset] = pixels[sourceOffset];
  rgba[outputOffset + 1] = pixels[sourceOffset + 1];
  rgba[outputOffset + 2] = pixels[sourceOffset + 2];
  rgba[outputOffset + 3] = transparent[index] ? 0 : channels === 4 ? pixels[sourceOffset + 3] : 255;
}

const scanlines = Buffer.alloc((width * 4 + 1) * height);

for (let y = 0; y < height; y += 1) {
  const rowStart = y * (width * 4 + 1);
  scanlines[rowStart] = 0;
  rgba.copy(scanlines, rowStart + 1, y * width * 4, (y + 1) * width * 4);
}

const outputIhdr = Buffer.from(ihdr);
outputIhdr[9] = 6;

writeFileSync(
  output,
  Buffer.concat([
    pngSignature,
    createChunk("IHDR", outputIhdr),
    createChunk("IDAT", deflateSync(scanlines, { level: 9 })),
    createChunk("IEND", Buffer.alloc(0))
  ])
);

console.log(`Cleaned parchment background: ${queue.length} pixels made transparent.`);
