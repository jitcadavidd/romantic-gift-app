import type { CSSProperties } from "react";

type DecorativeCornersProps = {
  variant?: "screen" | "card";
  opacity?: number;
};

export function DecorativeCorners({
  variant = "screen",
  opacity = 0.9
}: DecorativeCornersProps) {
  return (
    <div
      aria-hidden="true"
      className={`decorative-corners decorative-corners--${variant}`}
      style={{ "--decorative-opacity": opacity } as CSSProperties}
    >
      <img
        alt=""
        className="decorative-corner decorative-corner--top-left"
        draggable="false"
        src="/assets/decorations/floral-corner-top-left.png"
      />
      <img
        alt=""
        className="decorative-corner decorative-corner--top-right"
        draggable="false"
        src="/assets/decorations/floral-corner-top-left.png"
      />
      <img
        alt=""
        className="decorative-corner decorative-corner--bottom-left"
        draggable="false"
        src="/assets/decorations/floral-corner-bottom-right.png"
      />
      <img
        alt=""
        className="decorative-corner decorative-corner--bottom-right"
        draggable="false"
        src="/assets/decorations/floral-corner-bottom-right.png"
      />
    </div>
  );
}
