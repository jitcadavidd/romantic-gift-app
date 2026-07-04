# Romantic Gift Web App Product Spec

## Product Promise

A soft, personal, romantic web experience that begins playfully, earns the love letter through small interactions, and ends with a private final gift reveal.

## Primary Flow

```txt
Intro -> Quiz -> Flower Collection -> Letter Page
```

The letter page contains the vintage love letter, the memories carousel, and the final reveal.

## Product Rules

- The intro screen is always first.
- `Yes` starts the quiz.
- `No` is playful and evasive, never destructive.
- The quiz cannot be skipped.
- The flower game cannot be skipped.
- Flower messages appear only after their flower is clicked.
- The final reveal message appears only after the reveal button is clicked.
- All personal copy, quiz data, photos, captions, and final reveal text live in `src/config/content.ts`.

## Experience Tone

- Intro: playful.
- Quiz: personal and teasing.
- Flowers: cute and anticipatory.
- Letter: emotional center.
- Memories: nostalgic.
- Final reveal: special and private.

## Non-Goals

- Backend, database, auth, login, payments, uploads, routing, scratch-card, heavy animation libraries.
