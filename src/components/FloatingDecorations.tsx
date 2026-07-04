const decorations = Array.from({ length: 14 }, (_, index) => index);

export function FloatingDecorations() {
  return (
    <div className="floating-decorations" aria-hidden="true">
      {decorations.map((item) => (
        <span
          className={`floating-decoration floating-decoration--${item + 1}`}
          key={item}
        />
      ))}
    </div>
  );
}
