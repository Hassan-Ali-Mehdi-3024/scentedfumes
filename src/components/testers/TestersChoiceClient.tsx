"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/lib/store/cartStore";
import type { GiftSetPromotionCode } from "@/lib/store/cartStore";
import type { Product } from "@/types";

type TestersChoiceClientProps = {
  products: Product[];
  testersPackProduct: Product | null;
  proProduct: Product | null;
  offer: string;
  proId: number | null;
  returnTo: string;
};

const TESTERS_COUNT = 5;

function getOfferLabel(code: GiftSetPromotionCode) {
  switch (code) {
    case "gift_3_eco":
      return "Gift Set: 3 ECO for Rs 4500";
    case "gift_3_pro":
      return "Gift Set: 3 PRO for Rs 6500";
    case "pro_half_eco":
      return "Offer: Buy PRO + 50% off ECO";
    case "pro_half_testers":
      return "Offer: Buy PRO + 50% off Testers Pack";
    default:
      return "Offer";
  }
}

export default function TestersChoiceClient({
  products,
  testersPackProduct,
  proProduct,
  offer,
  proId,
  returnTo,
}: TestersChoiceClientProps) {
  const router = useRouter();
  const { addItem, setPromotion } = useCartStore();
  const [query, setQuery] = useState("");
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [error, setError] = useState<string | null>(null);

  const byId = useMemo(() => new Map(products.map((p) => [p.databaseId, p])), [products]);

  const filteredProducts = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return products;
    return products.filter((p) => p.name.toLowerCase().includes(q));
  }, [products, query]);

  function toggle(id: number) {
    setError(null);
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((x) => x !== id));
      return;
    }
    if (selectedIds.length >= TESTERS_COUNT) return;
    setSelectedIds([...selectedIds, id]);
  }

  function submit() {
    setError(null);

    if (selectedIds.length !== TESTERS_COUNT) {
      setError(`Please select exactly ${TESTERS_COUNT} testers.`);
      return;
    }

    if (!testersPackProduct) {
      setError("Testers pack product not found in backend.");
      return;
    }

    const testerSelections = selectedIds
      .map((id) => byId.get(id)?.name ?? null)
      .filter(Boolean) as string[];

    if (testerSelections.length !== TESTERS_COUNT) {
      setError("Some selections are invalid. Please try again.");
      return;
    }

    if (offer === "pro_half_testers") {
      if (!proId || !proProduct) {
        setError("Missing PRO product selection. Please go back and select a PRO first.");
        return;
      }

      addItem(proProduct);
      addItem(testersPackProduct, testerSelections);

      setPromotion({
        code: "pro_half_testers",
        selections: [proProduct.databaseId, testersPackProduct.databaseId],
        label: getOfferLabel("pro_half_testers"),
      });

      router.push("/checkout");
      return;
    }

    addItem(testersPackProduct, testerSelections);
    router.push(returnTo);
  }

  return (
    <section style={{ display: "flex", flexDirection: "column", gap: "clamp(1.25rem, 3vh, 2rem)" }}>
      <div
        className="rounded-3xl border border-[var(--accent-gold)]/18 bg-[var(--bg-surface)]/35 backdrop-blur-md"
        style={{
          paddingTop: "clamp(1.1rem, 2.6vh, 1.5rem)",
          paddingBottom: "clamp(1.1rem, 2.6vh, 1.5rem)",
          paddingLeft: "clamp(1.1rem, 2.8vw, 1.75rem)",
          paddingRight: "clamp(1.1rem, 2.8vw, 1.75rem)",
          display: "flex",
          flexDirection: "column",
          gap: "clamp(0.85rem, 2vh, 1.1rem)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1rem" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "clamp(0.3rem, 0.8vh, 0.5rem)" }}>
            <p
              className="uppercase tracking-widest text-[var(--text-muted)]"
              style={{ fontSize: "clamp(0.7rem, 0.85vw, 0.8rem)", fontWeight: 700 }}
            >
              Select ({selectedIds.length}/{TESTERS_COUNT})
            </p>
            <p style={{ fontSize: "clamp(0.95rem, 1.05vw, 1.05rem)", opacity: 0.85, lineHeight: 1.6 }}>
              Pick exactly {TESTERS_COUNT} testers.
            </p>
          </div>

          <button
            type="button"
            onClick={() => router.push(returnTo)}
            className="rounded-full border border-[var(--accent-gold)]/25 bg-[var(--accent-gold)]/10 text-[var(--accent-gold)] transition hover:bg-[var(--accent-gold)]/15"
            style={{
              paddingTop: "clamp(0.65rem, 1.6vh, 0.85rem)",
              paddingBottom: "clamp(0.65rem, 1.6vh, 0.85rem)",
              paddingLeft: "clamp(1.1rem, 2.6vw, 1.5rem)",
              paddingRight: "clamp(1.1rem, 2.6vw, 1.5rem)",
              fontSize: "clamp(0.82rem, 0.95vw, 0.95rem)",
              fontWeight: 700,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            Back
          </button>
        </div>

        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search testers..."
          className="w-full rounded-2xl border border-[var(--accent-gold)]/15 bg-black/25 text-[var(--text-secondary)] outline-none focus:border-[var(--accent-gold)]/35"
          style={{
            paddingTop: "clamp(0.9rem, 2vh, 1.05rem)",
            paddingBottom: "clamp(0.9rem, 2vh, 1.05rem)",
            paddingLeft: "clamp(1rem, 2.4vw, 1.25rem)",
            paddingRight: "clamp(1rem, 2.4vw, 1.25rem)",
            fontSize: "clamp(0.95rem, 1.05vw, 1.05rem)",
          }}
        />

        {error ? (
          <div
            className="rounded-2xl border border-red-400/30 bg-red-500/10 text-red-200"
            style={{
              paddingTop: "clamp(0.9rem, 2vh, 1.1rem)",
              paddingBottom: "clamp(0.9rem, 2vh, 1.1rem)",
              paddingLeft: "clamp(1.1rem, 2.8vw, 1.4rem)",
              paddingRight: "clamp(1.1rem, 2.8vw, 1.4rem)",
              fontSize: "clamp(0.95rem, 1.05vw, 1.05rem)",
              lineHeight: 1.5,
            }}
          >
            {error}
          </div>
        ) : null}

        <div
          className="grid"
          style={{
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "clamp(0.75rem, 1.6vw, 1.1rem)",
          }}
        >
          {filteredProducts.map((p) => {
            const isSelected = selectedIds.includes(p.databaseId);
            return (
              <button
                key={`tester-choice-${p.databaseId}`}
                type="button"
                onClick={() => toggle(p.databaseId)}
                className="rounded-2xl border text-left transition-all"
                style={{
                  borderColor: isSelected ? "rgba(253,221,173,0.45)" : "rgba(253,221,173,0.15)",
                  background: isSelected ? "rgba(253,221,173,0.10)" : "rgba(0,0,0,0.35)",
                  paddingTop: "clamp(0.85rem, 2vh, 1.05rem)",
                  paddingBottom: "clamp(0.85rem, 2vh, 1.05rem)",
                  paddingLeft: "clamp(0.95rem, 2.4vw, 1.25rem)",
                  paddingRight: "clamp(0.95rem, 2.4vw, 1.25rem)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "clamp(0.75rem, 1.6vw, 1.1rem)",
                }}
              >
                <span
                  className="text-[var(--text-secondary)]"
                  style={{ fontSize: "clamp(0.95rem, 1.05vw, 1.05rem)", fontWeight: 500, lineHeight: 1.2 }}
                >
                  {p.name}
                </span>
                <span
                  className="rounded-full border border-[var(--accent-gold)]/25 bg-[var(--accent-gold)]/10 text-[var(--accent-gold)]"
                  style={{
                    paddingTop: "clamp(0.35rem, 0.8vh, 0.5rem)",
                    paddingBottom: "clamp(0.35rem, 0.8vh, 0.5rem)",
                    paddingLeft: "clamp(0.7rem, 1.4vw, 0.9rem)",
                    paddingRight: "clamp(0.7rem, 1.4vw, 0.9rem)",
                    fontSize: "clamp(0.7rem, 0.85vw, 0.85rem)",
                    fontWeight: 700,
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                    opacity: isSelected ? 1 : 0.75,
                  }}
                >
                  {isSelected ? "Selected" : "Select"}
                </span>
              </button>
            );
          })}
        </div>

      </div>

      <div style={{ display: "flex", justifyContent: "center" }}>
        <button
          type="button"
          onClick={submit}
          disabled={selectedIds.length !== TESTERS_COUNT || !testersPackProduct}
          className="rounded-full bg-[var(--accent-gold)] text-[var(--bg-main)] transition-all duration-200 hover:shadow-[0_0_25px_rgba(253,221,173,0.4)] disabled:cursor-not-allowed disabled:opacity-50"
          style={{
            paddingTop: "clamp(1rem, 2.4vh, 1.25rem)",
            paddingBottom: "clamp(1rem, 2.4vh, 1.25rem)",
            paddingLeft: "clamp(1.75rem, 3.6vw, 2.5rem)",
            paddingRight: "clamp(1.75rem, 3.6vw, 2.5rem)",
            fontSize: "clamp(0.95rem, 1.05vw, 1.06rem)",
            fontWeight: 700,
            letterSpacing: "0.06em",
            textTransform: "uppercase",
          }}
        >
          Add testers to order
        </button>
      </div>
    </section>
  );
}
