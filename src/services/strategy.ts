import instance from "lib/axios";
import { StrategySchema } from "types/strategy";

export const createStrategy = async (strategy: StrategySchema) => {
  const { data } = await instance.post("/strategies/", strategy);
  return data;
};
