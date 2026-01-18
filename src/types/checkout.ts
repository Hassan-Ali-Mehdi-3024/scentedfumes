export interface CheckoutInput {
  clientMutationId: string;
  billing: {
    firstName: string;
    lastName: string;
    address1: string;
    city: string;
    state: string;
    postcode: string;
    country: string;
    email: string;
    phone: string;
  };
  shipping: {
    firstName: string;
    lastName: string;
    address1: string;
    city: string;
    state: string;
    postcode: string;
    country: string;
  };
  shipToDifferentAddress: boolean;
  paymentMethod: string;
  isPaid: boolean;
  metaData?: {
    key: string;
    value: string;
  }[];
}

export interface CartItem {
  productId: number;
  quantity: number;
  variationId?: number;
}

export interface Order {
  databaseId: number;
  orderNumber: string;
  total: string;
  status: string;
}

export interface CheckoutResponse {
  checkout: {
    order: Order;
    result: string;
    redirect: string;
  };
}
