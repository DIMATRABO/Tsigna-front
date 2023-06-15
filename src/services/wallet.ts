import { WalletForm } from "features/wallet/schemas/wallet";
import instance from "lib/axios";

export const createWallet = async (wallet: WalletForm) => {
  const { data } = await instance.post("/accounts/", wallet);
  return data;
};

export const getMyWallets = async () => {
  const { data } = await instance.get("/accounts/me");
  return data;
};

export const deletWallet = async (id: string) => {
  const { data } = await instance.delete("/accounts/" + id);
  return data;
};
