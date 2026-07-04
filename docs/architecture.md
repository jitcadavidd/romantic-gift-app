# Romantic Gift Web App — Complete Engineering Architecture & Delivery Plan

## 1. Product Overview

Build a small romantic one-page web experience as a surprise gift for my girlfriend.

The app should feel:

* playful at the beginning;
* personal and romantic during the quiz;
* cute and emotional during the flower collection mini-game;
* warm, vintage, and intimate during the love letter;
* elegant and nostalgic during the memories gallery;
* special at the final gift reveal.

The app is frontend-only. No backend is required.

The final result should be easy to personalize by editing one config file.

---

## 2. Main User Journey

```txt
Intro Screen
  ↓
Click Yes
  ↓
Romantic Quiz
  ↓
Answer all quiz questions correctly
  ↓
Collect the Flowers Mini-Game
  ↓
Collect all 5 flowers
  ↓
Vintage Love Letter
  ↓
Photo Memories Carousel
  ↓
Final Gift Reveal
```

Important:

* No backend.
* No database.
* No login.
* No scratch-card feature.
* The quiz must be completed before the flower game.
* The flower game must be completed before the love letter.
* The love letter is the emotional core of the experience.
* All personal text, quiz questions, flower messages, photo paths, captions, and final reveal text should live in one config file.

---

# 3. Recommended Tech Stack

Use:

```txt
React + Vite + TypeScript
```

Recommended setup:

```bash
npm create vite@latest romantic-gift -- --template react-ts
cd romantic-gift
npm install
npm run dev
```

Optional dependency:

```bash
npm install clsx
```

Avoid heavy dependencies unless absolutely necessary.

Do not add backend libraries.

---

# 4. Visual Direction

## 4.1 Theme

The visual style should be:

```txt
Romantic, soft, pastel, elegant, personal, warm, feminine, minimal
```

## 4.2 Color Palette

She likes:

* pastel baby blue;
* cream;
* pastel green;
* olive green.

Use this palette:

```css
:root {
  --color-baby-blue: #d7e8f7;
  --color-baby-blue-soft: #edf7fc;

  --color-cream: #fff7e6;
  --color-cream-soft: #fffaf0;

  --color-pastel-green: #dce9d1;
  --color-pastel-green-soft: #eef6e8;

  --color-olive: #7a8f5a;
  --color-olive-dark: #5f7044;

  --color-soft-beige: #f2e9d8;
  --color-paper: #f8ecd0;
  --color-paper-dark: #d8b979;

  --color-blush: #f2b8b5;
  --color-text: #4d5738;
}
```

## 4.3 Typography

Use elegant fonts.

Recommended Google Fonts:

```txt
Headings: Playfair Display or Cormorant Garamond
Body/UI: Inter or Nunito
Letter handwriting: Dancing Script, Great Vibes, Caveat, or Parisienne
```

Suggested CSS variables:

```css
:root {
  --font-ui: Inter, Nunito, system-ui, sans-serif;
  --font-heading: "Playfair Display", "Cormorant Garamond", Georgia, serif;
  --font-handwritten: "Dancing Script", "Great Vibes", "Caveat", cursive;
}
```

---

# 5. Application State Flow

Use a simple step-based app state.

```ts
type AppStep = "intro" | "quiz" | "flowers" | "letter";
```

State transition:

```txt
intro
  ↓ on Yes click
quiz
  ↓ after all quiz questions are answered correctly
flowers
  ↓ after all 5 flowers are collected and user clicks Open Letter
letter
```

Inside the `letter` step, render:

```txt
LoveLetter
PhotoMemoriesCarousel
FinalReveal
```

---

# 6. Suggested File Structure

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

---

# 7. Data Types

Create:

```txt
src/types/content.ts
```

Use:

```ts
export type QuizQuestion =
  | {
      id: string;
      type: "text";
      question: string;
      acceptedAnswers: string[];
      placeholder?: string;
    }
  | {
      id: string;
      type: "multiple-choice";
      question: string;
      options: string[];
      correctAnswer: string;
    };

export type FlowerMessage = {
  id: string;
  label: string;
  message: string;
};

export type PhotoMemory = {
  src: string;
  caption: string;
};

export type RomanticContent = {
  introTitle: string;
  introSubtitle: string;
  yesButtonLabel: string;
  noButtonLabel: string;
  noButtonMessages: string[];

  quizTitle: string;
  quizSubtitle: string;
  wrongAnswerMessages: string[];
  quizQuestions: QuizQuestion[];

  flowersTitle: string;
  flowersSubtitle: string;
  flowersProgressLabel: string;
  flowerMessages: FlowerMessage[];
  openLetterButtonLabel: string;

  letterTitle: string;
  letterBody: string;

  memoriesTitle: string;
  memoriesSubtitle: string;
  photos: PhotoMemory[];

  finalRevealTitle: string;
  finalRevealButtonLabel: string;
  finalRevealText: string;
};
```

