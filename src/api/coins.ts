import fetchResource from "./fetchResource";

const get = (categoryId?: string | null) => {
  return fetchResource(
    `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&price_change_percentage=1h,24h,7d${
      categoryId ? `&category=${categoryId}` : ""
    }`
  );
};

const endpoints = {
  get,
};

export default endpoints;
