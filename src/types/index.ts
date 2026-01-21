export interface ProductImage {
  sourceUrl: string;
  altText: string;
}

export interface ProductCategory {
  name: string;
  slug: string;
}

export interface Product {
  id: string;
  databaseId: number;
  slug: string;
  name: string;
  description?: string;
  shortDescription?: string;
  price?: string; // Contains HTML entities such as &nbsp; (optional for VariableProduct)
  regularPrice?: string;
  stockStatus?: string; // e.g. "IN_STOCK" | "OUT_OF_STOCK"
  productType?: string; // "SimpleProduct" | "VariableProduct"
  image: ProductImage;
  productCategories?: {
    nodes: ProductCategory[];
  };
  related?: {
    nodes: Product[];
  };
}

export interface CartItem extends Product {
  quantity: number;
}
