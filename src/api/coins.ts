import fetchResource from "./fetchResource";

const markets = () => {
  return fetchResource(
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&price_change_percentage=1h,24h,7d&per_page=10"
  );
};

const endpoints = {
  markets,
};

export default endpoints;
