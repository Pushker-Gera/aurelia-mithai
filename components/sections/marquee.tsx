export function Marquee() {
  return (
    <div className="marquee" aria-label="Handcrafted. Celebrated. Timeless. Indian. Modern.">
      <div className="marquee-track" aria-hidden="true">
        {[0, 1].map((i) => (
          <span key={i}>
            HANDCRAFTED <i>✳</i> CELEBRATED <i>✳</i> TIMELESS <i>✳</i> INDIAN <i>✳</i> MODERN{" "}
            <i>✳</i>{" "}
          </span>
        ))}
      </div>
    </div>
  );
}