---

# 8. Content Config

Create:

```txt
src/config/content.ts
```

Use:

```ts
import type { RomanticContent } from "../types/content";

export const romanticContent: RomanticContent = {
  introTitle: "Do you want to see your gift?",
  introSubtitle: "Try pressing No 😄",
  yesButtonLabel: "Yes ❤️",
  noButtonLabel: "No",

  noButtonMessages: [
    "Nope, wrong answer 😄",
    "Try again, but maybe choose Yes",
    "This button is emotionally unavailable",
    "You were not supposed to click that",
    "Okay, I’ll make it easier: press Yes ❤️"
  ],

  quizTitle: "Before you open your gift...",
  quizSubtitle: "You need to answer a few very important questions 😄",

  wrongAnswerMessages: [
    "Hmm, almost 😄 Try again.",
    "Are you sure? I think your heart knows this one ❤️",
    "Wrong, but cute answer.",
    "No worries, I’ll give you another try.",
    "Think about us for a second 😄"
  ],

  quizQuestions: [
    {
      id: "memory-place",
      question: "Where did we have one of our favorite memories?",
      type: "text",
      acceptedAnswers: ["PLACEHOLDER ANSWER"],
      placeholder: "Type your answer..."
    },
    {
      id: "thing-i-say",
      question: "What is something I always say to you?",
      type: "text",
      acceptedAnswers: ["PLACEHOLDER ANSWER"],
      placeholder: "Type your answer..."
    },
    {
      id: "favorite-thing",
      question: "What is my favorite thing about you?",
      type: "multiple-choice",
      options: [
        "Your smile",
        "Your heart",
        "Your patience",
        "All of the above"
      ],
      correctAnswer: "All of the above"
    },
    {
      id: "do-i-love-you",
      question: "Do I love you?",
      type: "multiple-choice",
      options: [
        "Yes",
        "Very much",
        "More than you know",
        "All answers are correct"
      ],
      correctAnswer: "All answers are correct"
    }
  ],

  flowersTitle: "Before the letter opens...",
  flowersSubtitle: "Collect 5 little flowers 🌸",
  flowersProgressLabel: "flowers collected",
  openLetterButtonLabel: "Open the letter ❤️",

  flowerMessages: [
    {
      id: "smile",
      label: "Flower 1",
      message: "Pentru zâmbetul tău"
    },
    {
      id: "patience",
      label: "Flower 2",
      message: "Pentru răbdarea ta"
    },
    {
      id: "happiness",
      label: "Flower 3",
      message: "Pentru felul în care mă faci fericit"
    },
    {
      id: "kindness",
      label: "Flower 4",
      message: "Pentru bunătatea ta"
    },
    {
      id: "you",
      label: "Flower 5",
      message: "Pentru că ești tu"
    }
  ],

  letterTitle: "My love,",

  letterBody: `
[Write personal letter here...]

With love,
[Name]
  `,

  memoriesTitle: "Our memories",
  memoriesSubtitle: "A collection of our favorite moments together",

  photos: [
    {
      src: "/photos/photo1.jpg",
      caption: "Sunset by the sea"
    },
    {
      src: "/photos/photo2.jpg",
      caption: "One of my favorite days"
    },
    {
      src: "/photos/photo3.jpg",
      caption: "Us ❤️"
    },
    {
      src: "/photos/photo4.jpg",
      caption: "A memory I love"
    },
    {
      src: "/photos/photo5.jpg",
      caption: "Another beautiful moment"
    }
  ],

  finalRevealTitle: "Your final surprise is here",
  finalRevealButtonLabel: "Open final surprise ❤️",
  finalRevealText:
    "Your real gift is waiting for you... Look in [PLACEHOLDER LOCATION] ❤️"
};
```

---

# 9. Component Architecture

## 9.1 App Component

File:

```txt
src/App.tsx
```

Responsibilities:

* Own main app state.
* Render current screen.
* Pass callbacks to child components.
* Keep flow simple and predictable.

State:

```ts
const [step, setStep] = useState<AppStep>("intro");
```

Render logic:

```tsx
if (step === "intro") {
  return <OpeningScreen onYes={() => setStep("quiz")} />;
}

if (step === "quiz") {
  return <RomanticQuiz onComplete={() => setStep("flowers")} />;
}

if (step === "flowers") {
  return <FlowerCollectGame onComplete={() => setStep("letter")} />;
}

return (
  <>
    <LoveLetter />
    <PhotoMemoriesCarousel />
    <FinalReveal />
  </>
);
```

Acceptance criteria:

* App starts on intro.
* Yes moves to quiz.
* Quiz completion moves to flower game.
* Flower game completion moves to letter page.
* Letter page contains love letter, memories carousel, and final reveal.

---

