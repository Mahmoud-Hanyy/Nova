"use client";

import { useEffect, useState } from "react";

export function LaunchUpdateLink({ name }) {
  const [showNotice, setShowNotice] = useState(false);

  useEffect(() => {
    if (!showNotice) return undefined;
    const timeoutId = window.setTimeout(() => setShowNotice(false), 5000);
    return () => window.clearTimeout(timeoutId);
  }, [showNotice]);

  const subject = encodeURIComponent(`Nova ${name} — launch updates`);
  const message = encodeURIComponent(
    `Please send me launch updates for the Nova ${name} colorway.`,
  );
  const mailto = `mailto:hello@nova-concept.dev?subject=${subject}&body=${message}`;

  const openMailDraft = () => {
    setShowNotice(true);
    // Keep the mail client handoff out of Next's client-side route handling.
    window.location.assign(mailto);
  };

  return (
    <>
      <button
        className="product-action"
        type="button"
        onClick={openMailDraft}
      >
        Get launch updates <span aria-hidden="true">↗</span>
      </button>
      {showNotice && (
        <div className="launch-toast" role="status" aria-live="polite">
          <span className="launch-toast-check" aria-hidden="true">✓</span>
          <span>
            <strong>Email draft ready</strong>
            <span>Review the launch update request in your email app and press Send.</span>
          </span>
          <button
            className="launch-toast-close"
            type="button"
            aria-label="Dismiss notification"
            onClick={() => setShowNotice(false)}
          >
            ×
          </button>
        </div>
      )}
    </>
  );
}
