import { getYouTubeEmbedUrl } from "./youtube";

function getGoogleDriveFileId(urlOrId: string) {
  const value = urlOrId.trim();

  if (!value || value.includes("DRIVE_FILE_ID_HERE")) {
    return null;
  }

  if (/^[a-zA-Z0-9_-]{20,}$/.test(value)) {
    return value;
  }

  try {
    const url = new URL(value);

    if (!url.hostname.includes("drive.google.com")) {
      return null;
    }

    const filePathMatch = url.pathname.match(/\/file\/d\/([^/]+)/);

    if (filePathMatch?.[1]) {
      return filePathMatch[1];
    }

    return url.searchParams.get("id");
  } catch {
    return null;
  }
}

function getGoogleDriveEmbedUrl(urlOrId: string) {
  const fileId = getGoogleDriveFileId(urlOrId);

  if (!fileId) {
    return null;
  }

  return `https://drive.google.com/file/d/${fileId}/preview`;
}

export function getVideoEmbedUrl(urlOrId: string) {
  return getGoogleDriveEmbedUrl(urlOrId) ?? getYouTubeEmbedUrl(urlOrId, { controls: true });
}
