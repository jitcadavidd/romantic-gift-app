import { useState } from "react";
import { romanticContent } from "../config/content";
import { DecorativeCorners } from "./DecorativeCorners";
import { RunawayButton } from "./RunawayButton";

type OpeningScreenProps = {
  onYes: () => void;
};

export function OpeningScreen({ onYes }: OpeningScreenProps) {
  const [attempts, setAttempts] = useState(0);
  const message =
    attempts > 0
      ? romanticContent.noButtonMessages[(attempts - 1) % romanticContent.noButtonMessages.length]
      : null;

  return (
    <section className="screen screen--centered intro-screen" aria-labelledby="intro-title">
      <DecorativeCorners opacity={0.92} />
      <div className="romantic-card intro-card">
        <p className="ornament" aria-hidden="true" />
        <h1 id="intro-title">{romanticContent.introTitle}</h1>
        <p className="screen-subtitle">{romanticContent.introSubtitle}</p>
        <div className="intro-actions">
          <button className="button button--primary" onClick={onYes} type="button">
            {romanticContent.yesButtonLabel}
          </button>
          <RunawayButton
            label={romanticContent.noButtonLabel}
            onAttempt={() => setAttempts((current) => current + 1)}
          />
        </div>
        <p className="feedback-message" role="status" aria-live="polite">
          {message}
        </p>
      </div>
    </section>
  );
}
