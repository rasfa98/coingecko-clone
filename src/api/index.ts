import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { selectCurrency } from "../app/appSlice";
import { useAppSelector } from "../app/hooks";
import { API } from "./types";

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.coingecko.com/api/v3",
  }),
  tagTypes: ["Coin", "Category"],
  endpoints: (build) => ({
    getCoins: build.query<
      API.Coin[],
      { categoryId?: string; currency: string }
    >({
      query: ({ currency, categoryId }) =>
        `/coins/markets?${new URLSearchParams({
          vs_currency: currency,
          price_change_percentage: "1h,24h,7d",
          sparkline: "true",
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
  const currency = useAppSelector(selectCurrency);

  return api.useGetCoinsQuery({ categoryId, currency });
};

export const useCategories = () => {
  return api.useGetCategoriesQuery();
};
