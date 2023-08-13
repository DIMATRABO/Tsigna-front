import { Paper, Text, Badge } from "@mantine/core";

import { DataTable } from "mantine-datatable";

const dataTable = [
  {
    id: 1,
    date: "2021-09-01",
    tradingPair: "BTC/USDT",
    direction: "Buy",
    amount: 100,
    entryPrice: 100,
  },
  {
    id: 2,
    date: "2021-09-01",
    tradingPair: "BTC/USDT",
    direction: "Sell",
    amount: 100,
    entryPrice: 100,
  },
  {
    id: 3,
    date: "2021-09-01",
    tradingPair: "BTC/USDT",
    direction: "Buy",
    amount: 100,
    entryPrice: 100,
  },
];

const DataTableComponent = () => {
  return (
    <Paper
      style={{
        width: "100%",
        padding: "20px",
        borderRadius: "10px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <Text c="dimmed" tt="uppercase" fw={700} fz="xs" pb={20}>
        Recent Trades
      </Text>
      <DataTable
        withBorder
        striped
        columns={[
          {
            accessor: "date",
          },
          {
            accessor: "tradingPair",
          },
          {
            accessor: "direction",
            render: (value) => (
              <Badge color={value.direction === "Buy" ? "green" : "red"}>
                {value.direction}
              </Badge>
            ),
          },
          {
            accessor: "amount",
          },
          {
            accessor: "entryPrice",
          },
        ]}
        records={dataTable}
      />
    </Paper>
  );
};

export default DataTableComponent;