## 9.2 OpeningScreen Component

File:

```txt
src/components/OpeningScreen.tsx
```

Responsibilities:

* Display intro title and subtitle.
* Display Yes button.
* Display runaway No button.
* Display funny message after failed No attempts.

Props:

```ts
type OpeningScreenProps = {
  onYes: () => void;
};
```

Behavior:

* Clicking `Yes` calls `onYes`.
* `No` is rendered through `RunawayButton`.
* Failed `No` attempts rotate through funny messages.
* Feedback should be visually cute and accessible.

Acceptance criteria:

* Content comes from config.
* Yes button advances to quiz.
* No button is playful.
* Funny messages update.
* Works on desktop and mobile.

---

## 9.3 RunawayButton Component

File:

```txt
src/components/RunawayButton.tsx
```

Responsibilities:

* Render a button that moves away from the cursor.
* Handle desktop mouse proximity.
* Handle mobile tap.
* Keep position inside safe visible bounds.

Props:

```ts
type RunawayButtonProps = {
  label: string;
  onAttempt: () => void;
};
```

Implementation notes:

* Use `useRef` to measure the button and container.
* Use absolute positioning.
* On desktop, move when cursor is within a threshold.
* On mobile, move when tapped.
* Threshold example: `100px`.
* Button should not leave the card or viewport.

Pseudo logic:

```ts
const MOVE_THRESHOLD = 100;

function moveButton() {
  const maxX = containerWidth - buttonWidth;
  const maxY = containerHeight - buttonHeight;

  const nextX = Math.random() * maxX;
  const nextY = Math.random() * maxY;

  setPosition({ x: nextX, y: nextY });
}
```

Acceptance criteria:

* Button moves before easy click on desktop.
* Button moves on tap on mobile.
* Button remains visible.
* No layout jumps.
* No infinite render loop.

---

## 9.4 RomanticQuiz Component

File:

```txt
src/components/RomanticQuiz.tsx
```

Responsibilities:

* Show one question at a time.
* Support text questions.
* Support multiple-choice questions.
* Validate answers.
* Advance only after correct answer.
* Show wrong-answer feedback.
* Call `onComplete` after final question.

Props:

```ts
type RomanticQuizProps = {
  onComplete: () => void;
};
```

State:

```ts
const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
const [textAnswer, setTextAnswer] = useState("");
const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);
```

Answer normalization:

```ts
function normalizeAnswer(value: string) {
  return value
    .trim()
    .toLocaleLowerCase("ro-RO")
    .normalize("NFC");
}
```

Text-answer validation:

```ts
function isTextAnswerCorrect(input: string, acceptedAnswers: string[]) {
  const normalizedInput = normalizeAnswer(input);

  return acceptedAnswers.some(
    answer => normalizeAnswer(answer) === normalizedInput
  );
}
```

Multiple-choice validation:

```ts
selectedOption === question.correctAnswer
```

Acceptance criteria:

* Shows question progress, e.g. `Question 1 / 4`.
* Supports text questions.
* Supports multiple-choice questions.
* Wrong answers do not advance.
* Correct answers advance.
* Final correct answer moves to flower game.
* All questions come from config.

---

## 9.5 FlowerCollectGame Component

File:

```txt
src/components/FlowerCollectGame.tsx
```

Responsibilities:

* Show 5 clickable flowers.
* Track collected flowers.
* Show a romantic message for each collected flower.
* Show progress.
* Unlock the letter after all flowers are collected.

Props:

```ts
type FlowerCollectGameProps = {
  onComplete: () => void;
};
```

State:

```ts
const [collectedFlowerIds, setCollectedFlowerIds] = useState<string[]>([]);
const [activeMessage, setActiveMessage] = useState<string | null>(null);
```

Behavior:

* Render flowers from `romanticContent.flowerMessages`.
* When a flower is clicked:

  * add its id to collected flowers;
  * show its message;
  * visually mark it as collected;
  * update progress.
* Once all 5 are collected:

  * show `Open the letter ❤️` button.
* Clicking `Open the letter ❤️` calls `onComplete`.

UI text:

```txt
Before the letter opens...
Collect 5 little flowers 🌸
```

Progress example:

```txt
3 / 5 flowers collected
```

Visual style:

* baby blue background;
* cream card;
* pastel green flowers;
* olive accents;
* soft floral corners;
* small hearts/petals;
* gentle fade animations.

Acceptance criteria:

* 5 flowers display.
* Each flower is clickable/tappable.
* Each flower shows its own message.
* Collected flowers cannot be collected twice.
* Progress updates correctly.
* Letter unlock button appears only after all flowers are collected.
* Works on mobile.

---

## 9.6 LoveLetter Component

File:

```txt
src/components/LoveLetter.tsx
```

Responsibilities:

