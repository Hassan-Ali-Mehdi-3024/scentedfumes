export const APPLY_COUPON_MUTATION = `
  mutation ApplyCoupon($code: String!) {
    applyCoupon(input: { code: $code }) {
      cart {
        appliedCoupons {
          code
        }
      }
    }
  }
`;

