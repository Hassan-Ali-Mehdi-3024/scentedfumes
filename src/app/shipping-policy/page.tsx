export const metadata = {
  title: "Shipping Policy - Scented Fumes",
  description: "Learn about our shipping rates and delivery times.",
};

export default function ShippingPolicyPage() {
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
            Transparent delivery timelines
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
              Shipping Policy
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
                Shipping coverage
              </h2>
              <p>
                We deliver across Pakistan, including major cities and remote towns. If your area is hard to reach, message us before checkout and we will confirm the route and timeline.
              </p>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "clamp(0.4rem, 1vh, 0.65rem)" }}>
              <h2
                className="text-[var(--text-primary)]"
                style={{ fontFamily: "var(--font-playfair)", fontWeight: 600, fontSize: "clamp(1.55rem, 3vw, 2.1rem)" }}
              >
                Processing time
              </h2>
              <p>
                Orders are processed within 1–2 business days (Mon–Fri, excluding public holidays). We call to verify details before dispatch so addresses and contact numbers are confirmed.
              </p>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "clamp(0.4rem, 1vh, 0.65rem)" }}>
              <h2
                className="text-[var(--text-primary)]"
                style={{ fontFamily: "var(--font-playfair)", fontWeight: 600, fontSize: "clamp(1.55rem, 3vw, 2.1rem)" }}
              >
                Delivery time
              </h2>
              <p style={{ opacity: 0.92 }}>Estimated timelines by region:</p>
              <ul style={listBase}>
                <li>Karachi, Lahore, Islamabad: 2–4 business days</li>
                <li>Other cities: 3–6 business days</li>
                <li>Remote areas: 5–8 business days</li>
              </ul>
              <p style={{ opacity: 0.9 }}>
                External factors (weather, courier routing) can affect these estimates. We will keep you updated if delays occur.
              </p>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "clamp(0.4rem, 1vh, 0.65rem)" }}>
              <h2
                className="text-[var(--text-primary)]"
                style={{ fontFamily: "var(--font-playfair)", fontWeight: 600, fontSize: "clamp(1.55rem, 3vw, 2.1rem)" }}
              >
                Shipping charges
              </h2>
              <p style={{ opacity: 0.92 }}>Rates are based on order value:</p>
              <ul style={listBase}>
                <li>Orders above Rs 3,000: Free shipping</li>
                <li>Orders below Rs 3,000: Rs 200 shipping fee</li>
              </ul>
              <p style={{ opacity: 0.9 }}>
                Charges appear at checkout before you confirm payment.
              </p>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "clamp(0.4rem, 1vh, 0.65rem)" }}>
              <h2
                className="text-[var(--text-primary)]"
                style={{ fontFamily: "var(--font-playfair)", fontWeight: 600, fontSize: "clamp(1.55rem, 3vw, 2.1rem)" }}
              >
                Order tracking
              </h2>
              <p>
                Once shipped, we share tracking via WhatsApp or SMS. Use the link to follow your package in real time.
              </p>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "clamp(0.4rem, 1vh, 0.65rem)" }}>
              <h2
                className="text-[var(--text-primary)]"
                style={{ fontFamily: "var(--font-playfair)", fontWeight: 600, fontSize: "clamp(1.55rem, 3vw, 2.1rem)" }}
              >
                Cash on Delivery (COD)
              </h2>
              <p>
                COD is available on all orders. Please have the exact amount ready for a smooth handoff with the courier.
              </p>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "clamp(0.4rem, 1vh, 0.65rem)" }}>
              <h2
                className="text-[var(--text-primary)]"
                style={{ fontFamily: "var(--font-playfair)", fontWeight: 600, fontSize: "clamp(1.55rem, 3vw, 2.1rem)" }}
              >
                Missed deliveries
              </h2>
              <p>
                If a delivery attempt is missed, the courier will contact you to reschedule. After two unsuccessful attempts, the parcel returns to us and a return fee may apply.
              </p>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "clamp(0.4rem, 1vh, 0.65rem)" }}>
              <h2
                className="text-[var(--text-primary)]"
                style={{ fontFamily: "var(--font-playfair)", fontWeight: 600, fontSize: "clamp(1.55rem, 3vw, 2.1rem)" }}
              >
                Damaged packages
              </h2>
              <p>
                Inspect your parcel upon arrival. If damaged, refuse delivery and notify us immediately. We will arrange a replacement at no extra cost once confirmed.
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
                Questions about shipping? Message us at
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