* Render vintage parchment letter.
* Show letter title.
* Show letter body.
* Preserve line breaks.
* Add floral decorations.
* Add reveal animation.

Design requirements:

* Old parchment paper background.
* Cream/paper color.
* Uneven paper edges.
* Slight burned-paper effect.
* Olive/green decorative floral elements.
* Handwritten-style font for body.
* Elegant serif heading.

Implementation notes:

* Use `white-space: pre-line` for letter body.
* Use CSS pseudo-elements for paper texture.
* Use gradients and shadows for burned edge effect.

Acceptance criteria:

* Letter looks like old romantic paper.
* Text remains readable.
* Letter content comes from config.
* Works on mobile.
* Reduced motion disables heavy animations.

---

## 9.7 PhotoMemoriesCarousel Component

File:

```txt
src/components/PhotoMemoriesCarousel.tsx
```

Responsibilities:

* Render memories section.
* Show one central active photo.
* Show one blurry previous photo on the left.
* Show one blurry next photo on the right.
* Allow navigation by swipe on mobile.
* Allow navigation by arrow buttons on desktop.
* Show photo caption.
* Show carousel dots.

Design requirement:

```txt
One central photo is sharp and prominent.
One side photo appears on the left, blurred and slightly smaller.
One side photo appears on the right, blurred and slightly smaller.
The side photos suggest there are more memories to explore.
```

Behavior:

* Use `activeIndex` state.
* Previous and next photo should wrap around.
* Left arrow moves to previous photo.
* Right arrow moves to next photo.
* Swipe left on mobile moves to next photo.
* Swipe right on mobile moves to previous photo.
* Dots indicate current photo.
* Caption updates with active photo.

State:

```ts
const [activeIndex, setActiveIndex] = useState(0);
```

Helper logic:

```ts
const photos = romanticContent.photos;

const previousIndex =
  activeIndex === 0 ? photos.length - 1 : activeIndex - 1;

const nextIndex =
  activeIndex === photos.length - 1 ? 0 : activeIndex + 1;
```

Mobile swipe implementation:

* Track `touchstart` x position.
* Track `touchend` x position.
* If difference is greater than threshold, move carousel.
* Example threshold: `40px`.

Pseudo logic:

```ts
const SWIPE_THRESHOLD = 40;

function handleTouchStart(event) {
  setTouchStartX(event.touches[0].clientX);
}

function handleTouchEnd(event) {
  const touchEndX = event.changedTouches[0].clientX;
  const deltaX = touchStartX - touchEndX;

  if (deltaX > SWIPE_THRESHOLD) {
    goToNextPhoto();
  }

  if (deltaX < -SWIPE_THRESHOLD) {
    goToPreviousPhoto();
  }
}
```

Visual style:

* central photo as polaroid;
* side photos blurred with `filter: blur(4px)`;
* side photos lower opacity;
* soft shadows;
* baby blue background;
* cream cards;
* olive arrows;
* floral corners.

Acceptance criteria:

* Central photo is sharp.
* Left and right photos are blurred.
* Arrows work on desktop.
* Swipe works on mobile.
* Carousel wraps around.
* Dots update correctly.
* Caption updates correctly.
* Missing image does not break page.

---

## 9.8 FinalReveal Component

File:

```txt
src/components/FinalReveal.tsx
```

Responsibilities:

* Render final reveal title.
* Render final reveal button.
* Show final message only after click.
* Add subtle animation.

State:

```ts
const [isRevealed, setIsRevealed] = useState(false);
```

Behavior:

* Initially show button.
* On click, reveal message card.
* Message comes from config.
* Optional petals/hearts animation.
* No scratch-card effect.

Acceptance criteria:

* Final message is hidden initially.
* Click reveals message.
* Text comes from config.
* Works on mobile.
* No scratch-card behavior exists.

---

## 9.9 FloatingDecorations Component

File:

```txt
src/components/FloatingDecorations.tsx
```

Responsibilities:

* Render small decorative petals/hearts.
* Add ambience.
* Do not interfere with interactions.

CSS requirement:

```css
.floating-decorations {
  pointer-events: none;
}
```

Acceptance criteria:

* Decorations do not block clicks.
* Motion is subtle.
* Reduced motion disables animation.

---

# 10. Styling Architecture

## 10.1 CSS Files

Use:

```txt
src/styles/theme.css
src/styles/global.css
```

Import them in:

```txt
src/main.tsx
```

```ts
import "./styles/theme.css";
import "./styles/global.css";
```

---

## 10.2 theme.css

