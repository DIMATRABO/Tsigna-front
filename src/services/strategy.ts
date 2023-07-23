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

export const getStrategy = async (id: string) => {
  const { data } = await instance.get("/strategies/me/" + id);
  return data;
};

export const deleteStrategy = async (id: string) => {
  const { data } = await instance.delete("/strategies/" + id);
  return data;
};

export const getPublicStrategiesPaginated = async (page : number, pageSize : number) => {
  const {data} = await instance.get('/publicstrategies?page=' +  page + '&page_size=' + pageSize)
  return data
}