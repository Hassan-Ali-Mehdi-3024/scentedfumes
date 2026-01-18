import { cacheExchange, createClient, fetchExchange } from "urql";

const graphqlEndpoint =
  process.env.NEXT_PUBLIC_WORDPRESS_API_URL ??
  process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT ??
  "https://scentedfumes.com/graphql";

// Get or create WooCommerce session token
function getSessionToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('woo-session');
}

function setSessionToken(token: string) {
  if (typeof window === 'undefined') return;
  localStorage.setItem('woo-session', token);
}

export const graphqlClient = createClient({
  url: graphqlEndpoint,
  fetchOptions: () => {
    const sessionToken = getSessionToken();
    return {
      credentials: "include",
      headers: {
        "content-type": "application/json",
        ...(sessionToken ? { "woocommerce-session": `Session ${sessionToken}` } : {}),
      },
    };
  },
  exchanges: [cacheExchange, fetchExchange],
});

export { setSessionToken };