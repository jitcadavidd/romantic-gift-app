export function getYouTubeVideoId(urlOrId: string) {
  const value = urlOrId.trim();

  if (!value || value.includes("VIDEO_ID_HERE") || value.includes("MUSIC_VIDEO_ID_HERE")) {
    return null;
  }

  if (/^[a-zA-Z0-9_-]{11}$/.test(value)) {
    return value;
  }

  try {
    const url = new URL(value);

    if (url.hostname.includes("youtu.be")) {
      return url.pathname.split("/").filter(Boolean)[0] ?? null;
    }

    if (url.searchParams.has("v")) {
      return url.searchParams.get("v");
    }

    const embedMatch = url.pathname.match(/\/(?:embed|shorts)\/([a-zA-Z0-9_-]{11})/);
    return embedMatch?.[1] ?? null;
  } catch {
    return null;
  }
}

export function getYouTubeEmbedUrl(
  urlOrId: string,
  options: {
    autoplay?: boolean;
    controls?: boolean;
    loop?: boolean;
    mute?: boolean;
  } = {}
) {
  const videoId = getYouTubeVideoId(urlOrId);

  if (!videoId) {
    return null;
  }

  const params = new URLSearchParams({
    rel: "0",
    modestbranding: "1",
    playsinline: "1"
  });

  if (options.autoplay) {
    params.set("autoplay", "1");
  }

  if (options.controls === false) {
    params.set("controls", "0");
  }

  if (options.loop) {
    params.set("loop", "1");
    params.set("playlist", videoId);
  }

  if (options.mute) {
    params.set("mute", "1");
  }

  return `https://www.youtube.com/embed/${videoId}?${params.toString()}`;
}
