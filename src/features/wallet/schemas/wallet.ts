import { object, string, z } from "zod";

export const walletForm = object({
  name: string({ required_error: "Wallet name is required" }),
  exchange_id: string({ required_error: "Exchange is required" }),
  currency: string({ required_error: "Currency is required" }),
  api_key: string({ required_error: "API key is required" }),
  secret: string({ required_error: "Secret is required" }),
  passphrase: string({ required_error: "Passphrase is required" }).optional(),
});

export type WalletForm = z.infer<typeof walletForm>;
