import { useState } from "react";
import { romanticContent } from "../config/content";
import { getVideoEmbedUrl } from "../utils/videoEmbed";
import { DecorativeCorners } from "./DecorativeCorners";

export function FinalReveal() {
  const [isRevealed, setIsRevealed] = useState(false);
  const finalVideoUrl = getVideoEmbedUrl(romanticContent.finalRevealVideoUrl);

  return (
    <section className="final-section" aria-labelledby="final-title">
      <DecorativeCorners opacity={0.62} variant="card" />
      <div className="romantic-card final-card">
        <p className="ornament" aria-hidden="true" />
        <h1 id="final-title">{romanticContent.finalRevealTitle}</h1>
        <button
          className="button button--primary"
          onClick={() => setIsRevealed(true)}
          type="button"
        >
          {romanticContent.finalRevealButtonLabel}
        </button>

        {isRevealed && (
          <div className="final-message" role="status" aria-live="polite">
            <p className="small-heart" aria-hidden="true" />
            <p>{romanticContent.finalRevealText}</p>
            {finalVideoUrl && (
              <>
                <div className="final-video">
                  <iframe
                    allow="autoplay; encrypted-media; picture-in-picture; web-share"
                    allowFullScreen
                    src={finalVideoUrl}
                    title="Final surprise video"
                  />
                </div>
                <a
                  className="video-fallback-link"
                  href={romanticContent.finalRevealVideoUrl}
                  rel="noreferrer"
                  target="_blank"
                >
                  Open video in Google Drive
                </a>
              </>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
