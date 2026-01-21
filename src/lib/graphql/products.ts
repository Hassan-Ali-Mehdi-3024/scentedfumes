import { graphqlClient } from "./client";
import { Product, ProductCategory } from "@/types";

const GET_PRODUCTS_QUERY = `
  query GetProducts {
    products(first: 20) {
      nodes {
        id
        databaseId
        slug
        name
        image {
          sourceUrl
          altText
        }
        ... on SimpleProduct {
          price
          regularPrice
          stockStatus
          productCategories {
            nodes {
              name
              slug
            }
          }
        }
        ... on VariableProduct {
          price
          regularPrice
          stockStatus
          productCategories {
            nodes {
              name
              slug
            }
          }
        }
      }
    }
    productCategories(first: 20) {
      nodes {
        name
        slug
      }
    }
  }
`;

const GET_PRODUCT_SLUGS_QUERY = `
  query ProductSlugs {
    products(first: 50) {
      nodes {
        slug
      }
    }
  }
`;

const GET_PRODUCT_BY_SLUG_QUERY = `
  query ProductBySlug($slug: ID!) {
    product(id: $slug, idType: SLUG) {
      id
      databaseId
      slug
      name
      description
      shortDescription
      image {
        sourceUrl
        altText
      }
      ... on SimpleProduct {
        price
        regularPrice
        stockStatus
        productCategories {
          nodes {
            name
            slug
          }
        }
        related {
          nodes {
            id
            slug
            name
            image {
              sourceUrl
              altText
            }
          }
        }
      }
      ... on VariableProduct {
        price
        regularPrice
        stockStatus
        productCategories {
          nodes {
            name
            slug
          }
        }
        related {
          nodes {
            id
            slug
            name
            image {
              sourceUrl
              altText
            }
          }
        }
      }
    }
  }
`;

type ProductsResponse = {
  products?: {
    nodes: Product[];
  };
  productCategories?: {
    nodes: ProductCategory[];
  };
};

type ProductSlugsResponse = {
  products?: {
    nodes: { slug: string }[];
  };
};

type ProductBySlugResponse = {
  product?: Product;
};

export async function fetchProductsWithCategories() {
  const response = await graphqlClient
    .query<ProductsResponse>(GET_PRODUCTS_QUERY, {})
    .toPromise();

  if (response.error) {
    throw response.error;
  }

  const nodes = response.data?.products?.nodes ?? [];
  const products = nodes.filter(
    (node): node is Product => 
      Boolean(node) && 
      node.slug !== 'my-product' && 
      node.name !== 'My Product'
  );

  return {
    products,
    categories: response.data?.productCategories?.nodes ?? [],
  };
}

export async function fetchProductSlugs() {
  const response = await graphqlClient
    .query<ProductSlugsResponse>(GET_PRODUCT_SLUGS_QUERY, {})
    .toPromise();

  if (response.error) {
    throw response.error;
  }

  return response.data?.products?.nodes
    .filter((node) => node.slug !== 'my-product')
    .map((node) => node.slug) ?? [];
}

export async function fetchProductBySlug(slug: string) {
  const response = await graphqlClient
    .query<ProductBySlugResponse>(GET_PRODUCT_BY_SLUG_QUERY, { slug })
    .toPromise();

  if (response.error) {
    throw response.error;
  }

  return response.data?.product ?? null;
}
