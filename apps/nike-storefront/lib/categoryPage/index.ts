import type { GetStaticPropsContext } from "next";
import type { ChannelContext } from "@/lib/appContext";
import apolloClient from "@/lib/graphql";
import { contextToRegionQuery } from "@/lib/regions";
import {
  CategoryBySlugDocument,
  CategoryBySlugQuery,
  CategoryBySlugQueryVariables,
  ProductCollectionDocument,
  ProductCollectionQuery,
  ProductCollectionQueryVariables,
} from "@saleor-api";

export interface CategoryPageContext extends ChannelContext {
  slug: string;
}

export const loadCategoryBySlug = async (
  context: GetStaticPropsContext<CategoryPageContext>,
  slug: string
) => {
  const { locale } = contextToRegionQuery(context);

  const {
    data: { category },
  } = await apolloClient.query<CategoryBySlugQuery, CategoryBySlugQueryVariables>({
    query: CategoryBySlugDocument,
    variables: { slug, locale },
  });

  return category;
};

export const loadProductsByCatId = async (
  context: GetStaticPropsContext<CategoryPageContext>,
  categoryId: string
) => {
  const { channel, locale } = contextToRegionQuery(context);

  const {
    data: { products },
  } = await apolloClient.query<ProductCollectionQuery, ProductCollectionQueryVariables>({
    query: ProductCollectionDocument,
    variables: {
      filter: { categories: [categoryId] },
      first: 20,
      channel,
      locale,
    },
  });

  return products;
};
