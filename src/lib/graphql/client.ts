import { cacheExchange, createClient, fetchExchange } from "urql";

const graphqlEndpoint =
  process.env.NEXT_PUBLIC_WORDPRESS_API_URL ??
  process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT ??
  "https://scentedfumes.com/graphql";

export const graphqlClient = createClient({
  url: graphqlEndpoint,
  fetchOptions: () => ({
    credentials: "include",
    headers: {
      "content-type": "application/json",
    },
  }),
  exchanges: [cacheExchange, fetchExchange],
});