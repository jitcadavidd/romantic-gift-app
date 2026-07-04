import { useState } from "react";
import { romanticContent } from "../config/content";
import { DecorativeCorners } from "./DecorativeCorners";

type FlowerCollectGameProps = {
  onComplete: () => void;
};

export function FlowerCollectGame({ onComplete }: FlowerCollectGameProps) {
  const [collectedFlowerIds, setCollectedFlowerIds] = useState<string[]>([]);
  const [activeMessage, setActiveMessage] = useState<string | null>(null);
  const flowers = romanticContent.flowerMessages;
  const collectedCount = collectedFlowerIds.length;
  const isComplete = collectedCount === flowers.length;

  function collectFlower(flowerId: string, message: string) {
    setActiveMessage(message);

    setCollectedFlowerIds((current) => {
      if (current.includes(flowerId)) {
        return current;
      }

      return [...current, flowerId];
    });
  }

  return (
    <section className="screen screen--centered flowers-screen" aria-labelledby="flowers-title">
      <DecorativeCorners opacity={0.86} />
      <div className="romantic-card flowers-card">
        <p className="small-heart" aria-hidden="true" />
        <h1 id="flowers-title">{romanticContent.flowersTitle}</h1>
        <p className="handwritten-subtitle">{romanticContent.flowersSubtitle}</p>
        <div className="divider" aria-hidden="true" />

        <div className="flower-field">
          {flowers.map((flower, index) => {
            const isCollected = collectedFlowerIds.includes(flower.id);

            return (
              <button
                aria-label={`Collect ${flower.label}`}
                className={`flower-button flower-button--${index + 1} ${
                  isCollected ? "is-collected" : ""
                }`}
                key={flower.id}
                onClick={() => collectFlower(flower.id, flower.message)}
                type="button"
              >
                <span className="flower-shape" aria-hidden="true">
                  <span />
                  <span />
                  <span />
                  <span />
                  <span />
                  <i />
                </span>
              </button>
            );
          })}
        </div>

        <p className="flower-message" role="status" aria-live="polite">
          {activeMessage}
        </p>

        {isComplete && (
          <button className="button button--primary" onClick={onComplete} type="button">
            {romanticContent.openLetterButtonLabel}
          </button>
        )}

        <p className="flower-progress">
          {collectedCount} / {flowers.length} {romanticContent.flowersProgressLabel}
        </p>
      </div>
    </section>
  );
}
