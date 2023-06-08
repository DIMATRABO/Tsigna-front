import instance from "lib/axios";

export const getMyOrders = async () => {
  const { data } = await instance.get("/orders/me");
  return data;
};

export const getMyOrdersByWebhook = async (id: string) => {
  const { data } = await instance.get("/orders/me/strategy/" + id);
  return data;
};
