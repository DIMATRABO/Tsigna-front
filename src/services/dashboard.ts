import instance from "lib/axios";

export const getHomeData = async () => {
  const { data } = await instance.get("/dashboards/home");
  return data;
};

export const getStrategyDashboard = async (id: string) => {
  const { data } = await instance.get("/dashboards/strategy/" + id);
  return data;
};
