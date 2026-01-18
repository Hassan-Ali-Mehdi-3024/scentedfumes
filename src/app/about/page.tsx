export const metadata = {
  title: "About Us - Scented Fumes",
  description: "Learn about Scented Fumes and our mission to deliver premium perfume renditions.",
};

export default function AboutPage() {
  const cardPadding = {
    paddingTop: "clamp(1.5rem, 3.5vh, 2.25rem)",
    paddingBottom: "clamp(1.5rem, 3.5vh, 2.25rem)",
    paddingLeft: "clamp(1.5rem, 4vw, 2.5rem)",
    paddingRight: "clamp(1.5rem, 4vw, 2.5rem)",
  };

  const stackGap = {
    display: "flex",
    flexDirection: "column",
    gap: "clamp(1rem, 2.5vh, 1.5rem)",
  } as const;

  return (
    <main
      className="flex-1 w-full bg-[var(--bg-main)] text-[var(--text-secondary)]"
      style={{ paddingTop: "var(--header-offset, 5rem)" }}
    >
      {/* Outer container with responsive alignment */}
      <div
        className="w-full flex justify-center"
        style={{
          paddingTop: "clamp(2.5rem, 6vh, 4.5rem)",
          paddingBottom: "clamp(3rem, 8vh, 6rem)",
          paddingLeft: "clamp(1.5rem, 4vw, 3rem)",
          paddingRight: "clamp(1.5rem, 4vw, 3rem)",
        }}
      >
        {/* Content wrapper - centered on mobile, left-aligned on desktop */}
        <div className="w-full lg:max-w-4xl">
          <header
            className="text-center lg:text-left flex flex-col lg:items-start items-center"
            style={{
              gap: "clamp(0.75rem, 2vh, 1.25rem)",
            }}
          >
            <div
              className="inline-flex items-center rounded-full border border-[var(--accent-gold)]/30 bg-[var(--bg-surface)]/60 text-[var(--text-primary)] lg:self-start"
              style={{
                paddingTop: "clamp(0.5rem, 1.2vh, 0.65rem)",
                paddingBottom: "clamp(0.5rem, 1.2vh, 0.65rem)",
                paddingLeft: "clamp(0.9rem, 2.5vw, 1.1rem)",
                paddingRight: "clamp(0.9rem, 2.5vw, 1.1rem)",
                gap: "clamp(0.4rem, 1vh, 0.6rem)",
                fontSize: "clamp(0.8rem, 1vw, 0.9rem)",
              }}
            >
              <span className="h-2 w-2 rounded-full bg-[var(--accent-gold)]" />
              About Us
            </div>

            <h1
              className="text-[var(--text-primary)] text-center lg:text-left lg:self-start"
              style={{
                fontFamily: "var(--font-playfair), serif",
                fontWeight: 700,
                fontSize: "clamp(2.5rem, 5vw, 3.5rem)",
                lineHeight: 1.1,
              }}
            >
              The Essence Behind Scented Fumes
            </h1>

            <p
              className="text-center lg:text-left"
              style={{
                color: "var(--text-secondary)",
                fontSize: "clamp(1rem, 1.3vw, 1.15rem)",
                lineHeight: 1.6,
                maxWidth: "65ch",
                opacity: 0.9,
              }}
            >
              We reinterpret iconic perfumes with meticulous craft, delivering everyday luxury through premium oils and slow, deliberate blending.
            </p>
          </header>

          {/* Content Sections */}
          <div
            className="text-center lg:text-left"
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "clamp(2rem, 4vh, 3rem)",
              marginTop: "clamp(2rem, 5vh, 3.5rem)",
            }}
          >
            <section
              className="rounded-2xl border border-[var(--accent-gold)]/15 bg-[var(--bg-surface)]/70 backdrop-blur-sm"
              style={{
                paddingTop: "clamp(1.5rem, 3.5vh, 2.25rem)",
                paddingBottom: "clamp(1.5rem, 3.5vh, 2.25rem)",
                paddingLeft: "clamp(1.5rem, 4vw, 2.5rem)",
                paddingRight: "clamp(1.5rem, 4vw, 2.5rem)",
              }}
            >
              <div style={{ display: "flex", flexDirection: "column", gap: "clamp(1rem, 2.5vh, 1.5rem)" }}>
                <div>
                  <span
                    className="text-[var(--accent-gold)]"
                    style={{
                      fontSize: "clamp(0.85rem, 1vw, 0.95rem)",
                      letterSpacing: "0.05em",
                      textTransform: "uppercase",
                    }}
                  >
                    Our Mission
                  </span>
                  <h2
                    className="text-[var(--text-primary)] mt-2"
                    style={{
                      fontFamily: "var(--font-playfair), serif",
                      fontWeight: 600,
                      fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)",
                      lineHeight: 1.2,
                    }}
                  >
                    We Love What We Do
                  </h2>
                </div>
                <p
                  style={{
                    fontSize: "clamp(0.95rem, 1.1vw, 1.05rem)",
                    lineHeight: 1.7,
                    color: "var(--text-secondary)",
                    opacity: 0.9,
                  }}
                >
                  Our atelier crafts modern interpretations of beloved fragrances using carefully sourced oils, balanced accords, and a focus on longevity. Every bottle is blended in small batches to feel intentional and distinctly yours.
                </p>
              </div>
            </section>

          <section
            className="rounded-3xl border border-[var(--accent-gold)]/20 bg-[var(--bg-surface)]/80 shadow-[0_14px_50px_rgba(0,0,0,0.28)] backdrop-blur-md"
            style={cardPadding}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: "clamp(0.75rem, 1.8vh, 1.2rem)" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: "clamp(0.35rem, 0.9vh, 0.6rem)" }}>
                <p className="text-[var(--accent-gold)]" style={{ fontSize: "clamp(0.9rem, 1vw, 1rem)" }}>
                  How we operate
                </p>
                <h2
                  className="text-[var(--text-primary)]"
                  style={{ fontFamily: "var(--font-playfair)", fontWeight: 600, fontSize: "clamp(1.55rem, 3vw, 2.1rem)" }}
                >
                  Our working process
                </h2>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "clamp(1rem, 2.6vw, 1.5rem)" }}>
                {[
                  {
                    title: "Source",
                    copy: "We partner with trusted oil houses and local artisans to secure concentrated ingredients that meet our longevity and clarity standards.",
                  },
                  {
                    title: "Balance",
                    copy: "Each profile is iterated until the heart, top, and dry down stay faithful to the inspiration while wearing comfortably on skin.",
                  },
                  {
                    title: "Finish",
                    copy: "Batches rest before bottling to let accords settle. We quality check projection, sillage, and stability before release.",
                  },
                ].map((item) => (
                  <div
                    key={`process-${item.title.toLowerCase()}`}
                    className="rounded-2xl border border-[var(--accent-gold)]/15 bg-[var(--bg-main)]/60"
                    style={{ ...cardPadding, paddingTop: "clamp(1rem, 2.3vh, 1.4rem)", paddingBottom: "clamp(1rem, 2.3vh, 1.4rem)", display: "flex", flexDirection: "column", gap: "clamp(0.4rem, 1vh, 0.65rem)" }}
                  >
                    <h3 className="text-[var(--text-primary)]" style={{ fontWeight: 600, fontSize: "clamp(1.15rem, 2vw, 1.35rem)" }}>
                      {item.title}
                    </h3>
                    <p style={{ lineHeight: 1.6, fontSize: "clamp(0.95rem, 1.05vw, 1.05rem)", opacity: 0.92 }}>{item.copy}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section
            className="rounded-3xl border border-[var(--accent-gold)]/20 bg-[var(--bg-surface)]/80 shadow-[0_14px_50px_rgba(0,0,0,0.28)] backdrop-blur-md"
            style={cardPadding}
          >
            <div style={stackGap}>
              <div style={{ display: "flex", flexDirection: "column", gap: "clamp(0.35rem, 0.9vh, 0.6rem)" }}>
                <p className="text-[var(--accent-gold)]" style={{ fontSize: "clamp(0.9rem, 1vw, 1rem)" }}>
                  The promise
                </p>
                <h2
                  className="text-[var(--text-primary)]"
                  style={{ fontFamily: "var(--font-playfair)", fontWeight: 600, fontSize: "clamp(1.55rem, 3vw, 2.1rem)" }}
                >
                  Seemingly elegant design
                </h2>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "clamp(1rem, 2.6vw, 1.5rem)" }}>
                {[{ value: "2012", label: "Founding year" }, { value: "2000+", label: "Happy customers" }, { value: "750+", label: "Batches perfected" }].map((stat) => (
                  <div
                    key={`stat-${stat.label.replace(/\s+/g, "-").toLowerCase()}`}
                    className="rounded-2xl border border-[var(--accent-gold)]/15 bg-[var(--bg-main)]/60 text-center"
                    style={{ ...cardPadding, paddingTop: "clamp(1rem, 2.3vh, 1.4rem)", paddingBottom: "clamp(1rem, 2.3vh, 1.4rem)", gap: "clamp(0.35rem, 1vh, 0.65rem)", display: "flex", flexDirection: "column", alignItems: "center" }}
                  >
                    <div className="text-[var(--text-primary)]" style={{ fontWeight: 600, fontSize: "clamp(1.8rem, 3vw, 2.25rem)" }}>
                      {stat.value}
                    </div>
                    <div style={{ fontSize: "clamp(0.9rem, 1vw, 1.05rem)", letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--text-secondary)", opacity: 0.75 }}>
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
          </div>
        </div>
      </div>
    </main>
  );
}
