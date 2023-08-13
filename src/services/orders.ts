import instance from "lib/axios";

export const getMyOrders = async () => {
  const { data } = await instance.get("/orders/me");
  return data;
};

export const getMyOrdersByWebhook = async (id: string) => {
  const { data } = await instance.get("/orders/me/strategy/" + id);
  return data;
};

export const getMyOrdersByWebhookPaginated = async (
  id: string,
  page: number,
  pageSize: number
) => {
  const { data } = await instance.get("/orders/paginate/me/strategy/" + id, {
    params: {
      page,
      page_size: pageSize,
    },
  });
  return data;
};

export const getMyOrdersPaginated = async (page: number, pageSize: number) => {
  const { data } = await instance.get("/orders/paginate/me", {
    params: {
      page,
      page_size: pageSize,
    },
  });
  return data;
};
