import { CheckoutInput, CartItem } from "@/types/checkout";
import type { CartPromotion } from "@/lib/store/cartStore";

/**
 * Process checkout via Next.js API route
 * This handles the WooCommerce cart session server-side
 */
export async function processCheckout(
  input: CheckoutInput,
  cartItems: CartItem[],
  promotion: CartPromotion | null = null
) {
  try {
    const response = await fetch('/api/checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        checkoutInput: input,
        cartItems,
        promotion,
      }),
    });

    const result = await response.json();

    if (!response.ok) {
      console.error('Checkout API error:', result);
      throw new Error(result.error || result.message || 'Checkout failed');
    }

    if (!result.success || !result.checkout) {
      throw new Error('Checkout failed - invalid response');
    }

    return result.checkout;
  } catch (error: any) {
    console.error('Checkout process error:', error);
    throw error;
  }
}
