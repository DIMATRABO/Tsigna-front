import instance from "lib/axios";
import { StrategySchema } from "types/strategy";

export const createStrategy = async (strategy: StrategySchema) => {
  const { data } = await instance.post("/strategies/", strategy);
  return data;
};

export const getStrategies = async () => {
  const { data } = await instance.get("/strategies/me");
  return data;
};

export const getPopularStrategies = async () => {
  const { data } = await instance.get("/strategies/advanced/me");
  return data;
};
