import { boolean, date, number, object, string, z } from "zod";

export const publicStratSchema = object({
  name: string(),

  symbol: string(),
  symbol_id: string(),
  is_future: boolean(),
  leverage: number(),
  capital: number(),
  backtesting_start_date: date(),
  backtesting_end_date: date(),
  backtesting_initial_capital: number(),
  net_profit: number(),
  total_closed_trades: number(),
  percentage_profitable: number(),
  max_drawdown: number(),
});

export type PublicStratSchema = z.infer<typeof publicStratSchema>;
