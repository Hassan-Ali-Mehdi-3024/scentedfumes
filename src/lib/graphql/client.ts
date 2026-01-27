import { cacheExchange, createClient, fetchExchange } from "urql";

const graphqlEndpoint =
  process.env.NEXT_PUBLIC_WORDPRESS_API_URL ??
  process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT ??
  "https://scentedfumes.com/graphql";

const isServer = typeof window === "undefined";

// Get or create WooCommerce session token
function getSessionToken(): string | null {
  if (isServer) return null;
  return localStorage.getItem("woo-session");
}

function setSessionToken(token: string) {
  if (isServer) return;
  localStorage.setItem("woo-session", token);
}

export const graphqlClient = createClient({
  url: graphqlEndpoint,
  requestPolicy: isServer ? "network-only" : "cache-first",
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
  exchanges: isServer ? [fetchExchange] : [cacheExchange, fetchExchange],
});

export { setSessionToken };
