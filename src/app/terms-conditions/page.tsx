export const metadata = {
  title: "Terms & Conditions - Scented Fumes",
  description: "Read our terms and conditions for using our services.",
};

export default function TermsConditionsPage() {
  const containerPadding = {
    paddingTop: "clamp(1.75rem, 4vw, 3rem)",
    paddingBottom: "clamp(2rem, 5vw, 3.25rem)",
    paddingLeft: "clamp(1.5rem, 4vw, 2.75rem)",
    paddingRight: "clamp(1.5rem, 4vw, 2.75rem)",
  };

  const cardPadding = {
    paddingTop: "clamp(1.25rem, 2.8vh, 1.75rem)",
    paddingBottom: "clamp(1.25rem, 2.8vh, 1.75rem)",
    paddingLeft: "clamp(1.25rem, 3vw, 1.75rem)",
    paddingRight: "clamp(1.25rem, 3vw, 1.75rem)",
  };

  const listBase = {
    paddingTop: "clamp(0.35rem, 1vh, 0.6rem)",
    paddingBottom: "clamp(0.35rem, 1vh, 0.6rem)",
    paddingLeft: "clamp(1.1rem, 3vw, 1.6rem)",
    paddingRight: "clamp(0.75rem, 2vw, 1rem)",
    margin: 0,
    display: "flex",
    flexDirection: "column",
    gap: "clamp(0.45rem, 1.1vh, 0.75rem)",
  } as const;

  return (
    <main
      className="flex-1 w-full bg-[var(--bg-main)] text-[var(--text-secondary)]"
      style={{ paddingTop: "var(--header-offset, 5rem)" }}
    >
      <div className="w-full" style={containerPadding}>
        <header
          className="w-full"
          style={{ display: "flex", flexDirection: "column", gap: "clamp(0.65rem, 1.8vh, 1rem)" }}
        >
          <div
            className="inline-flex items-center rounded-full border border-[var(--accent-gold)]/30 bg-[var(--bg-surface)]/60 px-4 py-2 text-[var(--text-primary)]"
            style={{ gap: "clamp(0.35rem, 0.9vh, 0.6rem)", fontSize: "clamp(0.8rem, 1vw, 0.95rem)", width: "fit-content", maxWidth: "100%" }}
          >
            <span className="h-2 w-2 rounded-full bg-[var(--accent-gold)]" />
            Your agreement with Scented Fumes
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "clamp(0.4rem, 1vh, 0.75rem)" }}>
            <h1
              className="text-[var(--text-primary)]"
              style={{
                fontFamily: "var(--font-playfair)",
                fontWeight: 600,
                fontSize: "clamp(2.2rem, 4vw, 3rem)",
                lineHeight: 1.2,
              }}
            >
              Terms & Conditions
            </h1>
            <p style={{ color: "var(--text-secondary)", opacity: 0.8, fontSize: "clamp(0.95rem, 1.05vw, 1.05rem)" }}>
              Last updated: January 2026
            </p>
          </div>
        </header>

        <section
          className="rounded-3xl border border-[var(--accent-gold)]/20 bg-[var(--bg-surface)]/80 shadow-[0_14px_50px_rgba(0,0,0,0.28)] backdrop-blur-md"
          style={{ ...cardPadding, marginTop: "clamp(1.25rem, 3vh, 1.75rem)" }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "clamp(1rem, 2.4vh, 1.5rem)", fontSize: "clamp(0.98rem, 1.05vw, 1.06rem)", lineHeight: 1.65 }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "clamp(0.4rem, 1vh, 0.65rem)" }}>
              <h2
                className="text-[var(--text-primary)]"
                style={{ fontFamily: "var(--font-playfair)", fontWeight: 600, fontSize: "clamp(1.55rem, 3vw, 2.1rem)" }}
              >
                Agreement to terms
              </h2>
              <p>
                By using Scented Fumes, you agree to these terms. If you do not accept them, please discontinue using the site and services.
              </p>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "clamp(0.4rem, 1vh, 0.65rem)" }}>
              <h2
                className="text-[var(--text-primary)]"
                style={{ fontFamily: "var(--font-playfair)", fontWeight: 600, fontSize: "clamp(1.55rem, 3vw, 2.1rem)" }}
              >
                Products and services
              </h2>
              <p>
                Our perfumes are inspired renditions. We strive to present imagery and descriptions accurately, but variations in screens and batches may create subtle differences.
              </p>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "clamp(0.4rem, 1vh, 0.65rem)" }}>
              <h2
                className="text-[var(--text-primary)]"
                style={{ fontFamily: "var(--font-playfair)", fontWeight: 600, fontSize: "clamp(1.55rem, 3vw, 2.1rem)" }}
              >
                Pricing
              </h2>
              <p>
                Prices are in Pakistani Rupees (Rs) and may change without prior notice. Promotional pricing may be limited by quantity or duration.
              </p>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "clamp(0.4rem, 1vh, 0.65rem)" }}>
              <h2
                className="text-[var(--text-primary)]"
                style={{ fontFamily: "var(--font-playfair)", fontWeight: 600, fontSize: "clamp(1.55rem, 3vw, 2.1rem)" }}
              >
                Orders and payment
              </h2>
              <p style={{ opacity: 0.92 }}>We currently accept Cash on Delivery (COD). When you place an order:</p>
              <ul style={listBase}>
                <li>We call to confirm the order and delivery details</li>
                <li>Payment is collected in cash upon delivery</li>
                <li>You agree to be available to receive and inspect the package</li>
              </ul>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "clamp(0.4rem, 1vh, 0.65rem)" }}>
              <h2
                className="text-[var(--text-primary)]"
                style={{ fontFamily: "var(--font-playfair)", fontWeight: 600, fontSize: "clamp(1.55rem, 3vw, 2.1rem)" }}
              >
                Shipping
              </h2>
              <p>
                We ship across Pakistan. Delivery timelines depend on location; refer to our Shipping Policy for details.
              </p>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "clamp(0.4rem, 1vh, 0.65rem)" }}>
              <h2
                className="text-[var(--text-primary)]"
                style={{ fontFamily: "var(--font-playfair)", fontWeight: 600, fontSize: "clamp(1.55rem, 3vw, 2.1rem)" }}
              >
                Returns and refunds
              </h2>
              <p>
                Please review our Refund Policy for eligibility, timelines, and instructions on returns.
              </p>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "clamp(0.4rem, 1vh, 0.65rem)" }}>
              <h2
                className="text-[var(--text-primary)]"
                style={{ fontFamily: "var(--font-playfair)", fontWeight: 600, fontSize: "clamp(1.55rem, 3vw, 2.1rem)" }}
              >
                Intellectual property
              </h2>
              <p>
                All content on this site—including text, graphics, logos, and imagery—is owned by Scented Fumes and protected by applicable intellectual property laws.
              </p>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "clamp(0.4rem, 1vh, 0.65rem)" }}>
              <h2
                className="text-[var(--text-primary)]"
                style={{ fontFamily: "var(--font-playfair)", fontWeight: 600, fontSize: "clamp(1.55rem, 3vw, 2.1rem)" }}
              >
                Limitation of liability
              </h2>
              <p>
                Scented Fumes is not liable for indirect, incidental, special, or consequential damages arising from use of our products or services, to the fullest extent permitted by law.
              </p>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "clamp(0.35rem, 0.9vh, 0.55rem)" }}>
              <h2
                className="text-[var(--text-primary)]"
                style={{ fontFamily: "var(--font-playfair)", fontWeight: 600, fontSize: "clamp(1.55rem, 3vw, 2.1rem)" }}
              >
                Contact information
              </h2>
              <p>
                For questions about these terms, message us at
                <span className="text-[var(--text-primary)]" style={{ marginLeft: "0.35rem", letterSpacing: "0.02em" }}>
                  <a href="https://wa.me/923321300655" target="_blank" rel="noopener noreferrer">
                    +92 332 1300655
                  </a>
                </span>
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
