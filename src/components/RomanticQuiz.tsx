import { FormEvent, useMemo, useState } from "react";
import { romanticContent } from "../config/content";
import type { QuizQuestion } from "../types/content";
import { DecorativeCorners } from "./DecorativeCorners";

type RomanticQuizProps = {
  onComplete: () => void;
};

function normalizeAnswer(value: string) {
  return value.trim().replace(/\s+/g, " ").toLocaleLowerCase("ro-RO").normalize("NFC");
}

function getRandomMessage(messages: string[]) {
  return messages[Math.floor(Math.random() * messages.length)] ?? "Try again.";
}

function isTextAnswerCorrect(input: string, acceptedAnswers: string[]) {
  const normalizedInput = normalizeAnswer(input);
  return acceptedAnswers.some((answer) => normalizeAnswer(answer) === normalizedInput);
}

export function RomanticQuiz({ onComplete }: RomanticQuizProps) {
  const questions = romanticContent.quizQuestions;
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [textAnswer, setTextAnswer] = useState("");
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);
  const currentQuestion = questions[currentQuestionIndex];
  const progressText = `Question ${currentQuestionIndex + 1} / ${questions.length}`;

  const progressHearts = useMemo(
    () =>
      questions.map((question, index) => ({
        id: question.id,
        isComplete: index < currentQuestionIndex,
        isCurrent: index === currentQuestionIndex
      })),
    [currentQuestionIndex, questions]
  );

  function goForward() {
    setFeedbackMessage(null);
    setTextAnswer("");

    if (currentQuestionIndex === questions.length - 1) {
      onComplete();
      return;
    }

    setCurrentQuestionIndex((index) => index + 1);
  }

  function handleWrongAnswer() {
    setFeedbackMessage(getRandomMessage(romanticContent.wrongAnswerMessages));
  }

  function submitTextAnswer(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (currentQuestion.type !== "text") {
      return;
    }

    if (isTextAnswerCorrect(textAnswer, currentQuestion.acceptedAnswers)) {
      goForward();
      return;
    }

    handleWrongAnswer();
  }

  function selectOption(question: Extract<QuizQuestion, { type: "multiple-choice" }>, option: string) {
    if (option === question.correctAnswer) {
      goForward();
      return;
    }

    handleWrongAnswer();
  }

  return (
    <section className="screen screen--centered quiz-screen" aria-labelledby="quiz-title">
      <DecorativeCorners opacity={0.86} />
      <div className="romantic-card quiz-card">
        <div className="heart-progress" aria-hidden="true">
          {progressHearts.map((heart) => (
            <span
              className={`heart-progress__item ${
                heart.isComplete || heart.isCurrent ? "is-active" : ""
              }`}
              key={heart.id}
            />
          ))}
        </div>
        <p className="ornament" aria-hidden="true" />
        <h1 id="quiz-title">{romanticContent.quizTitle}</h1>
        <p className="screen-subtitle">{romanticContent.quizSubtitle}</p>
        <p className="progress-label">{progressText}</p>
        <h2>{currentQuestion.question}</h2>

        {currentQuestion.type === "text" ? (
          <form className="quiz-form" onSubmit={submitTextAnswer}>
            <label className="field-label" htmlFor={`question-${currentQuestion.id}`}>
              Your answer
            </label>
            <input
              autoComplete="off"
              id={`question-${currentQuestion.id}`}
              onChange={(event) => setTextAnswer(event.target.value)}
              placeholder={currentQuestion.placeholder}
              type="text"
              value={textAnswer}
            />
            <button className="button button--primary" type="submit">
              Confirm
            </button>
          </form>
        ) : (
          <div className="quiz-options" role="group" aria-label={currentQuestion.question}>
            {currentQuestion.options.map((option) => (
              <button
                className="choice-button"
                key={option}
                onClick={() => selectOption(currentQuestion, option)}
                type="button"
              >
                {option}
              </button>
            ))}
          </div>
        )}

        <p className="feedback-message" role="status" aria-live="polite">
          {feedbackMessage}
        </p>
      </div>
    </section>
  );
}
