import { NextRequest, NextResponse } from 'next/server';
import { APPLY_COUPON_MUTATION } from '@/lib/graphql/promotions';
import type { GiftSetPromotionCode } from '@/lib/store/cartStore';

const GRAPHQL_ENDPOINT = process.env.NEXT_PUBLIC_WORDPRESS_API_URL || 'https://scentedfumes.com/graphql';

// Empty cart mutation
const EMPTY_CART_MUTATION = `
  mutation EmptyCart {
    emptyCart(input: {}) {
      cart {
        isEmpty
      }
    }
  }
`;

// Add to cart mutation
const ADD_TO_CART_MUTATION = `
  mutation AddToCart($productId: Int!, $quantity: Int!) {
    addToCart(input: { productId: $productId, quantity: $quantity }) {
      cart {
        contents {
          itemCount
        }
      }
    }
  }
`;

// Checkout mutation
const CHECKOUT_MUTATION = `
  mutation Checkout(
    $paymentMethod: String!
    $billing: CustomerAddressInput!
    $shipping: CustomerAddressInput!
    $shipToDifferentAddress: Boolean
    $customerNote: String
  ) {
    checkout(input: {
      paymentMethod: $paymentMethod
      billing: $billing
      shipping: $shipping
      shipToDifferentAddress: $shipToDifferentAddress
      customerNote: $customerNote
      isPaid: false
    }) {
      order {
        databaseId
        orderNumber
        total
        status
      }
      result
      redirect
    }
  }
`;

type PromotionPayload = {
  code: GiftSetPromotionCode;
  selections: number[];
  label: string;
};

function getCouponCodeForPromotion(code: GiftSetPromotionCode): string | null {
  const env = process.env;
  switch (code) {
    case 'gift_3_eco':
      return env.NEXT_PUBLIC_GIFTSET_COUPON_GIFT3ECO ?? null;
    case 'gift_3_pro':
      return env.NEXT_PUBLIC_GIFTSET_COUPON_GIFT3PRO ?? null;
    case 'pro_half_eco':
      return env.NEXT_PUBLIC_GIFTSET_COUPON_PRO50ECO ?? null;
    case 'pro_half_testers':
      return env.NEXT_PUBLIC_GIFTSET_COUPON_PRO50TESTERS ?? null;
    default:
      return null;
  }
}

function validatePromotionPayload(promotion: PromotionPayload, cartItems: Array<{ productId: number; quantity: number }>) {
  const selectionIds = promotion.selections ?? [];
  const uniqueSelectionCount = new Set(selectionIds).size;
  if (uniqueSelectionCount !== selectionIds.length) {
    return { ok: false, message: 'Invalid promotion selection (duplicate items).' };
  }

  const cartIdSet = new Set(cartItems.map((it) => it.productId));
  for (const id of selectionIds) {
    if (!cartIdSet.has(id)) {
      return { ok: false, message: 'Invalid promotion selection (items do not match cart).' };
    }
  }

  const expectedSelectionCount =
    promotion.code === 'gift_3_eco' ? 3 :
    promotion.code === 'gift_3_pro' ? 3 :
    promotion.code === 'pro_half_eco' ? 2 :
    promotion.code === 'pro_half_testers' ? 2 :
    0;

  if (selectionIds.length !== expectedSelectionCount) {
    return { ok: false, message: 'Invalid promotion selection (wrong number of items).' };
  }

  return { ok: true as const };
}

