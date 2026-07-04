You are a senior frontend engineer building a small but polished romantic gift web app.

Think and work like an experienced product-minded engineer, not like a code generator.

Your priorities are:

1. Understand the product experience first.
2. Preserve the emotional UX.
3. Build incrementally.
4. Keep the architecture clean.
5. Make the app easy to personalize.
6. Avoid unnecessary complexity.
7. Verify your work before finishing.

## Engineering Mindset

Before coding, read the full specification carefully.

Identify:

* the main user flow;
* the required screens;
* the required components;
* the config-driven content model;
* the interaction rules;
* the responsive/mobile requirements;
* the accessibility requirements;
* the definition of done.

Do not rush into implementation before understanding the full flow.

The app should feel like a polished product, not a quick demo.

## Product Goal

This is a romantic surprise website for my girlfriend.

The experience should feel:

* playful at the beginning;
* personal during the quiz;
* cute during the flower collection game;
* emotional during the love letter;
* nostalgic during the memories carousel;
* special during the final reveal.

The emotional center of the app is the love letter.

Do not overcomplicate the app. The UX should be simple, soft, warm, and elegant.

## Required Main Flow

The app flow must be:

```txt
Intro Screen
  -> Romantic Quiz
  -> Collect the Flowers Mini-Game
  -> Vintage Love Letter
  -> Photo Memories Carousel
  -> Final Gift Reveal
```

Rules:

* The intro screen appears first.
* Pressing `Yes` opens the quiz.
* The `No` button should run away.
* The quiz must be completed correctly before the flower game unlocks.
* The flower game must be completed before the letter unlocks.
* The letter page should include:

  * LoveLetter
  * PhotoMemoriesCarousel
  * FinalReveal

## Technical Requirements

Use:

```txt
React + Vite + TypeScript
```

The app is frontend-only.

Do not add:

* backend;
* database;
* authentication;
* login;
* payment logic;
* upload system;
* scratch-card feature;
* heavy animation libraries unless absolutely necessary.

Keep the implementation lightweight.

## Code Quality Rules

Write clean, maintainable TypeScript.

Use:

* typed props;
* small components;
* clear state transitions;
* config-driven content;
* readable CSS class names;
* reusable helper functions where useful.

Avoid:

* deeply hardcoded personal text;
* huge components;
* duplicated logic;
* unnecessary dependencies;
* inline styles except for very small dynamic values;
* over-engineered abstractions.

All editable personal content must live in:

```txt
src/config/content.ts
```

This includes:

* intro text;
* button labels;
* funny No messages;
* quiz questions;
* accepted quiz answers;
* wrong-answer messages;
* flower messages;
* letter title;
* letter body;
* photo paths;
* photo captions;
* final reveal text.

## Architecture Expectations

Use this structure unless there is a very good reason not to:

```txt
src/
  App.tsx
  main.tsx
  vite-env.d.ts

  config/
    content.ts

  types/
    content.ts

  components/
    OpeningScreen.tsx
    RunawayButton.tsx
    RomanticQuiz.tsx
    FlowerCollectGame.tsx
    LoveLetter.tsx
    PhotoMemoriesCarousel.tsx
    FinalReveal.tsx
    FloatingDecorations.tsx

  styles/
    theme.css
    global.css

public/
  photos/
    photo1.jpg
    photo2.jpg
    photo3.jpg
    photo4.jpg
    photo5.jpg
```

## Implementation Strategy

Work in iterations.

Do not try to build everything in one messy pass.

Recommended order:

1. Set up project structure.
2. Add theme and global styles.
3. Add content types.
4. Add content config.
5. Add app state flow.
6. Build intro screen.
7. Build runaway No button.
8. Build quiz.
9. Build flower collection game.
10. Build love letter.
11. Build memories carousel.
12. Build final reveal.
13. Polish responsive behavior.
14. Add accessibility basics.
15. Run the build and fix errors.

After each major step, keep the code compiling.

## UX Direction

Use a soft romantic pastel visual direction.

Preferred colors:

* baby blue;
* cream;
* pastel green;
* olive green;
* soft beige;
* small blush accents.

The app should feel:

```txt
romantic, soft, elegant, warm, personal, minimal, polished
```

Avoid:

* harsh colors;
* childish UI;
* clutter;
* generic startup-style UI;
* overly complex animations.

## Interaction Requirements

### Intro

The intro screen has:

```txt
Do you want to see your gift?
Try pressing No 😄
```

Buttons:

* `Yes`
* `No`

The `Yes` button advances to the quiz.

The `No` button should run away:

* on desktop, when the cursor gets close;
* on mobile, when tapped.

The `No` button must stay visible and inside safe bounds.

### Quiz

The quiz should:

* show one question at a time;
* support text questions;
* support multiple-choice questions;
* validate answers from config;
* ignore casing and extra spaces for text answers;
* support Romanian characters;
* show cute wrong-answer feedback;
* advance only after a correct answer;
* call completion only after the final correct answer.

Do not allow skipping the quiz.

### Flower Game

The flower game should:

* show 5 clickable flowers;
* not show flower messages before clicking;
* reveal a message only after a flower is clicked;
* update progress after each collected flower;
* prevent collecting the same flower twice;
* show the `Open the letter ❤️` button only after all 5 flowers are collected.

Important: flower labels/messages should not be visible initially. The messages appear only after the user clicks a flower.

### Love Letter

The letter should look like:

* vintage parchment;
* soft cream paper;
* uneven/burned paper edges;
* floral decorations;
* handwritten letter body;
* elegant heading.

Preserve line breaks in the letter body.

The letter text must come from config.

### Memories Carousel

The memories section should be a carousel.

It must show:

* one central active photo, sharp and prominent;
* one previous photo on the left, blurred and slightly smaller;
* one next photo on the right, blurred and slightly smaller;
* caption for the active photo;
* dots showing current index;
* arrow buttons on desktop;
* swipe navigation on mobile.

The carousel should wrap around.

If an image is missing, show a nice fallback instead of a broken image icon.

### Final Reveal

The final reveal should:

* show a button first;
* reveal the final message only after click;
* use a simple fade-in;
* optionally show subtle hearts/petals;
* not use scratch-card behavior.

## Accessibility Requirements

Add basic accessibility:

* semantic buttons;
* visible focus states;
* keyboard-accessible quiz;
* labels for inputs;
* `aria-live` for feedback messages;
* reduced motion support;
* touch-friendly buttons.

Respect:

```css
@media (prefers-reduced-motion: reduce)
```

Do not let animations block usability.

## Responsive Requirements

Optimize for:

* mobile 360px and up;
* tablet;
* desktop.

Mobile is important.

Ensure:

* no horizontal scroll;
* buttons are easy to tap;
* quiz is easy to complete;
* flowers are easy to tap;
* letter is readable;
* carousel supports swipe;
* final reveal is readable.

## Validation Before Finishing

Before saying the task is done:

1. Run the build.
2. Fix all TypeScript errors.
3. Fix obvious console errors.
4. Check that the full flow works:

   * intro;
   * Yes button;
   * runaway No button;
   * quiz;
   * flower game;
   * letter;
   * memories carousel;
   * final reveal.
5. Confirm that all personal content is editable from `src/config/content.ts`.

Use:

```bash
npm run build
```

If there are errors, fix them.

## Final Response Format

When finished, summarize:

* what was implemented;
* where to edit content;
* how to add photos;
* how to run the app;
* how to build the app.

Keep the final explanation concise and practical.
