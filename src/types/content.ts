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
  finalRevealVideoUrl: string;
  backgroundMusicYoutubeUrl: string;
};
