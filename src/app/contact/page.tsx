export const metadata = {
  title: "Contact Us - Scented Fumes",
  description: "Get in touch with Scented Fumes for any questions or inquiries.",
};

export default function ContactPage() {
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
            We would love to hear from you
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
              Contact Scented Fumes
            </h1>
            <p
              style={{
                color: "var(--text-secondary)",
                opacity: 0.9,
                fontSize: "clamp(1rem, 1.2vw, 1.1rem)",
                maxWidth: "50ch",
              }}
            >
              Share your questions, feedback, or scent stories. Our team replies promptly on business days and keeps every conversation personal.
            </p>
          </div>
        </header>

        <div
          className="grid"
          style={{ gap: "clamp(1.4rem, 3vh, 2rem)", marginTop: "clamp(1.25rem, 3vh, 1.75rem)", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))" }}
        >
          <div
            className="rounded-3xl border border-[var(--accent-gold)]/20 bg-[var(--bg-surface)]/80 shadow-[0_14px_50px_rgba(0,0,0,0.28)] backdrop-blur-md"
            style={cardPadding}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: "clamp(1rem, 2.2vh, 1.4rem)" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: "clamp(0.35rem, 0.9vh, 0.6rem)" }}>
                <p className="text-[var(--accent-gold)]" style={{ fontSize: "clamp(0.9rem, 1vw, 1rem)" }}>
                  Get in touch
                </p>
                <h2
                  className="text-[var(--text-primary)]"
                  style={{ fontFamily: "var(--font-playfair)", fontWeight: 600, fontSize: "clamp(1.6rem, 3vw, 2.1rem)" }}
                >
                  Send us a note
                </h2>
              </div>

              <form style={{ display: "flex", flexDirection: "column", gap: "clamp(0.9rem, 2vh, 1.2rem)" }}>
                {[
                  { id: "name", label: "Your Name", type: "text", required: true },
                  { id: "email", label: "Your Email", type: "email", required: true },
                  { id: "phone", label: "Phone Number", type: "tel", required: false },
                  { id: "company", label: "Company (optional)", type: "text", required: false },
                ].map((field) => (
                  <div key={`contact-${field.id}`} style={{ display: "flex", flexDirection: "column", gap: "clamp(0.35rem, 0.9vh, 0.55rem)" }}>
                    <label htmlFor={field.id} style={{ fontSize: "clamp(0.9rem, 1vw, 1rem)", color: "var(--text-secondary)", opacity: 0.9 }}>
                      {field.label}
                    </label>
                    <input
                      id={field.id}
                      name={field.id}
                      type={field.type}
                      required={field.required}
                      className="rounded-xl border border-[var(--accent-gold)]/20 bg-[var(--bg-main)]/70 text-[var(--text-secondary)] outline-none"
                      style={{
                        paddingTop: "clamp(0.75rem, 1.8vh, 0.95rem)",
                        paddingBottom: "clamp(0.75rem, 1.8vh, 0.95rem)",
                        paddingLeft: "clamp(0.9rem, 2.5vw, 1.1rem)",
                        paddingRight: "clamp(0.9rem, 2.5vw, 1.1rem)",
                        fontSize: "clamp(0.95rem, 1.05vw, 1.05rem)",
                        transition: "border-color 0.2s ease, box-shadow 0.2s ease",
                      }}
                    />
                  </div>
                ))}

                <div style={{ display: "flex", flexDirection: "column", gap: "clamp(0.35rem, 0.9vh, 0.55rem)" }}>
                  <label htmlFor="message" style={{ fontSize: "clamp(0.9rem, 1vw, 1rem)", color: "var(--text-secondary)", opacity: 0.9 }}>
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={4}
                    className="rounded-xl border border-[var(--accent-gold)]/20 bg-[var(--bg-main)]/70 text-[var(--text-secondary)] outline-none"
                    style={{
                      paddingTop: "clamp(0.9rem, 2.2vh, 1.05rem)",
                      paddingBottom: "clamp(0.9rem, 2.2vh, 1.05rem)",
                      paddingLeft: "clamp(0.9rem, 2.5vw, 1.1rem)",
                      paddingRight: "clamp(0.9rem, 2.5vw, 1.1rem)",
                      fontSize: "clamp(0.95rem, 1.05vw, 1.05rem)",
                      minHeight: "clamp(8rem, 18vh, 10rem)",
                      transition: "border-color 0.2s ease, box-shadow 0.2s ease",
                    }}
                  />
                </div>

                <button
                  type="submit"
                  className="rounded-full bg-[var(--accent-gold)] text-[var(--bg-main)]"
                  style={{
                    paddingTop: "clamp(0.85rem, 2vh, 1rem)",
                    paddingBottom: "clamp(0.85rem, 2vh, 1rem)",
                    paddingLeft: "clamp(1.25rem, 3vw, 1.5rem)",
                    paddingRight: "clamp(1.25rem, 3vw, 1.5rem)",
                    fontSize: "clamp(0.95rem, 1.05vw, 1.05rem)",
                    fontWeight: 600,
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                    width: "100%",
                    boxShadow: "0 0 20px rgba(253,221,173,0.3)",
                  }}
                >
                  Send message
                </button>
              </form>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "clamp(1rem, 2.4vh, 1.4rem)" }}>
            <div
              className="rounded-3xl border border-[var(--accent-gold)]/20 bg-[var(--bg-surface)]/80 shadow-[0_14px_50px_rgba(0,0,0,0.28)] backdrop-blur-md"
              style={cardPadding}
            >
              <div style={{ display: "flex", flexDirection: "column", gap: "clamp(0.8rem, 1.9vh, 1.2rem)" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: "clamp(0.35rem, 0.9vh, 0.6rem)" }}>
                  <p className="text-[var(--accent-gold)]" style={{ fontSize: "clamp(0.9rem, 1vw, 1rem)" }}>
                    Contact information
                  </p>
                  <h2
                    className="text-[var(--text-primary)]"
                    style={{ fontFamily: "var(--font-playfair)", fontWeight: 600, fontSize: "clamp(1.4rem, 2.6vw, 1.9rem)" }}
                  >
                    Reach us directly
                  </h2>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "clamp(0.65rem, 1.6vh, 0.95rem)", fontSize: "clamp(0.98rem, 1.05vw, 1.08rem)" }}>
                  <div style={{ display: "flex", flexDirection: "column", gap: "clamp(0.25rem, 0.7vh, 0.45rem)" }}>
                    <span className="text-[var(--text-primary)]" style={{ fontWeight: 600 }}>WhatsApp</span>
                    <a
                      href="https://wa.me/923321300655"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[var(--text-primary)]"
                      style={{ textDecoration: "none", letterSpacing: "0.02em" }}
                    >
                      +92 332 1300655
                    </a>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "clamp(0.25rem, 0.7vh, 0.45rem)" }}>
                    <span className="text-[var(--text-primary)]" style={{ fontWeight: 600 }}>Social</span>
                    <div style={{ display: "flex", gap: "clamp(0.6rem, 1.4vw, 0.9rem)", flexWrap: "wrap" }}>
                      {[{
                        label: "Facebook",
                        href: "https://www.facebook.com/profile.php?id=61558871727344",
                      },
                      { label: "Instagram", href: "https://www.instagram.com/scentedfumes.official" },
                      { label: "TikTok", href: "https://www.tiktok.com/@scented.fumes" }].map((link) => (
                        <a
                          key={`social-${link.label.toLowerCase()}`}
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[var(--text-secondary)]"
                          style={{ opacity: 0.85, transition: "opacity 0.2s ease" }}
                        >
                          {link.label}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div
              className="rounded-3xl border border-[var(--accent-gold)]/20 bg-[var(--bg-surface)]/80 shadow-[0_14px_50px_rgba(0,0,0,0.28)] backdrop-blur-md"
              style={cardPadding}
            >
              <div style={{ display: "flex", flexDirection: "column", gap: "clamp(0.8rem, 1.9vh, 1.2rem)" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: "clamp(0.35rem, 0.9vh, 0.6rem)" }}>
                  <p className="text-[var(--accent-gold)]" style={{ fontSize: "clamp(0.9rem, 1vw, 1rem)" }}>
                    FAQs
                  </p>
                  <h2
                    className="text-[var(--text-primary)]"
                    style={{ fontFamily: "var(--font-playfair)", fontWeight: 600, fontSize: "clamp(1.4rem, 2.6vw, 1.9rem)" }}
                  >
                    Quick answers
                  </h2>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "clamp(0.75rem, 1.9vh, 1.15rem)", fontSize: "clamp(0.96rem, 1.05vw, 1.05rem)" }}>
                  {[{
                    question: "Will I receive the same product shown?",
                    answer: "Yes. We quality check imagery against every batch and photograph in-house before publishing.",
                  },
                  {
                    question: "How can I return an item?",
                    answer: "Review our Refund Policy for eligibility, then reach out on WhatsApp so we can authorize and guide the pickup.",
                  },
                  {
                    question: "Where do you ship?",
                    answer: "We deliver across Pakistan. Delivery times vary slightly by city—see the Shipping Policy for the latest schedule.",
                  }].map((item) => (
                    <details
                      key={`faq-${item.question.toLowerCase().replace(/\s+/g, "-")}`}
                      className="group rounded-2xl border border-[var(--accent-gold)]/15 bg-[var(--bg-main)]/60"
                      style={{ padding: "clamp(0.9rem, 2.2vh, 1.1rem)", display: "flex", flexDirection: "column", gap: "clamp(0.35rem, 0.9vh, 0.55rem)" }}
                    >
                      <summary className="cursor-pointer text-[var(--text-primary)]" style={{ fontWeight: 600 }}>
                        {item.question}
                      </summary>
                      <p style={{ lineHeight: 1.55, opacity: 0.9 }}>{item.answer}</p>
                    </details>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
