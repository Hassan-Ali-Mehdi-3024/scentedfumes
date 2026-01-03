import { graphqlClient } from "./client";
import { Product, ProductCategory } from "@/types";

const GET_CATEGORY_QUERY = `
  query GetCategory($slug: ID!, $first: Int = 50, $categorySlug: String!) {
    productCategory(id: $slug, idType: SLUG) {
      id
      name
      slug
      description
    }
    products(first: $first, where: { category: $categorySlug }) {
      nodes {
        ... on SimpleProduct {
          id
          databaseId
          slug
          name
          price
          regularPrice
          stockStatus
          image {
            sourceUrl
            altText
          }
          productCategories {
            nodes {
              name
              slug
            }
          }
        }
      }
    }
  }
`;

const GET_CATEGORY_SLUGS_QUERY = `
  query CategorySlugs {
    productCategories(first: 20) {
      nodes {
        slug
      }
    }
  }
`;

type CategoryResponse = {
  productCategory?: ProductCategory & { description?: string };
  products?: {
    nodes: Product[];
  };
};

type CategorySlugsResponse = {
  productCategories?: {
    nodes: { slug: string }[];
  };
};

export async function fetchCategorySlugs() {
  const response = await graphqlClient
    .query<CategorySlugsResponse>(GET_CATEGORY_SLUGS_QUERY, {})
    .toPromise();

  if (response.error) {
    throw response.error;
  }

  return response.data?.productCategories?.nodes.map((node) => node.slug) ?? [];
}

export async function fetchCategoryBySlug(slug: string) {
  const response = await graphqlClient
    .query<CategoryResponse>(GET_CATEGORY_QUERY, { slug, categorySlug: slug })
    .toPromise();

  if (response.error) {
    throw response.error;
  }

  const category = response.data?.productCategory ?? null;
  const products = response.data?.products?.nodes.filter((node): node is Product => Boolean(node)) ?? [];

  return {
    category,
    products,
  };
}
