import { NextRequest, NextResponse } from 'next/server';

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
  ) {
    checkout(input: {
      paymentMethod: $paymentMethod
      billing: $billing
      shipping: $shipping
      shipToDifferentAddress: $shipToDifferentAddress
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
    const { checkoutInput, cartItems } = body;

    let sessionToken: string | undefined;

    // Step 1: Empty cart
    const emptyResult = await graphqlRequest(EMPTY_CART_MUTATION, {}, sessionToken);
    if (emptyResult.sessionToken) {
      sessionToken = emptyResult.sessionToken;
    }

    if (emptyResult.data.errors) {
      console.error('Empty cart errors:', emptyResult.data.errors);
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

    // Step 3: Checkout
    const checkoutResult = await graphqlRequest(
      CHECKOUT_MUTATION,
      {
        paymentMethod: checkoutInput.paymentMethod,
        billing: checkoutInput.billing,
        shipping: checkoutInput.shipping,
        shipToDifferentAddress: checkoutInput.shipToDifferentAddress,
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
