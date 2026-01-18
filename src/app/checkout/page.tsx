import CheckoutForm from "@/components/checkout/CheckoutForm";

export const metadata = {
  title: "Checkout - Scented Fumes",
  description: "Complete your purchase.",
};

export default function CheckoutPage() {
  const containerPadding = {
    paddingTop: "clamp(1.75rem, 4vw, 3rem)",
    paddingBottom: "clamp(2rem, 5vw, 3.25rem)",
    paddingLeft: "clamp(1.5rem, 4vw, 2.75rem)",
    paddingRight: "clamp(1.5rem, 4vw, 2.75rem)",
  };

  const cardPadding = {
    paddingTop: "clamp(1.5rem, 3vh, 2rem)",
    paddingBottom: "clamp(1.5rem, 3vh, 2rem)",
    paddingLeft: "clamp(1.35rem, 3vw, 2rem)",
    paddingRight: "clamp(1.35rem, 3vw, 2rem)",
  };

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
              Secure checkout
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
                Checkout
              </h1>
              <p
                className="text-center lg:text-left lg:self-start"
                style={{
                  color: "var(--text-secondary)",
                  opacity: 0.9,
                  fontSize: "clamp(1rem, 1.2vw, 1.1rem)",
                  maxWidth: "60ch",
                }}
              >
                Complete your order details and confirm delivery. We verify every order to keep your experience smooth and secure.
              </p>
            </div>
          </header>

          <div
            className="rounded-3xl border border-[var(--accent-gold)]/20 bg-[var(--bg-surface)]/80 shadow-[0_14px_50px_rgba(0,0,0,0.28)] backdrop-blur-md"
            style={{ ...cardPadding, marginTop: "clamp(1.35rem, 3vh, 1.9rem)", display: "flex", flexDirection: "column", gap: "clamp(1.2rem, 2.8vh, 1.8rem)" }}
          >
            <CheckoutForm />
          </div>
        </div>
      </div>
    </main>
  );
}