```css
:root {
  --color-baby-blue: #d7e8f7;
  --color-baby-blue-soft: #edf7fc;

  --color-cream: #fff7e6;
  --color-cream-soft: #fffaf0;

  --color-pastel-green: #dce9d1;
  --color-pastel-green-soft: #eef6e8;

  --color-olive: #7a8f5a;
  --color-olive-dark: #5f7044;

  --color-soft-beige: #f2e9d8;
  --color-paper: #f8ecd0;
  --color-paper-dark: #d8b979;

  --color-blush: #f2b8b5;
  --color-text: #4d5738;

  --shadow-soft: 0 16px 50px rgba(77, 87, 56, 0.16);
  --shadow-card: 0 10px 30px rgba(77, 87, 56, 0.14);

  --radius-xl: 36px;
  --radius-lg: 28px;
  --radius-md: 18px;
  --radius-sm: 12px;

  --font-ui: Inter, Nunito, system-ui, sans-serif;
  --font-heading: "Playfair Display", "Cormorant Garamond", Georgia, serif;
  --font-handwritten: "Dancing Script", "Great Vibes", "Caveat", cursive;
}
```

---

## 10.3 global.css

```css
* {
  box-sizing: border-box;
}

html {
  min-height: 100%;
}

body {
  margin: 0;
  min-height: 100vh;
  font-family: var(--font-ui);
  color: var(--color-text);
  background:
    radial-gradient(circle at top left, rgba(215, 232, 247, 0.9), transparent 35%),
    radial-gradient(circle at bottom right, rgba(220, 233, 209, 0.9), transparent 40%),
    var(--color-cream-soft);
}

button,
input {
  font: inherit;
}

button {
  cursor: pointer;
}

img {
  max-width: 100%;
  display: block;
}

button:focus-visible,
input:focus-visible {
  outline: 3px solid rgba(122, 143, 90, 0.5);
  outline-offset: 3px;
}

@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation: none !important;
    transition: none !important;
    scroll-behavior: auto !important;
  }
}
```

---

# 11. Accessibility Requirements

Must include:

* Semantic buttons.
* Visible focus states.
* Keyboard-accessible quiz.
* Labels for text inputs.
* `aria-live` for feedback messages.
* Touch-friendly button sizes.
* Reduced motion support.
* Sufficient contrast.

Examples:

```tsx
<p role="status" aria-live="polite">
  {feedbackMessage}
</p>
```

```tsx
<label htmlFor="quiz-answer">Your answer</label>
<input id="quiz-answer" />
```

Acceptance criteria:

* User can tab through the flow.
* User can answer quiz with keyboard.
* Feedback is accessible.
* Reduced motion is respected.

---

# 12. Responsive Requirements

Support:

* Mobile: 360px width and above.
* Tablet.
* Desktop.

Mobile behavior:

* Intro card centered.
* Quiz card full-width with padding.
* Flower game flowers are easy to tap.
* Letter text remains readable.
* Memories carousel supports swipe.
* Final reveal is easy to tap.
* No horizontal scrolling.

Desktop behavior:

* Intro centered.
* Quiz card centered.
* Flower layout uses more spacing.
* Memories carousel uses left/right arrow buttons.
* Central photo is prominent.

Acceptance criteria:

* No horizontal overflow.
* Buttons are large enough.
* Text is readable.
* Carousel works on mobile and desktop.
* Runaway button stays visible.

---

# 13. Epic / Stories / Tasks

## Epic 1 — Project Foundation

### Goal

Set up the React/Vite/TypeScript project with a clean architecture, content config, and app state flow.

---

### Story 1.1 — Create Project

As a developer, I want a clean Vite React TypeScript project so the app is fast and maintainable.

Tasks:

* Create Vite React TypeScript project.
* Remove default Vite boilerplate.
* Add `theme.css`.
* Add `global.css`.
* Import CSS in `main.tsx`.
* Confirm app runs.

Acceptance criteria:

* `npm install` works.
* `npm run dev` works.
* App loads without console errors.
* Default Vite UI is removed.

---

### Story 1.2 — Add TypeScript Models

As a developer, I want strong types for the content config so changes are safe.

Tasks:

* Create `src/types/content.ts`.
* Add `QuizQuestion`.
* Add `FlowerMessage`.
* Add `PhotoMemory`.
* Add `RomanticContent`.

Acceptance criteria:

* Config is type-checked.
* Components can use typed content.
* TypeScript catches invalid config fields.

---

### Story 1.3 — Add Content Config

As a developer, I want all editable content in one place.

Tasks:

* Create `src/config/content.ts`.
* Add intro copy.
* Add quiz questions.
* Add flower messages.
* Add letter content.
* Add photo paths and captions.
* Add final reveal text.

Acceptance criteria:

* No personal content is deeply hardcoded.
* Config imports successfully.
* App builds with config.

---

### Story 1.4 — Add App State Navigation

As a user, I want the experience to progress through the correct screens.

Tasks:

* Create `AppStep` type.
* Add state in `App.tsx`.
* Add placeholder components.
* Wire flow:

  * intro → quiz
  * quiz → flowers
  * flowers → letter

Acceptance criteria:

