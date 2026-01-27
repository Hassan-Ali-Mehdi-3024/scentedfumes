import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { CartItem, Product } from "@/types";

export type GiftSetPromotionCode =
  | "gift_3_eco"
  | "gift_3_pro"
  | "pro_half_eco"
  | "pro_half_testers";

export type CartPromotion = {
  code: GiftSetPromotionCode;
  selections: number[];
  label: string;
};

type CartState = {
  items: CartItem[];
  isOpen: boolean;
  promotion: CartPromotion | null;
  addItem: (product: Product, testerSelections?: string[]) => void;
  updateQuantity: (cartItemKey: string, quantity: number) => void;
  removeItem: (cartItemKey: string) => void;
  clearCart: () => void;
  toggleCart: () => void;
  setPromotion: (promotion: CartPromotion) => void;
  clearPromotion: () => void;
};

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      isOpen: false,
      promotion: null,
      addItem: (product, testerSelections) =>
        set((state) => {
          const cartItemKey = testerSelections?.length
            ? `${product.id}::${testerSelections.join("|")}`
            : product.id;

          const exists = state.items.find((item) => item.cartItemKey === cartItemKey);

          if (exists) {
            return {
              items: state.items.map((item) =>
                item.cartItemKey === cartItemKey
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              ),
              isOpen: true,
            };
          }

          return {
            items: [
              ...state.items,
              {
                ...product,
                quantity: 1,
                cartItemKey,
                testerSelections,
              },
            ],
            isOpen: true,
          };
        }),
      updateQuantity: (cartItemKey, quantity) =>
        set((state) => ({
          items: state.items
            .map((item) =>
              item.cartItemKey === cartItemKey ? { ...item, quantity } : item
            )
            .filter((item) => item.quantity > 0),
        })),
      removeItem: (cartItemKey) =>
        set((state) => ({
          items: state.items.filter((item) => item.cartItemKey !== cartItemKey),
        })),
      clearCart: () => set({ items: [], promotion: null }),
      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
      setPromotion: (promotion) => set({ promotion, isOpen: true }),
      clearPromotion: () => set({ promotion: null }),
    }),
    {
      name: "scentedfumes-cart",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
