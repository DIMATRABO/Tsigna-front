import instance from "lib/axios";

export const getMyOrders = async () => {
  const { data } = await instance.get("/orders/me");
  return data;
};