* App starts on intro.
* Yes opens quiz.
* Quiz completion opens flowers.
* Flower completion opens letter.
* Letter page includes letter, carousel, final reveal.

---

## Epic 2 — Intro Experience

### Goal

Create the playful first screen with Yes/No buttons and runaway behavior.

---

### Story 2.1 — Build Intro UI

Tasks:

* Implement `OpeningScreen`.
* Show intro title.
* Show intro subtitle.
* Add romantic centered card.
* Add baby blue background.
* Add cream card.
* Add floral/petal decorations.
* Add Yes and No buttons.

Acceptance criteria:

* Screen matches pastel romantic direction.
* Text comes from config.
* Layout works on mobile and desktop.

---

### Story 2.2 — Implement Yes Button

Tasks:

* Add `onYes` prop.
* Call `onYes` on click.
* Add subtle button animation.
* Ensure keyboard accessibility.

Acceptance criteria:

* Yes advances to quiz.
* Button is accessible.
* No console errors.

---

### Story 2.3 — Implement Runaway No Button

Tasks:

* Create `RunawayButton`.
* Add absolute positioning.
* Track x/y state.
* Detect mouse proximity.
* Move to random safe position.
* Move on mobile tap.
* Trigger `onAttempt`.

Acceptance criteria:

* No button moves away on desktop.
* No button moves on mobile tap.
* Button remains visible.
* Movement is smooth.

---

### Story 2.4 — Add Funny No Messages

Tasks:

* Track message index.
* Rotate through no button messages.
* Show message below buttons.
* Add `aria-live`.

Acceptance criteria:

* Message changes after No attempt.
* Message comes from config.
* Feedback is accessible.

---

## Epic 3 — Romantic Quiz

### Goal

Create a personal quiz that must be completed before the flower game unlocks.

---

### Story 3.1 — Build Quiz Layout

Tasks:

* Implement `RomanticQuiz`.
* Show quiz title.
* Show quiz subtitle.
* Show progress indicator.
* Show one question at a time.
* Add romantic card styling.

Acceptance criteria:

* First question renders.
* Progress indicator works.
* Layout works on mobile.

---

### Story 3.2 — Text Questions

Tasks:

* Render text input for text questions.
* Add submit button.
* Allow Enter key submit.
* Normalize answer.
* Compare to accepted answers.

Acceptance criteria:

* Text answers validate correctly.
* Case and spaces are ignored.
* Romanian characters work.
* Wrong answers do not advance.

---

### Story 3.3 — Multiple-Choice Questions

Tasks:

* Render option buttons.
* Validate selected option.
* Advance only on correct answer.
* Show feedback on wrong answer.

Acceptance criteria:

* Options render from config.
* Correct option advances.
* Wrong option shows feedback.
* Keyboard navigation works.

---

### Story 3.4 — Complete Quiz

Tasks:

* Track question index.
* Move to next question on correct answer.
* Call `onComplete` after final correct answer.
* Add optional success animation.

Acceptance criteria:

* All questions must be correct.
* No skipping.
* Completion opens flower game.

---

## Epic 4 — Flower Collection Mini-Game

### Goal

Create a cute flower collection interaction before the letter unlocks.

---

### Story 4.1 — Build Flower Game Layout

Tasks:

* Implement `FlowerCollectGame`.
* Show title from config.
* Show subtitle from config.
* Render romantic card.
* Add 5 flower buttons.
* Add progress indicator.

Acceptance criteria:

* 5 flowers render.
* Title/subtitle come from config.
* Progress starts at `0 / 5`.
* Mobile layout works.

---

### Story 4.2 — Collect Flowers

Tasks:

* Track collected flowers.
* On flower click, mark it collected.
* Prevent duplicate collection.
* Fade or check collected flower.
* Update progress.

Acceptance criteria:

* Each flower can be collected once.
* Progress updates correctly.
* Collected flowers are visually different.

---

### Story 4.3 — Show Flower Messages

Tasks:

* Show message for clicked flower.
* Message comes from config.
* Add gentle fade animation.
* Add `aria-live`.

Acceptance criteria:

* Each flower displays correct message.
* Message is visible and readable.
* Feedback is accessible.

---

### Story 4.4 — Unlock Letter

Tasks:

* Detect when all 5 flowers are collected.
* Show `Open the letter ❤️` button.
* Call `onComplete` when clicked.

Acceptance criteria:

* Button appears only after all flowers are collected.
* Clicking button opens letter page.
* No way to skip flower collection.

---

## Epic 5 — Vintage Love Letter

### Goal

Create the emotional core of the app: a vintage handwritten love letter.

---

### Story 5.1 — Build Letter Component

Tasks:

* Implement `LoveLetter`.
* Read title from config.
* Read body from config.
* Preserve line breaks.
* Add semantic structure.

Acceptance criteria:

* Letter content displays.
* Line breaks preserved.
* Content configurable.