async function graphqlRequest(query: string, variables: any = {}, sessionToken?: string) {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };

  if (sessionToken) {
    headers['woocommerce-session'] = `Session ${sessionToken}`;
  }

  const response = await fetch(GRAPHQL_ENDPOINT, {
    method: 'POST',
    headers,
    body: JSON.stringify({ query, variables }),
    credentials: 'include',
  });

  const result = await response.json();

  // Extract session token from response headers if available
  const newSessionToken = response.headers.get('woocommerce-session');

  return { data: result, sessionToken: newSessionToken };
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { checkoutInput, cartItems, promotion } = body as {
      checkoutInput: any;
      cartItems: Array<{ productId: number; quantity: number }>;
      promotion?: PromotionPayload | null;
    };

    let sessionToken: string | undefined;

    // Step 1: Empty cart
    const emptyResult = await graphqlRequest(EMPTY_CART_MUTATION, {}, sessionToken);
    if (emptyResult.sessionToken) {
      sessionToken = emptyResult.sessionToken;
    }

    if (emptyResult.data.errors) {
      const isEmptyError = emptyResult.data.errors.some((e: any) => 
        e.message?.toLowerCase().includes('cart is empty')
      );
      if (!isEmptyError) {
        console.error('Empty cart errors:', emptyResult.data.errors);
      }
    }

    // Step 2: Add items to cart
    for (const item of cartItems) {
      const addResult = await graphqlRequest(
        ADD_TO_CART_MUTATION,
        {
          productId: item.productId,
          quantity: item.quantity,
        },
        sessionToken
      );

      if (addResult.sessionToken) {
        sessionToken = addResult.sessionToken;
      }

      if (addResult.data.errors) {
        console.error('Add to cart errors:', addResult.data.errors);
        return NextResponse.json(
          { error: `Failed to add product ${item.productId}`, details: addResult.data.errors },
          { status: 400 }
        );
      }
    }

      // Step 3: Apply promotion coupon (optional)
    if (promotion) {
      const couponCode = getCouponCodeForPromotion(promotion.code);
      
      // Calculate expected bundle price for the note
      let expectedPrice = 0;
      let actualBundleTotal = 0;
      
      // Calculate actual total of selected items
      const selectedItemIds = new Set(promotion.selections);
      // We need to fetch prices, but we don't have them here easily without refetching.
      // However, we can infer from the cart if we had prices. 
      // For now, we'll just log the target price.
      
      if (promotion.code === 'gift_3_eco') expectedPrice = 4500;
      if (promotion.code === 'gift_3_pro') expectedPrice = 6500;
      
      let systemNote = `\n\n[SYSTEM] OFFER APPLIED: ${promotion.label}`;
      if (expectedPrice > 0) {
        systemNote += `\n- Target Deal Price: Rs ${expectedPrice}`;
        systemNote += `\n- Action: Please ensure invoice total is adjusted to Rs ${expectedPrice} if coupon didn't match exactly.`;
      } else {
        systemNote += `\n- Action: Verify 50% discount applied to second item.`;
      }

      if (!couponCode) {
        console.warn(`Promotion code for ${promotion.code} is not configured.`);
        checkoutInput.customerNote = (checkoutInput.customerNote || '') + systemNote + 
          `\n- WARNING: Coupon not configured in .env. No discount applied automatically.`;
      } else {
        const validation = validatePromotionPayload(promotion, cartItems);
        if (!validation.ok) {
          return NextResponse.json(
            { error: validation.message },
            { status: 400 }
          );
        }

        const applyResult = await graphqlRequest(
          APPLY_COUPON_MUTATION,
          { code: couponCode },
          sessionToken
        );

        if (applyResult.sessionToken) {
          sessionToken = applyResult.sessionToken;
        }

        if (applyResult.data.errors) {
           const isMissingCoupon = applyResult.data.errors.some((e: any) => 
             e.message?.includes('does not exist')
           );
           
           if (isMissingCoupon) {
              console.warn(`Coupon "${couponCode}" does not exist in WooCommerce.`);
              systemNote += `\n- WARNING: Coupon "${couponCode}" missing in backend.`;
           } else {
              console.error('Apply coupon errors:', applyResult.data.errors);
              systemNote += `\n- ERROR: Coupon failed to apply.`;
           }
        }
        
        // Append the note
        checkoutInput.customerNote = (checkoutInput.customerNote || '') + systemNote;
      }
    }

    // Step 4: Checkout
    const checkoutResult = await graphqlRequest(
      CHECKOUT_MUTATION,
      {
        paymentMethod: checkoutInput.paymentMethod,
        billing: checkoutInput.billing,
        shipping: checkoutInput.shipping,
        shipToDifferentAddress: checkoutInput.shipToDifferentAddress,
        customerNote: checkoutInput.customerNote || null,
      },
      sessionToken
    );

    if (checkoutResult.data.errors) {
      console.error('Checkout errors:', checkoutResult.data.errors);
      return NextResponse.json(
        { error: 'Checkout failed', details: checkoutResult.data.errors },
        { status: 400 }
      );
    }

    if (!checkoutResult.data.data?.checkout) {
      return NextResponse.json(
        { error: 'Checkout failed - no response data' },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      checkout: checkoutResult.data.data.checkout,
    });
  } catch (error: any) {
    console.error('API checkout error:', error);
    return NextResponse.json(
      { error: 'Checkout processing failed', message: error.message },
      { status: 500 }
    );
  }
}
