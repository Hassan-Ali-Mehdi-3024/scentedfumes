import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { CartItem, Product } from "@/types";

type CartState = {
  items: CartItem[];
  isOpen: boolean;
  addItem: (product: Product) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  removeItem: (productId: string) => void;
  clearCart: () => void;
  toggleCart: () => void;
};

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      isOpen: false,
      addItem: (product) =>
        set((state) => {
          const exists = state.items.find((item) => item.id === product.id);

          if (exists) {
            return {
              items: state.items.map((item) =>
                item.id === product.id
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              ),
              isOpen: true,
            };
          }

          return {
            items: [...state.items, { ...product, quantity: 1 }],
            isOpen: true,
          };
        }),
      updateQuantity: (productId, quantity) =>
        set((state) => ({
          items: state.items
            .map((item) =>
              item.id === productId ? { ...item, quantity } : item
            )
            .filter((item) => item.quantity > 0),
        })),
      removeItem: (productId) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== productId),
        })),
      clearCart: () => set({ items: [] }),
      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
    }),
    {
      name: "scentedfumes-cart",
      storage: createJSONStorage(() => localStorage),
    }
  )
);