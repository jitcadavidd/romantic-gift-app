# Romantic Gift Web App

Frontend-only romantic gift experience built with React, Vite, and TypeScript.

## Edit Content

Personalize all text, quiz answers, flower messages, photo paths, captions, and final reveal text in:

```txt
src/config/content.ts
```

YouTube embeds are also configured there:

- `backgroundMusicYoutubeUrl`
- `finalRevealVideoUrl` accepts a YouTube URL or a Google Drive file URL.

For a private Google Drive video, share the file only with the intended Google account, then paste the file link into `finalRevealVideoUrl`. The embed works only for viewers who have permission to that file.

## Add Photos

Place photos in:

```txt
public/photos/
```

The default config expects `photo1.jpg` through `photo5.jpg`.

## Run

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```
