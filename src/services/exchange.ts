import instance from "lib/axios";

export const getAllExchanges = async () => {
  const { data } = await instance.get("/exchanges");
  return data;
};

export const getAllCurrencies = async (wallet: string) => {
  const { data } = await instance.get("/exchanges/quotes/" + wallet);
  return data;
};

export const getSymbols = async (id: string) => {
  const { data } = await instance.get("/exchanges/symbols/" + id);
  return data;
};
