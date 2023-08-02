import { SubscribeStrategySchema } from "features/strategies/schemas/strategy";
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

export const getSubscribedStrategiesPaginated = async (
  userId: string,
  page_number: number,
  page_size: number
) => {
  // publicstrategies/subscribed/21fc28f2-b965-4a90-891e-28fef9ce6316?page=1&page_size=2
  const { data } = await instance.get(
    "/publicstrategies/subscribed/" +
      userId +
      "?page=" +
      page_number +
      "&page_size=" +
      page_size
  );
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

export const getPublicStrategiesPaginated = async (
  page: number,
  pageSize: number
) => {
  const { data } = await instance.get(
    "/publicstrategies?page=" + page + "&page_size=" + pageSize
  );
  return data;
};

export const subscribeToStrategy = async (
  subscribeData: SubscribeStrategySchema
) => {
  console.log("subscribeData", subscribeData);
  const { data } = await instance.post("/publicstrategies/subscribe", {
    ...subscribeData,
    webhook_id: subscribeData.webhook_id || null,
  });
  return data;
};
