import { useLayoutEffect, useRef, useState } from "react";
import { romanticContent } from "../config/content";
import { DecorativeCorners } from "./DecorativeCorners";

const MAX_LETTER_FONT_SIZE = 26;
const MIN_LETTER_FONT_SIZE = 13;

export function LoveLetter() {
  const contentRef = useRef<HTMLElement>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);
  const [letterFontSize, setLetterFontSize] = useState(MAX_LETTER_FONT_SIZE);

  useLayoutEffect(() => {
    function fitLetterText() {
      const content = contentRef.current;
      const body = bodyRef.current;

      if (!content || !body) {
        return;
      }

      let nextSize = MAX_LETTER_FONT_SIZE;
      body.style.fontSize = `${nextSize}px`;

      while (nextSize > MIN_LETTER_FONT_SIZE && content.scrollHeight > content.clientHeight) {
        nextSize -= 1;
        body.style.fontSize = `${nextSize}px`;
      }

      setLetterFontSize(nextSize);
    }

    fitLetterText();
    window.addEventListener("resize", fitLetterText);

    return () => window.removeEventListener("resize", fitLetterText);
  }, []);

  return (
    <section className="letter-section">
      <DecorativeCorners opacity={0.62} variant="card" />
      <div className="letter-paper-shell">
        <img
          alt=""
          aria-hidden="true"
          className="letter-paper-image"
          draggable="false"
          src="/assets/paper/aged-parchment-letter.png"
        />

        <article className="letter-content" aria-label="Love letter" ref={contentRef}>
          <h1>{romanticContent.letterTitle}</h1>
          <p ref={bodyRef} style={{ fontSize: `${letterFontSize}px` }}>
            {romanticContent.letterBody}
          </p>
        </article>
      </div>
    </section>
  );
}
