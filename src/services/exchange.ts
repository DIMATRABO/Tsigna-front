import instance from "lib/axios";

export const getAllExchanges = async () => {
  const { data } = await instance.get("/exchanges");
  return data;
};

export const getAllCurrencies = async () => {
  const { data } = await instance.get("/exchanges/quotes/lbank");
  return data;
};
