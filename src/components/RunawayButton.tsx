import { useCallback, useEffect, useRef, useState } from "react";

type RunawayButtonProps = {
  label: string;
  onAttempt: () => void;
};

type Position = {
  x: number;
  y: number;
};

type Point = {
  x: number;
  y: number;
};

const MOVE_THRESHOLD = 24;
const MIN_CURSOR_DISTANCE = 15;
const MIN_JUMP_DISTANCE = 130;
const MAX_JUMP_DISTANCE = 260;
const VIEWPORT_PADDING = 14;
const MAX_POSITION_ATTEMPTS = 48;

export function RunawayButton({ label, onAttempt }: RunawayButtonProps) {
  const anchorRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState<Position | null>(null);
  const [buttonWidth, setButtonWidth] = useState<number | null>(null);
  const lastAttemptAtRef = useRef(0);

  const getSafeRandomPosition = useCallback((avoidPoint?: Point): Position => {
    const button = buttonRef.current;
    const buttonWidth = button?.offsetWidth ?? 140;
    const buttonHeight = button?.offsetHeight ?? 56;
    const maxX = Math.max(VIEWPORT_PADDING, window.innerWidth - buttonWidth - VIEWPORT_PADDING);
    const maxY = Math.max(VIEWPORT_PADDING, window.innerHeight - buttonHeight - VIEWPORT_PADDING);
    const currentRect = button?.getBoundingClientRect();
    const currentCenter = currentRect
      ? {
          x: currentRect.left + currentRect.width / 2,
          y: currentRect.top + currentRect.height / 2
        }
      : {
          x: window.innerWidth / 2,
          y: window.innerHeight / 2
        };

    if (!avoidPoint) {
      return {
        x: VIEWPORT_PADDING + Math.random() * (maxX - VIEWPORT_PADDING),
        y: VIEWPORT_PADDING + Math.random() * (maxY - VIEWPORT_PADDING)
      };
    }

    for (let attempt = 0; attempt < MAX_POSITION_ATTEMPTS; attempt += 1) {
      const angle = Math.random() * Math.PI * 2;
      const distance =
        MIN_JUMP_DISTANCE + Math.random() * (MAX_JUMP_DISTANCE - MIN_JUMP_DISTANCE);
      const next = {
        x: Math.min(
          maxX,
          Math.max(
            VIEWPORT_PADDING,
            currentCenter.x + Math.cos(angle) * distance - buttonWidth / 2
          )
        ),
        y: Math.min(
          maxY,
          Math.max(
            VIEWPORT_PADDING,
            currentCenter.y + Math.sin(angle) * distance - buttonHeight / 2
          )
        )
      };
      const centerX = next.x + buttonWidth / 2;
      const centerY = next.y + buttonHeight / 2;
      const actualDistance = Math.hypot(centerX - avoidPoint.x, centerY - avoidPoint.y);

      if (actualDistance >= MIN_CURSOR_DISTANCE) {
        return next;
      }
    }

    const fallbackX =
      avoidPoint && avoidPoint.x < window.innerWidth / 2 ? maxX : VIEWPORT_PADDING;
    const fallbackY =
      avoidPoint && avoidPoint.y < window.innerHeight / 2 ? maxY : VIEWPORT_PADDING;

    return { x: fallbackX, y: fallbackY };
  }, []);

  const moveButton = useCallback(
    (avoidPoint?: Point) => {
      setPosition(getSafeRandomPosition(avoidPoint));
    },
    [getSafeRandomPosition]
  );

  const attemptEscape = useCallback(
    (point: Point) => {
      const now = window.performance.now();
      const shouldAnnounceAttempt = now - lastAttemptAtRef.current > 380;
      lastAttemptAtRef.current = now;

      if (shouldAnnounceAttempt) {
        onAttempt();
      }

      moveButton(point);
    },
    [moveButton, onAttempt]
  );

  useEffect(() => {
    const anchor = anchorRef.current;

    if (!anchor) {
      return;
    }

    const anchorRect = anchor.getBoundingClientRect();
    setButtonWidth(anchorRect.width);
    setPosition({
      x: anchorRect.left,
      y: anchorRect.top
    });
  }, []);

  useEffect(() => {
    function handleWindowResize() {
      const anchor = anchorRef.current;

      if (anchor) {
        setButtonWidth(anchor.getBoundingClientRect().width);
      }

      moveButton();
    }

    window.addEventListener("resize", handleWindowResize);
    return () => window.removeEventListener("resize", handleWindowResize);
  }, [moveButton]);

  useEffect(() => {
    function getDistanceFromRect(point: Point, rect: DOMRect) {
      const dx = Math.max(rect.left - point.x, 0, point.x - rect.right);
      const dy = Math.max(rect.top - point.y, 0, point.y - rect.bottom);
      return Math.hypot(dx, dy);
    }

    function handlePointerMove(event: PointerEvent) {
      if (event.pointerType === "touch") {
        return;
      }

      const button = buttonRef.current;

      if (!button) {
        return;
      }

      const rect = button.getBoundingClientRect();
      const distance = getDistanceFromRect({ x: event.clientX, y: event.clientY }, rect);

      if (distance < MOVE_THRESHOLD) {
        attemptEscape({ x: event.clientX, y: event.clientY });
      }
    }

    window.addEventListener("pointermove", handlePointerMove);
    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, [attemptEscape]);

  function handlePointerDown(event: React.PointerEvent<HTMLButtonElement>) {
    event.preventDefault();
    attemptEscape({ x: event.clientX, y: event.clientY });
  }

  function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    attemptEscape({ x: event.clientX, y: event.clientY });
  }

  function handleFocus() {
    const button = buttonRef.current;

    if (!button) {
      return;
    }

    const rect = button.getBoundingClientRect();
    attemptEscape({
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2
    });
  }

  return (
    <div className="runaway-zone" ref={anchorRef}>
      <button
        className="button button--secondary runaway-button"
        onClick={handleClick}
        onFocus={handleFocus}
        onPointerDown={handlePointerDown}
        ref={buttonRef}
        style={{
          left: position ? `${position.x}px` : undefined,
          top: position ? `${position.y}px` : undefined,
          width: buttonWidth ? `${buttonWidth}px` : undefined,
          visibility: position ? "visible" : "hidden"
        }}
        type="button"
      >
        {label}
      </button>
    </div>
  );
}
