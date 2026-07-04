import { TouchEvent, useState } from "react";
import { romanticContent } from "../config/content";
import type { PhotoMemory } from "../types/content";
import { DecorativeCorners } from "./DecorativeCorners";

const SWIPE_THRESHOLD = 40;

function PhotoFrame({
  photo,
  variant
}: {
  photo: PhotoMemory;
  variant: "previous" | "active" | "next";
}) {
  const [hasError, setHasError] = useState(false);

  return (
    <figure className={`memory-frame memory-frame--${variant}`}>
      <div className="memory-image-wrap">
        {hasError ? (
          <div className="memory-fallback">
            <span>Photo coming soon</span>
          </div>
        ) : (
          <img alt={photo.caption} onError={() => setHasError(true)} src={photo.src} />
        )}
      </div>
      {variant === "active" && <figcaption>{photo.caption}</figcaption>}
    </figure>
  );
}

export function PhotoMemoriesCarousel() {
  const photos = romanticContent.photos;
  const [activeIndex, setActiveIndex] = useState(0);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  if (photos.length === 0) {
    return null;
  }

  const previousIndex = activeIndex === 0 ? photos.length - 1 : activeIndex - 1;
  const nextIndex = activeIndex === photos.length - 1 ? 0 : activeIndex + 1;

  function goToPreviousPhoto() {
    setActiveIndex((current) => (current === 0 ? photos.length - 1 : current - 1));
  }

  function goToNextPhoto() {
    setActiveIndex((current) => (current === photos.length - 1 ? 0 : current + 1));
  }

  function handleTouchStart(event: TouchEvent<HTMLDivElement>) {
    setTouchStartX(event.touches[0]?.clientX ?? null);
  }

  function handleTouchEnd(event: TouchEvent<HTMLDivElement>) {
    if (touchStartX === null) {
      return;
    }

    const touchEndX = event.changedTouches[0]?.clientX ?? touchStartX;
    const deltaX = touchStartX - touchEndX;

    if (deltaX > SWIPE_THRESHOLD) {
      goToNextPhoto();
    }

    if (deltaX < -SWIPE_THRESHOLD) {
      goToPreviousPhoto();
    }

    setTouchStartX(null);
  }

  return (
    <section className="memories-section" aria-labelledby="memories-title">
      <DecorativeCorners opacity={0.72} variant="card" />
      <div className="section-heading">
        <p className="ornament" aria-hidden="true" />
        <h1 id="memories-title">{romanticContent.memoriesTitle}</h1>
        <p>{romanticContent.memoriesSubtitle}</p>
      </div>

      <div
        className="memory-carousel"
        onTouchEnd={handleTouchEnd}
        onTouchStart={handleTouchStart}
      >
        <button
          aria-label="Previous photo"
          className="carousel-arrow carousel-arrow--left"
          onClick={goToPreviousPhoto}
          type="button"
        >
          &lt;
        </button>

        <div className="memory-stage">
          <PhotoFrame photo={photos[previousIndex]} variant="previous" />
          <PhotoFrame photo={photos[activeIndex]} variant="active" />
          <PhotoFrame photo={photos[nextIndex]} variant="next" />
        </div>

        <button
          aria-label="Next photo"
          className="carousel-arrow carousel-arrow--right"
          onClick={goToNextPhoto}
          type="button"
        >
          &gt;
        </button>
      </div>

      <div className="carousel-dots" role="tablist" aria-label="Memory photos">
        {photos.map((photo, index) => (
          <button
            aria-label={`Show photo ${index + 1}: ${photo.caption}`}
            aria-selected={index === activeIndex}
            className={`carousel-dot ${index === activeIndex ? "is-active" : ""}`}
            key={photo.src}
            onClick={() => setActiveIndex(index)}
            role="tab"
            type="button"
          />
        ))}
      </div>
    </section>
  );
}
