"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { useCartStore, type GiftSetPromotionCode } from "@/lib/store/cartStore";
import type { Product } from "@/types";

type GiftSetsClientProps = {
  ecoProducts: Product[];
  proProducts: Product[];
  testersPackProduct: Product | null;
  testerChoiceProducts: Product[];
  giftSet3EcoProduct: Product | null;
  giftSet3ProProduct: Product | null;
};

type ActiveOffer = GiftSetPromotionCode | null;

type StepKey =
  | "eco1"
  | "eco2"
  | "eco3"
  | "pro1"
  | "pro2"
  | "pro3"
  | "tester1"
  | "tester2"
  | "tester3"
  | "tester4"
  | "tester5";

const offerCards: Array<{
  code: GiftSetPromotionCode;
  title: string;
  subtitle: string;
  imageSrc: string;
}> = [
  {
    code: "gift_3_eco",
    title: "3 pcs ECO",
    subtitle: "Choose any 3 ECO perfumes for Rs 4500",
    imageSrc: "/gift-of-3-eco.png",
  },
  {
    code: "gift_3_pro",
    title: "3 pcs PRO",
    subtitle: "Choose any 3 PRO perfumes for Rs 6500",
    imageSrc: "/gift-of-3-pro.png",
  },
  {
    code: "pro_half_eco",
    title: "PRO + 50% ECO",
    subtitle: "Buy 1 PRO and get 50% off 1 ECO",
    imageSrc: "/gift-of-eco-n-pro.png",
  },
  {
    code: "pro_half_testers",
    title: "PRO + 50% Testers",
    subtitle: "Buy 1 PRO and get 50% off testers pack",
    imageSrc: "/gift-of-eco-n-testers.png",
  },
];

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

function getStepKeysForOffer(offer: GiftSetPromotionCode): StepKey[] {
  if (offer === "gift_3_eco") return ["eco1", "eco2", "eco3"];
  if (offer === "gift_3_pro") return ["pro1", "pro2", "pro3"];
  if (offer === "pro_half_eco") return ["pro1", "eco1"];
  return ["pro1", "tester1", "tester2", "tester3", "tester4", "tester5"];
}

function getStepLabel(step: StepKey, offer: GiftSetPromotionCode) {
  if (step.startsWith("eco")) return `Select ECO perfume ${step.replace("eco", "")}`;
  if (step.startsWith("pro")) return `Select PRO perfume ${step.replace("pro", "")}`;
  if (step.startsWith("tester")) return `Select tester ${step.replace("tester", "")} of 5`;
  return offer;
}

function asOptions(products: Product[]) {
  return products
    .filter((p) => p.databaseId > 0)
    .map((p) => ({ id: p.databaseId, name: p.name }));
}