---

### Story 5.2 — Parchment Styling

Tasks:

* Add parchment background.
* Add warm paper colors.
* Add paper texture.
* Add uneven/burned edges.
* Add soft shadow.

Acceptance criteria:

* Letter looks vintage.
* Text is readable.
* Works on mobile.

---

### Story 5.3 — Floral Decorations

Tasks:

* Add floral corners.
* Use olive/pastel green accents.
* Keep decorations subtle.
* Ensure text is not covered.

Acceptance criteria:

* Letter has romantic floral accents.
* Decorations do not distract.
* Layout remains readable.

---

### Story 5.4 — Reveal Animation

Tasks:

* Add fade/unfold animation.
* Respect reduced motion.

Acceptance criteria:

* Letter reveal feels smooth.
* Reduced motion disables animation.

---

## Epic 6 — Photo Memories Carousel

### Goal

Create a romantic memories gallery with one central photo and blurred side photos.

---

### Story 6.1 — Build Carousel Layout

Tasks:

* Implement `PhotoMemoriesCarousel`.
* Show title from config.
* Show subtitle from config.
* Show central active photo.
* Show previous photo blurred on left.
* Show next photo blurred on right.
* Show caption.

Acceptance criteria:

* Central photo is sharp.
* Side photos are blurred.
* Caption matches central photo.
* Layout matches romantic pastel UI.

---

### Story 6.2 — Arrow Navigation on Desktop

Tasks:

* Add previous arrow button.
* Add next arrow button.
* Implement wrap-around.
* Add accessible labels.

Acceptance criteria:

* Left arrow goes previous.
* Right arrow goes next.
* Carousel wraps around.
* Buttons are accessible.

---

### Story 6.3 — Swipe Navigation on Mobile

Tasks:

* Track touch start.
* Track touch end.
* Detect swipe direction.
* Use threshold to avoid accidental swipes.
* Swipe left moves next.
* Swipe right moves previous.

Acceptance criteria:

* Swipe works on mobile.
* Swipe does not trigger accidentally too easily.
* Carousel remains smooth.

---

### Story 6.4 — Dots and Fallbacks

Tasks:

* Add carousel dots.
* Highlight active dot.
* Add image error fallback.
* Show placeholder if image missing.

Acceptance criteria:

* Dots update with active photo.
* Missing image does not break page.
* No broken image icon appears.

---

## Epic 7 — Final Gift Reveal

### Goal

Create a final reveal that points to the real-world gift.

---

### Story 7.1 — Final Reveal Button

Tasks:

* Implement `FinalReveal`.
* Show title from config.
* Show button from config.
* Add romantic styling.

Acceptance criteria:

* Button displays below memories.
* Text comes from config.
* Button is accessible.

---

### Story 7.2 — Reveal Final Message

Tasks:

* Add `isRevealed` state.
* Show message after click.
* Add fade-in.
* Add optional petals/hearts.

Acceptance criteria:

* Message hidden before click.
* Message visible after click.
* No scratch-card behavior.
* Text configurable.

---

## Epic 8 — Polish, Accessibility, and Production Readiness

### Goal

Make the app polished, responsive, accessible, and ready to deploy.

---

### Story 8.1 — Visual Polish

Tasks:

* Refine spacing.
* Refine typography.
* Add consistent shadows.
* Add consistent button states.
* Add background gradients.
* Add floating decorations.

Acceptance criteria:

* App feels cohesive.
* Pastel palette is consistent.
* No screen looks unfinished.

---

### Story 8.2 — Mobile Polish

Tasks:

* Test 360px width.
* Test 390px width.
* Test tablet width.
* Ensure buttons are touch-friendly.
* Ensure carousel swipe works.
* Ensure no horizontal scrolling.

Acceptance criteria:

* Mobile experience is clean.
* Buttons are easy to tap.
* Letter readable.
* Carousel usable.

---

### Story 8.3 — Accessibility Pass

Tasks:

* Add focus states.
* Add `aria-live`.
* Add labels.
* Use semantic buttons.
* Add reduced motion support.

Acceptance criteria:

* Keyboard flow works.
* Feedback is accessible.
* Reduced motion is respected.

---

### Story 8.4 — Build and Cleanup

Tasks:

* Run TypeScript check.
* Run production build.
* Fix build errors.
* Remove unused code.
* Add comments showing where to edit content.

Acceptance criteria:

* `npm run build` succeeds.
* No TypeScript errors.
* No obvious console errors.
* App ready to deploy.

---

# 14. Implementation Iterations

## Iteration 1 — Foundation

Tasks:

* Create Vite React TypeScript project.
* Add styling files.
* Add TypeScript types.
* Add content config.
* Add placeholder components.
* Add app state navigation.

Acceptance criteria:

* App runs.
* Flow works with placeholders.
* Config imports successfully.

