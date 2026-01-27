"use client";

import { useEffect, useMemo, useState } from "react";
import AddToCartButton from "@/components/product/AddToCartButton";
import { Product, ProductAttribute } from "@/types";

const normalizeTesterOrder = (name: string) => {
  const match = name.match(/\d+/);
  if (!match) return Number.MAX_SAFE_INTEGER;
  return Number(match[0]);
};

const formatAttributeLabel = (name: string) => {
  const index = normalizeTesterOrder(name);
  if (Number.isFinite(index)) {
    return `Tester ${index}`;
  }
  return name
    .replace(/[_-]+/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
};

const formatOptionLabel = (value: string) =>
  value
    .replace(/[_-]+/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());

type TesterSelectionFormProps = {
  product: Product;
  attributes: ProductAttribute[];
};

export default function TesterSelectionForm({ product, attributes }: TesterSelectionFormProps) {
  const testerAttributes = useMemo(() => {
    return attributes
      .filter((attr) => attr.options && attr.options.length > 0)
      .sort((a, b) => normalizeTesterOrder(a.name) - normalizeTesterOrder(b.name));
  }, [attributes]);

  const [selections, setSelections] = useState<string[]>(
    testerAttributes.map(() => "")
  );

  useEffect(() => {
    setSelections(testerAttributes.map(() => ""));
  }, [testerAttributes]);

  const allSelected = selections.every((value) => value.trim().length > 0);

  const handleChange = (index: number, value: string) => {
    setSelections((prev) => prev.map((entry, i) => (i === index ? value : entry)));
  };

  if (testerAttributes.length === 0) {
    return (
      <div
        className="rounded-2xl border border-[var(--accent-gold)]/15 bg-[var(--bg-surface)]/25 text-[var(--text-muted)]"
        style={{
          paddingTop: "clamp(1rem, 2vh, 1.25rem)",
          paddingBottom: "clamp(1rem, 2vh, 1.25rem)",
          paddingLeft: "clamp(1rem, 2.5vw, 1.25rem)",
          paddingRight: "clamp(1rem, 2.5vw, 1.25rem)",
          fontSize: "clamp(0.85rem, 1vw, 0.95rem)",
        }}
      >
        Tester selection options are currently unavailable. Please try again later.
      </div>
    );
  }

  return (
    <div
      className="rounded-2xl border border-[var(--accent-gold)]/15 bg-[var(--bg-surface)]/25"
      style={{
        paddingTop: "clamp(1.25rem, 2.5vh, 1.6rem)",
        paddingBottom: "clamp(1.25rem, 2.5vh, 1.6rem)",
        paddingLeft: "clamp(1.25rem, 2.5vw, 1.6rem)",
        paddingRight: "clamp(1.25rem, 2.5vw, 1.6rem)",
        display: "flex",
        flexDirection: "column",
        gap: "clamp(1rem, 2.2vh, 1.4rem)",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "clamp(0.4rem, 1vh, 0.6rem)",
        }}
      >
        <h3
          className="text-[var(--text-primary)]"
          style={{
            fontSize: "clamp(1rem, 1.1vw, 1.2rem)",
            fontFamily: "var(--font-playfair), serif",
          }}
        >
          Choose your 5 testers
        </h3>
        <p
          className="text-[var(--text-secondary)]/70"
          style={{ fontSize: "clamp(0.8rem, 0.95vw, 0.95rem)" }}
        >
          Select one scent for each tester slot. All five selections are required.
        </p>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "clamp(0.75rem, 1.6vh, 1rem)",
        }}
      >
        {testerAttributes.map((attribute, index) => (
          <label
            key={`${attribute.name}-${index}`}
            className="flex flex-col text-[var(--text-secondary)]"
            style={{
              gap: "clamp(0.35rem, 0.8vh, 0.5rem)",
            }}
          >
            <span
              className="uppercase tracking-widest text-[var(--text-muted)]"
              style={{ fontSize: "clamp(0.65rem, 0.8vw, 0.75rem)" }}
            >
              {formatAttributeLabel(attribute.name)}
            </span>
            <select
              value={selections[index]}
              onChange={(event) => handleChange(index, event.target.value)}
              className="rounded-full border border-[var(--accent-gold)]/30 bg-[var(--bg-main)]/40 text-[var(--text-secondary)] focus:border-[var(--accent-gold)]/60 focus:outline-none"
              style={{
                paddingTop: "clamp(0.65rem, 1.4vh, 0.85rem)",
                paddingBottom: "clamp(0.65rem, 1.4vh, 0.85rem)",
                paddingLeft: "clamp(0.9rem, 2vw, 1.15rem)",
                paddingRight: "clamp(2.5rem, 4vw, 3rem)",
                fontSize: "clamp(0.85rem, 0.95vw, 0.95rem)",
              }}
            >
              <option value="">Choose an option</option>
              {attribute.options.map((option) => (
                <option key={`${attribute.name}-${option}`} value={option}>
                  {formatOptionLabel(option)}
                </option>
              ))}
            </select>
          </label>
        ))}
      </div>

      <div style={{ paddingTop: "clamp(0.5rem, 1vh, 0.75rem)" }}>
        <AddToCartButton
          product={product}
          testerSelections={selections}
          disabled={!allSelected}
          buttonLabel={allSelected ? "Add to cart" : "Select 5 testers"}
        />
      </div>
    </div>
  );
}