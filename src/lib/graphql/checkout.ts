import { graphqlClient } from "./client";
import { CheckoutInput, CheckoutResponse } from "@/types/checkout";

const CHECKOUT_MUTATION = `
  mutation Checkout($input: CheckoutInput!) {
    checkout(input: $input) {
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

export async function processCheckout(input: CheckoutInput) {
  const response = await graphqlClient
    .mutation<CheckoutResponse>(CHECKOUT_MUTATION, { input })
    .toPromise();

  if (response.error) {
    throw response.error;
  }

  return response.data?.checkout;
}
