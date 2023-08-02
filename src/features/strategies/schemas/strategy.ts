import { boolean, number, object, string, z } from "zod";

// "account_id": "11488f9d-1e06-4707-ba30-5a9794f1346d",
//   "name": "1min SOLUSDT binance",
//   "symbol_base": "SOL",
//   "symbol_quote": "USD",
//   "is_future": true,
//   "leverage": 2.5,
//   "entry_size": 0.01,
//   "is_percentage": false,
//   "capital": 10000.0
export const createStrategySchema = object({
  account_id: string({ required_error: "Account id is required" }),
  name: string({ required_error: "Name is required" }),
  symbol: string({ required_error: "Symbol base is required" }),
  is_future: boolean({ required_error: "Is future is required" }).default(
    false
  ),
  leverage: number({ required_error: "Leverage is required" }).optional(),
  entry_size: number({ required_error: "Entry size is required" }),
  is_percentage: boolean({
    required_error: "Is percentage is required",
  }).default(true),
  capital: number({ required_error: "Capital is required" }),
});

export const subscribeStrategySchema = object({
  webhook_id: string({ required_error: "Webhook id is required" }).optional(),
  account_id: string({ required_error: "Account id is required" }),
  entry_size: number({ required_error: "Entry size is required" }),
  capital: number({ required_error: "Capital is required" }),
});

export type CreateStrategySchema = z.infer<typeof createStrategySchema>;
export type SubscribeStrategySchema = z.infer<typeof subscribeStrategySchema>;
