import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API } from "./types";

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.coingecko.com/api/v3",
  }),
  tagTypes: ["Coin", "Category"],
  endpoints: (build) => ({
    getCoins: build.query<API.Coin[], { categoryId?: string }>({
      query: ({ categoryId }) =>
        `/coins/markets?${new URLSearchParams({
          vs_currency: "usd",
          price_change_percentage: "1h,24h,7d",
          ...(categoryId ? { category: categoryId } : {}),
        }).toString()}`,
      providesTags: ["Coin"],
    }),
    getCategories: build.query<API.Category[], void>({
      query: () => "/coins/categories/list",
      providesTags: ["Category"],
    }),
  }),
});

export const useCoins = (categoryId?: string) => {
  return api.useGetCoinsQuery({ categoryId });
};

export const useCategories = () => {
  return api.useGetCategoriesQuery();
};