export default function GiftSetsClient({
  ecoProducts,
  proProducts,
  testersPackProduct,
  testerChoiceProducts,
  giftSet3EcoProduct,
  giftSet3ProProduct,
}: GiftSetsClientProps) {
  const { addItem, setPromotion } = useCartStore();
  const [activeOffer, setActiveOffer] = useState<ActiveOffer>(null);
  const [error, setError] = useState<string | null>(null);
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [selections, setSelections] = useState<Partial<Record<StepKey, number>>>({});

  const ecoOptions = useMemo(() => asOptions(ecoProducts), [ecoProducts]);
  const proOptions = useMemo(() => asOptions(proProducts), [proProducts]);
  const testerOptions = useMemo(() => asOptions(testerChoiceProducts), [testerChoiceProducts]);

  const ecoById = useMemo(() => new Map(ecoProducts.map((p) => [p.databaseId, p])), [ecoProducts]);
  const proById = useMemo(() => new Map(proProducts.map((p) => [p.databaseId, p])), [proProducts]);
  const testerById = useMemo(
    () => new Map(testerChoiceProducts.map((p) => [p.databaseId, p])),
    [testerChoiceProducts]
  );

  const stepKeys = useMemo(() => (activeOffer ? getStepKeysForOffer(activeOffer) : []), [activeOffer]);
  const currentStepKey = stepKeys[activeStepIndex] ?? null;

  const usedIds = useMemo(() => {
    const values = Object.values(selections).filter(Boolean) as number[];
    return new Set(values);
  }, [selections]);

  function resetForOffer(next: ActiveOffer) {
    setError(null);
    setSelections({});
    setActiveStepIndex(0);
    setActiveOffer(next);
  }

  function getOptionsForStep(step: StepKey) {
    const base =
      step.startsWith("eco") ? ecoOptions :
      step.startsWith("pro") ? proOptions :
      testerOptions;

    const currentValue = selections[step];
    return base.filter((opt) => opt.id === currentValue || !usedIds.has(opt.id));
  }

  function setStepSelection(step: StepKey, id: number) {
    setError(null);
    setSelections((prev) => ({ ...prev, [step]: id }));

    const nextIndex = activeStepIndex + 1;
    if (nextIndex < stepKeys.length) {
      setActiveStepIndex(nextIndex);
    }
  }

  function isComplete() {
    if (!activeOffer) return false;
    return stepKeys.every((k) => Boolean(selections[k]));
  }

  function addConfiguredSetToCart() {
    if (!activeOffer) return;
    setError(null);

    if (!isComplete()) {
      setError("Please complete your selection before adding this gift set.");
      return;
    }

    if (activeOffer === "pro_half_testers") {
      if (!testersPackProduct) {
        setError("Testers pack product not found in backend.");
        return;
      }

      const proId = selections.pro1;
      if (!proId) {
        setError("Please select a PRO perfume.");
        return;
      }

      const proProduct = proById.get(proId);
      if (!proProduct) {
        setError("Selected PRO product is not available.");
        return;
      }

      const testerIds = [
        selections.tester1,
        selections.tester2,
        selections.tester3,
        selections.tester4,
        selections.tester5,
      ].filter(Boolean) as number[];

      if (testerIds.length !== 5) {
        setError("Please select exactly 5 testers.");
        return;
      }

      const testerSelections = testerIds
        .map((id) => testerById.get(id)?.name ?? null)
        .filter(Boolean) as string[];

      if (testerSelections.length !== 5) {
        setError("Some tester selections are invalid.");
        return;
      }

      addItem(proProduct);
      addItem(testersPackProduct, testerSelections);

      setPromotion({
        code: activeOffer,
        selections: [proProduct.databaseId, testersPackProduct.databaseId],
        label: getOfferLabel(activeOffer),
      });

      return;
    }

    const ids = stepKeys.map((k) => selections[k]).filter(Boolean) as number[];
    const productsToAdd: Product[] = [];

    if (activeOffer === "gift_3_eco") {
      if (!giftSet3EcoProduct) {
        // Fallback: Add items individually if bundle product is missing (legacy behavior)
        ids.forEach((id) => {
          const p = ecoById.get(id);
          if (p) productsToAdd.push(p);
        });
      } else {
        // New Behavior: Add Bundle Product with Metadata
        const selectedNames = ids.map(id => ecoById.get(id)?.name).filter(Boolean) as string[];
        addItem(giftSet3EcoProduct, selectedNames);
        return; // Done
      }
    } else if (activeOffer === "gift_3_pro") {
      if (!giftSet3ProProduct) {
        // Fallback
        ids.forEach((id) => {
          const p = proById.get(id);
          if (p) productsToAdd.push(p);
        });
      } else {
        // New Behavior
        const selectedNames = ids.map(id => proById.get(id)?.name).filter(Boolean) as string[];
        addItem(giftSet3ProProduct, selectedNames);
        return; // Done
      }
    } else if (activeOffer === "pro_half_eco") {
      const proId = selections.pro1;
      const ecoId = selections.eco1;
      const pro = proId ? proById.get(proId) : null;
      const eco = ecoId ? ecoById.get(ecoId) : null;
      if (pro) productsToAdd.push(pro);
      if (eco) productsToAdd.push(eco);
    }

    if (productsToAdd.length !== stepKeys.length) {
      setError("Some selected products are unavailable. Please re-select.");
      return;
    }

    productsToAdd.forEach((p) => addItem(p));

    setPromotion({
      code: activeOffer,
      selections: productsToAdd.map((p) => p.databaseId),
      label: getOfferLabel(activeOffer),
    });
  }

  return (
    <section style={{ display: "flex", flexDirection: "column", gap: "clamp(1.5rem, 3vh, 2.25rem)" }}>
      <div
        className="grid"
        style={{
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: "clamp(1.25rem, 3vw, 2rem)",
          alignItems: "stretch",
        }}
      >
        {offerCards.map((card) => {
          const isActive = activeOffer === card.code;
          return (
            <button
              key={card.code}
              type="button"
              onClick={() => resetForOffer(isActive ? null : card.code)}
              className="rounded-3xl border bg-[var(--bg-surface)]/40 backdrop-blur-md transition-all"
              style={{
                borderColor: isActive ? "rgba(253,221,173,0.45)" : "rgba(253,221,173,0.18)",
                boxShadow: isActive
                  ? "0 0 0 1px rgba(253,221,173,0.25), 0 22px 80px rgba(0,0,0,0.55)"
                  : "0 14px 50px rgba(0,0,0,0.28)",
                paddingTop: "clamp(1.25rem, 2.8vh, 1.75rem)",
                paddingBottom: "clamp(1.25rem, 2.8vh, 1.75rem)",
                paddingLeft: "clamp(1.25rem, 2.8vw, 1.75rem)",
                paddingRight: "clamp(1.25rem, 2.8vw, 1.75rem)",
                display: "flex",
                flexDirection: "column",
                gap: "clamp(0.9rem, 2vh, 1.2rem)",
                textAlign: "left",
              }}
            >
              <div
                className="relative w-full overflow-hidden rounded-2xl border border-[var(--accent-gold)]/15"
                style={{ height: "clamp(170px, 22vh, 210px)" }}
              >
                <Image src={card.imageSrc} alt={card.title} fill className="object-cover" sizes="(min-width: 1024px) 25vw, 90vw" />
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "clamp(0.35rem, 0.9vh, 0.55rem)" }}>
                <p
                  className="text-[var(--text-primary)]"
                  style={{
                    fontFamily: "var(--font-playfair)",
                    fontWeight: 600,
                    fontSize: "clamp(1.15rem, 1.4vw, 1.5rem)",
                    lineHeight: 1.2,
                  }}
                >
                  {card.title}
                </p>
                <p
                  className="text-[var(--text-secondary)]"
                  style={{
                    opacity: 0.8,
                    fontSize: "clamp(0.9rem, 1vw, 1rem)",
                    lineHeight: 1.55,
                  }}
                >
                  {card.subtitle}
                </p>
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "1rem" }}>
                <span
                  className="rounded-full border border-[var(--accent-gold)]/25 bg-[var(--accent-gold)]/10 text-[var(--accent-gold)]"
                  style={{
                    paddingTop: "clamp(0.4rem, 0.9vh, 0.55rem)",
                    paddingBottom: "clamp(0.4rem, 0.9vh, 0.55rem)",
                    paddingLeft: "clamp(0.9rem, 1.8vw, 1.1rem)",
                    paddingRight: "clamp(0.9rem, 1.8vw, 1.1rem)",
                    fontSize: "clamp(0.75rem, 0.85vw, 0.9rem)",
                    fontWeight: 600,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                  }}
                >
                  {isActive ? "Selected" : "Select"}
                </span>
                <span className="text-[var(--text-muted)]" style={{ fontSize: "clamp(0.8rem, 0.9vw, 0.95rem)", letterSpacing: "0.05em" }}>
                  Tap to configure
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {activeOffer ? (
        <div
          className="rounded-3xl border border-[var(--accent-gold)]/18 bg-[var(--bg-surface)]/35 backdrop-blur-md"
          style={{
            paddingTop: "clamp(1.25rem, 3vh, 1.75rem)",
            paddingBottom: "clamp(1.25rem, 3vh, 1.75rem)",
            paddingLeft: "clamp(1.25rem, 3vw, 2rem)",
            paddingRight: "clamp(1.25rem, 3vw, 2rem)",
            display: "flex",
            flexDirection: "column",
            gap: "clamp(1.25rem, 2.8vh, 1.75rem)",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "clamp(0.35rem, 0.9vh, 0.55rem)" }}>
            <h2
              className="text-[var(--text-primary)]"
              style={{
                fontFamily: "var(--font-playfair)",
                fontWeight: 600,
                fontSize: "clamp(1.5rem, 2.2vw, 2rem)",
                lineHeight: 1.15,
              }}
            >
              Build your set
            </h2>
            <p className="text-[var(--text-secondary)]" style={{ opacity: 0.8, fontSize: "clamp(0.92rem, 1vw, 1.02rem)", lineHeight: 1.6 }}>
              Choose one field at a time. After selection, it collapses and the next opens.
            </p>
          </div>

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

          <div style={{ display: "flex", flexDirection: "column", gap: "clamp(0.75rem, 1.8vh, 1.1rem)" }}>
            {stepKeys.map((stepKey, index) => {
              const selectedId = selections[stepKey] ?? null;
              const isActive = index === activeStepIndex;

              const label = getStepLabel(stepKey, activeOffer);
              const options = getOptionsForStep(stepKey);
              const selectedName =
                stepKey.startsWith("eco")
                  ? (selectedId ? ecoById.get(selectedId)?.name : null)
                  : stepKey.startsWith("pro")
                    ? (selectedId ? proById.get(selectedId)?.name : null)
                    : (selectedId ? testerById.get(selectedId)?.name : null);

              return (
                <div
                  key={`step-${stepKey}`}
                  className="rounded-2xl border border-[var(--accent-gold)]/15 bg-[var(--bg-main)]/30"
                  style={{
                    paddingTop: "clamp(1rem, 2.2vh, 1.25rem)",
                    paddingBottom: "clamp(1rem, 2.2vh, 1.25rem)",
                    paddingLeft: "clamp(1.1rem, 2.6vw, 1.4rem)",
                    paddingRight: "clamp(1.1rem, 2.6vw, 1.4rem)",
                    display: "flex",
                    flexDirection: "column",
                    gap: "clamp(0.6rem, 1.4vh, 0.9rem)",
                  }}
                >
                  <button
                    type="button"
                    onClick={() => setActiveStepIndex(index)}
                    className="flex items-center justify-between"
                    style={{
                      width: "100%",
                      gap: "1rem",
                      textAlign: "left",
                      paddingTop: 0,
                      paddingBottom: 0,
                      paddingLeft: 0,
                      paddingRight: 0,
                    }}
                  >
                    <span style={{ display: "flex", flexDirection: "column", gap: "clamp(0.25rem, 0.6vh, 0.4rem)" }}>
                      <span className="uppercase tracking-widest text-[var(--text-muted)]" style={{ fontSize: "clamp(0.7rem, 0.85vw, 0.8rem)", fontWeight: 700 }}>
                        {label}
                      </span>
                      <span className="text-[var(--text-secondary)]" style={{ opacity: selectedName ? 0.92 : 0.65, fontSize: "clamp(0.95rem, 1.05vw, 1.05rem)", lineHeight: 1.3 }}>
                        {selectedName ? selectedName : isActive ? "Choose an option" : "Not selected"}
                      </span>
                    </span>
                    <span className="text-[var(--accent-gold)]" style={{ fontSize: "clamp(0.85rem, 0.95vw, 0.95rem)", opacity: isActive ? 1 : 0.75 }}>
                      {isActive ? "Open" : selectedName ? "Edit" : "Open"}
                    </span>
                  </button>

                  {isActive && currentStepKey === stepKey ? (
                    <select
                      value={selectedId ?? ""}
                      onChange={(e) => {
                        const next = Number(e.target.value);
                        if (!Number.isFinite(next) || next <= 0) return;
                        setStepSelection(stepKey, next);
                      }}
                      className="w-full rounded-2xl border border-[var(--accent-gold)]/20 bg-black/25 text-[var(--text-secondary)] outline-none focus:border-[var(--accent-gold)]/45"
                      style={{
                        paddingTop: "clamp(0.9rem, 2vh, 1.05rem)",
                        paddingBottom: "clamp(0.9rem, 2vh, 1.05rem)",
                        paddingLeft: "clamp(1rem, 2.4vw, 1.25rem)",
                        paddingRight: "clamp(2.25rem, 4vw, 2.75rem)",
                        fontSize: "clamp(0.95rem, 1.05vw, 1.05rem)",
                      }}
                    >
                      <option value="">Choose an option</option>
                      {options.map((opt) => (
                        <option key={`opt-${stepKey}-${opt.id}`} value={String(opt.id)}>
                          {opt.name}
                        </option>
                      ))}
                    </select>
                  ) : null}
                </div>
              );
            })}
          </div>

          <div style={{ display: "flex", justifyContent: "center" }}>
            <button
              type="button"
              onClick={addConfiguredSetToCart}
              disabled={!isComplete()}
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
              Add set to cart
            </button>
          </div>
        </div>
      ) : null}
    </section>
  );
}

