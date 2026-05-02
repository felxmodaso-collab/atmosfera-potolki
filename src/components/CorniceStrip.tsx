export default function CorniceStrip() {
  return (
    <div className="cornice-strip" aria-hidden>
      <span className="glyph">
        <svg width="48" height="14" viewBox="0 0 48 14" fill="none">
          <path
            d="M0 12 H8 L11 7 H14 V4 H17 V7 H20 L23 12 H25 L28 7 H31 V4 H34 V7 H37 L40 12 H48"
            stroke="rgba(184,148,106,.7)"
            strokeWidth="1.2"
            strokeLinejoin="round"
            fill="none"
          />
          <circle cx="24" cy="3" r="1.4" fill="rgba(212,168,87,.85)" />
        </svg>
      </span>
    </div>
  );
}
