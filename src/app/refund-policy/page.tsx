export const metadata = {
  title: "Refund Policy - Scented Fumes",
  description: "Read our refund and return policy.",
};

export default function RefundPolicyPage() {
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
      <div className="w-full flex justify-center" style={containerPadding}>
        <div className="w-full lg:max-w-4xl">
        <header
          className="text-center lg:text-left flex flex-col items-center lg:items-start"
          style={{ gap: "clamp(0.65rem, 1.8vh, 1rem)" }}
        >
          <div
            className="inline-flex items-center rounded-full border border-[var(--accent-gold)]/30 bg-[var(--bg-surface)]/60 text-[var(--text-primary)] lg:self-start"
            style={{ 
              paddingTop: "clamp(0.5rem, 1.2vh, 0.65rem)",
              paddingBottom: "clamp(0.5rem, 1.2vh, 0.65rem)",
              paddingLeft: "clamp(0.9rem, 2.5vw, 1.1rem)",
              paddingRight: "clamp(0.9rem, 2.5vw, 1.1rem)",
              gap: "clamp(0.35rem, 0.9vh, 0.6rem)", 
              fontSize: "clamp(0.8rem, 1vw, 0.95rem)" 
            }}
          >
            <span className="h-2 w-2 rounded-full bg-[var(--accent-gold)]" />
            Clear and fair returns
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "clamp(0.4rem, 1vh, 0.75rem)", width: "100%", alignItems: "center" }}>
            <h1
              className="text-[var(--text-primary)] text-center lg:text-left lg:self-start"
              style={{
                fontFamily: "var(--font-playfair)",
                fontWeight: 600,
                fontSize: "clamp(2.2rem, 4vw, 3rem)",
                lineHeight: 1.2,
              }}
            >
              Refund Policy
            </h1>
            <p className="text-center lg:text-left lg:self-start" style={{ color: "var(--text-secondary)", opacity: 0.8, fontSize: "clamp(0.95rem, 1.05vw, 1.05rem)" }}>
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
                Return eligibility
              </h2>
              <p style={{ opacity: 0.92 }}>To qualify for a return, please ensure:</p>
              <ul style={listBase}>
                <li>Items are unused, sealed, and in original packaging</li>
                <li>Return request is submitted within 7 days of delivery</li>
                <li>Product seals remain intact</li>
                <li>Original invoice or proof of purchase is included</li>
              </ul>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "clamp(0.4rem, 1vh, 0.65rem)" }}>
              <h2
                className="text-[var(--text-primary)]"
                style={{ fontFamily: "var(--font-playfair)", fontWeight: 600, fontSize: "clamp(1.55rem, 3vw, 2.1rem)" }}
              >
                Non-returnable items
              </h2>
              <p style={{ opacity: 0.92 }}>We cannot accept returns for:</p>
              <ul style={listBase}>
                <li>Opened or used perfume bottles</li>
                <li>Products missing original packaging</li>
                <li>Sale or clearance items marked final sale</li>
                <li>Tester products unless defective</li>
              </ul>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "clamp(0.4rem, 1vh, 0.65rem)" }}>
              <h2
                className="text-[var(--text-primary)]"
                style={{ fontFamily: "var(--font-playfair)", fontWeight: 600, fontSize: "clamp(1.55rem, 3vw, 2.1rem)" }}
              >
                Return process
              </h2>
              <p style={{ opacity: 0.92 }}>To initiate a return:</p>
              <ol
                style={{
                  ...listBase,
                  listStyle: "decimal",
                  paddingLeft: "clamp(1.25rem, 3.2vw, 1.8rem)",
                }}
              >
                <li>Contact us on WhatsApp at +92 332 1300655 within 7 days of delivery</li>
                <li>Share your order number and reason for return</li>
                <li>Wait for our team to authorize the return and share the return address</li>
                <li>Ship the item back with original packaging and invoice</li>
                <li>Share the courier tracking so we can prioritize your inspection</li>
              </ol>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "clamp(0.4rem, 1vh, 0.65rem)" }}>
              <h2
                className="text-[var(--text-primary)]"
                style={{ fontFamily: "var(--font-playfair)", fontWeight: 600, fontSize: "clamp(1.55rem, 3vw, 2.1rem)" }}
              >
                Refunds
              </h2>
              <p style={{ opacity: 0.92 }}>
                After inspection, approved refunds are processed within 5–7 business days via bank transfer or store credit. Return shipping is covered by the customer unless the item is defective or the wrong product was delivered.
              </p>
              <ul style={listBase}>
                <li>Bank transfer to your provided account</li>
                <li>Store credit if you prefer to reorder</li>
              </ul>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "clamp(0.4rem, 1vh, 0.65rem)" }}>
              <h2
                className="text-[var(--text-primary)]"
                style={{ fontFamily: "var(--font-playfair)", fontWeight: 600, fontSize: "clamp(1.55rem, 3vw, 2.1rem)" }}
              >
                Exchanges
              </h2>
              <p>
                We do not process direct exchanges. Please complete a return for a refund and place a new order for the scent you want next.
              </p>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "clamp(0.4rem, 1vh, 0.65rem)" }}>
              <h2
                className="text-[var(--text-primary)]"
                style={{ fontFamily: "var(--font-playfair)", fontWeight: 600, fontSize: "clamp(1.55rem, 3vw, 2.1rem)" }}
              >
                Damaged or defective products
              </h2>
              <p>
                If your order arrives damaged or defective, contact us immediately with photos. We will arrange a replacement or full refund at no additional cost once verified.
              </p>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "clamp(0.35rem, 0.9vh, 0.55rem)" }}>
              <h2
                className="text-[var(--text-primary)]"
                style={{ fontFamily: "var(--font-playfair)", fontWeight: 600, fontSize: "clamp(1.55rem, 3vw, 2.1rem)" }}
              >
                Contact us
              </h2>
              <p>
                For any questions about returns or refunds, message us at
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
      </div>
    </main>
  );
}