---

## Iteration 2 — Intro

Tasks:

* Implement intro UI.
* Implement Yes button.
* Implement runaway No button.
* Add funny messages.
* Add responsive styling.

Acceptance criteria:

* Yes opens quiz.
* No runs away.
* Messages work.
* Mobile works.

---

## Iteration 3 — Quiz

Tasks:

* Implement quiz UI.
* Add text question support.
* Add multiple-choice support.
* Add validation.
* Add wrong answer feedback.
* Complete quiz to flowers.

Acceptance criteria:

* All questions validate.
* Wrong answers retry.
* Completion opens flowers.

---

## Iteration 4 — Flower Game

Tasks:

* Implement flower game UI.
* Render 5 flowers.
* Track collection.
* Show flower messages.
* Unlock letter button.

Acceptance criteria:

* 5 flowers can be collected.
* Messages show correctly.
* Letter unlocks only after all flowers.

---

## Iteration 5 — Love Letter

Tasks:

* Implement letter component.
* Add parchment style.
* Add floral decorations.
* Add reveal animation.
* Preserve line breaks.

Acceptance criteria:

* Letter looks vintage.
* Content comes from config.
* Mobile works.

---

## Iteration 6 — Memories Carousel

Tasks:

* Implement carousel.
* Add central active photo.
* Add blurred left/right photos.
* Add arrow navigation.
* Add mobile swipe.
* Add dots.
* Add image fallback.

Acceptance criteria:

* Carousel works on desktop and mobile.
* Central photo sharp.
* Side photos blurred.
* Captions update.

---

## Iteration 7 — Final Reveal

Tasks:

* Implement final reveal.
* Add button.
* Reveal final message.
* Add subtle animation.

Acceptance criteria:

* Final reveal works.
* Message configurable.
* No scratch card.

---

## Iteration 8 — Polish and Build

Tasks:

* Improve visual details.
* Improve responsiveness.
* Add accessibility.
* Add reduced motion.
* Run build.
* Fix issues.

Acceptance criteria:

* App polished.
* Mobile clean.
* `npm run build` succeeds.

---

# 15. Codex Execution Prompt

Use this prompt in Codex:

```txt
Build this React + Vite + TypeScript romantic gift web app according to this full architecture and delivery plan.

Important requirements:
- Frontend only.
- No backend.
- No database.
- No authentication.
- No scratch-card feature.
- Main flow: intro -> quiz -> flowers -> letter.
- Intro has a Yes button and a runaway No button.
- Yes opens the quiz.
- Quiz has 3–4 configurable questions.
- User must answer all quiz questions correctly before the flower game unlocks.
- Flower game has 5 clickable flowers.
- Each flower shows a romantic message.
- The love letter unlocks only after all 5 flowers are collected.
- Letter should look like old parchment paper with romantic floral details.
- Memories section should be a carousel.
- Memories carousel should have one sharp central photo and blurred previous/next photos on the sides.
- Carousel should support swipe on mobile and arrow buttons on desktop.
- Photos should load from /public/photos.
- Final reveal appears after clicking a button.
- All editable text, quiz questions, flower messages, photo paths, captions, and final reveal text must live in src/config/content.ts.
- Use clean TypeScript types.
- Use CSS files, not inline styles unless very small.
- Make the UI responsive and mobile-friendly.
- Add accessibility basics and prefers-reduced-motion support.
- Run npm run build at the end and fix all errors.
```

---

# 16. Definition of Done

The project is done when:

* App runs locally.
* Intro screen appears first.
* `No` button runs away.
* `Yes` opens quiz.
* Quiz validates answers correctly.
* Flower game appears after quiz.
* 5 flowers can be collected.
* Each flower shows a message.
* Letter unlocks only after all flowers are collected.
* Letter has vintage parchment style.
* Memories carousel works.
* Central photo is sharp.
* Side photos are blurred.
* Swipe works on mobile.
* Arrows work on desktop.
* Final reveal works.
* All personal content is editable in config.
* App works on mobile.
* App has no horizontal scroll.
* App supports reduced motion.
* `npm run build` succeeds.
* No obvious console errors exist.

---

# 17. Non-Goals

Do not implement:

* Backend.
* Database.
* Authentication.
* Login.
* Scratch card.
* Payments.
* Complex routing.
* Heavy animation libraries.
* AI generation inside the app.
* Upload UI for photos.

Photos will be manually placed in:

```txt
public/photos/
```

Content will be manually edited in:

```txt
src/config/content.ts
```

---

# 18. Final Personalization Steps

After implementation, I will personalize:

1. Replace quiz placeholders with real questions.
2. Replace accepted answers.
3. Replace flower messages if needed.
4. Replace letter body.
5. Add real photos to `/public/photos`.
6. Update photo captions.
7. Update final reveal location/message.
8. Deploy the site.
