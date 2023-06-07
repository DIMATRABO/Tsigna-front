import instance from "lib/axios";

export const getHomeData = async () => {
  const { data } = await instance.get("/dashboards/home");
  return data;
};
