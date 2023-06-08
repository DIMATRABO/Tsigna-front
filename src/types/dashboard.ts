// Generated by https://quicktype.io

export interface HomeData {
  total_orders: number;
  total_sell_orders: number;
  total_buy_orders: number;
  average_sell_price: number;
  average_buy_price: number;
  total_sell_quantitiy: number;
  total_buy_quantity: number;
  total_failed_orders: number;
  monthly_profit: number[];
  orders_by_strategy: Array<Array<number | string>>;
}

// Generated by https://quicktype.io

export interface StrategyDashboardData {
  total_orders: number;
  total_sell_orders: number;
  total_buy_orders: number;
  average_sell_price: null;
  average_buy_price: null;
  total_sell_quantitiy: null;
  total_buy_quantity: null;
  total_failed_orders: number;
  monthly_profit: number[];
  orders_by_trading_pair: any[];
}
