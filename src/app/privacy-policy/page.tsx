export const metadata = {
  title: "Privacy Policy - Scented Fumes",
  description: "Read our privacy policy to understand how we collect and use your information.",
};

export default function PrivacyPolicyPage() {
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
            Privacy first, always
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
              Privacy Policy
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
                Information we collect
              </h2>
              <p>
                We collect details you provide directly when you create an account, place an order, or contact customer care. This includes your name, email, phone, shipping address, and billing preference. We also receive limited technical data (device, browser, and interaction events) to keep the site secure and performant.
              </p>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "clamp(0.4rem, 1vh, 0.65rem)" }}>
              <h2
                className="text-[var(--text-primary)]"
                style={{ fontFamily: "var(--font-playfair)", fontWeight: 600, fontSize: "clamp(1.55rem, 3vw, 2.1rem)" }}
              >
                How we use your information
              </h2>
              <p style={{ opacity: 0.92 }}>We rely on your data to:</p>
              <ul style={listBase}>
                <li>Process and fulfill orders, including confirmations and delivery updates</li>
                <li>Respond to questions, returns, and scent recommendations</li>
                <li>Improve site stability, performance, and product selections</li>
                <li>Share launch news and offers when you have opted in</li>
                <li>Comply with legal, tax, and fraud-prevention requirements</li>
              </ul>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "clamp(0.4rem, 1vh, 0.65rem)" }}>
              <h2
                className="text-[var(--text-primary)]"
                style={{ fontFamily: "var(--font-playfair)", fontWeight: 600, fontSize: "clamp(1.55rem, 3vw, 2.1rem)" }}
              >
                Data security
              </h2>
              <p>
                We use encryption in transit, role-based access for internal tools, and periodic security reviews. Payment details are processed through trusted providers; we do not store raw card data on our servers.
              </p>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "clamp(0.4rem, 1vh, 0.65rem)" }}>
              <h2
                className="text-[var(--text-primary)]"
                style={{ fontFamily: "var(--font-playfair)", fontWeight: 600, fontSize: "clamp(1.55rem, 3vw, 2.1rem)" }}
              >
                Cookies and preferences
              </h2>
              <p>
                We use cookies to keep items in your cart, remember your preferences, and understand site usage. You can disable cookies in your browser, though some features (like checkout persistence) may be limited.
              </p>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "clamp(0.4rem, 1vh, 0.65rem)" }}>
              <h2
                className="text-[var(--text-primary)]"
                style={{ fontFamily: "var(--font-playfair)", fontWeight: 600, fontSize: "clamp(1.55rem, 3vw, 2.1rem)" }}
              >
                Third-party services
              </h2>
              <p>
                Select partners help us process payments, deliver orders, and host the storefront. They only receive the data required to perform their function and must protect it under confidentiality agreements.
              </p>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "clamp(0.4rem, 1vh, 0.65rem)" }}>
              <h2
                className="text-[var(--text-primary)]"
                style={{ fontFamily: "var(--font-playfair)", fontWeight: 600, fontSize: "clamp(1.55rem, 3vw, 2.1rem)" }}
              >
                Your rights
              </h2>
              <p>
                You can request access, correction, or deletion of your personal data. To exercise these rights or update your communication preferences, reach us via WhatsApp or email.
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
                Questions about this policy? Message us at
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
