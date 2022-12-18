import fetchResource from "./fetchResource";

const get = () => {
  return fetchResource(
    "https://api.coingecko.com/api/v3/coins/categories/list"
  );
};

const endpoints = {
    get,
};

export default endpoints;
