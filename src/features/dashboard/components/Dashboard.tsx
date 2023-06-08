import {
  Title,
  createStyles,
  Group,
  Paper,
  SimpleGrid,
  Text,
  rem,
  ThemeIcon,
  Flex,
  Badge,
  Box,
  LoadingOverlay,
} from "@mantine/core";
import { IconUserPlus } from "@tabler/icons-react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar, Line, Pie } from "react-chartjs-2";
import "chart.js/auto";
import { DataTable } from "mantine-datatable";
import "./test.css";
import { theme } from "config/mantine";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getHomeData } from "services/dashboard";
import DashboardCard from "./DashboardCard";
import { HomeData } from "types/dashboard";
import { getMyOrders } from "services/orders";
import { Order } from "types/order";
import dayjs from "dayjs";

type Props = {};

const useStyles = createStyles((theme) => ({
  root: {
    padding: `calc(${theme.spacing.xl} * 1.5)`,
  },

  value: {
    fontSize: rem(24),
    fontWeight: 700,
    lineHeight: 1,
  },

  diff: {
    lineHeight: 1,
    display: "flex",
    alignItems: "center",
  },

  icon: {
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[3]
        : theme.colors.gray[4],
  },

  title: {
    fontWeight: 700,
    textTransform: "uppercase",
  },
}));

const data = [
  {
    title: "Revenue",
    icon: "IconReceipt2",
    value: "13,456",
    diff: 34,
  },
  {
    title: "Profit",
    icon: "IconCoin",
    value: "4,145",
    diff: -13,
  },
  {
    title: "Coupons usage",
    icon: "IconDiscount2",
    value: "745",
    diff: 18,
  },
  {
    title: "New customers",
    icon: "IconUserPlus",
    value: "188",
    diff: -30,
  },
];

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

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,

  Tooltip,
  Legend
);

const chartDataInit = {
  labels: ["January", "February", "March", "April", "May"],
  datasets: [
    {
      label: "Revenue",
      data: [-50, 70, -40, 60, 80],
      backgroundColor: [-50, 70, -40, 60, 80].map((n) => {
        if (n < 0) return "rgba(255, 99, 132, 0.5)";
        else return "rgba(54, 162, 235, 0.5)";
      }), // Violet color
      borderColor: "rgba(153, 102, 255, 0.5)",
    },
  ],
};

const options = {
  plugins: {
    legend: {
      labels: {
        boxWidth: 0,
      },
    },
  },
  scales: {
    y: {
      // beginAtZero: true,
      grid: {
        color: "#80808040",
      },
    },
    x: {
      grid: {
        color: "#80808040",
      },
    },
  },
};

const pieOptions = {
  scales: {
    y: {
      // beginAtZero: true,
      grid: {
        color: "#80808040",
      },
    },
    x: {
      grid: {
        color: "#80808040",
      },
    },
  },
};

const Dashboard = ({}: Props) => {
  const { classes } = useStyles();
  const [chartData, setChartData] = useState(chartDataInit);
  const [pieData, setPieData] = useState(chartDataInit);

  const { data: homeData, isLoading } = useQuery<HomeData>(
    ["homeData"],
    getHomeData,
    {
      onSuccess(data) {
        setChartData({
          labels: Object.keys(data?.monthly_profit ?? {}).map((item) =>
            dayjs()
              //@ts-ignore
              .month(item as number)
              .format("MMM")
          ),
          datasets: [
            {
              label: "Profit",
              data: Object.values(data?.monthly_profit ?? {}),
              backgroundColor:
                //change color if negative
                Object.values(data?.monthly_profit ?? {}).map((n) => {
                  if (n < 0) return "rgba(255, 99, 132, 0.5)";
                  else return "rgba(54, 162, 235, 0.5)";
                }),

              borderColor: "rgba(153, 102, 255, 0.5)",
            },
          ],
        });
        setPieData({
          labels: data.orders_by_strategy.map((item) => item[0] as string),
          datasets: [
            {
              label: "Profit",
              data: data.orders_by_strategy.map((item) => item[1] as number),
              //@ts-ignore
              backgroundColor: Object.values(data?.monthly_profit ?? {}).map(
                (n) => {
                  return `hsl(${Math.floor(Math.random() * 360)}, 100%, 50%)`;
                }
              ),
              borderColor: "rgba(153, 102, 255, 0.5)",
            },
          ],
        });
      },
    }
  );

  const { data: myOrders, isFetching } = useQuery<Order[]>(
    ["myOrders"],
    getMyOrders
  );
  console.log("homeData", homeData);
  console.log("myOrders", myOrders);

  if (isLoading) return <LoadingOverlay visible />;

  return (
    <Flex direction="column">
      <Title
        size={25}
        sx={(theme) => ({
          fontFamily: `Greycliff CF, ${theme.fontFamily}`,
          fontWeight: 700,
          color:
            theme.colorScheme === "dark" ? theme.colors.dark[0] : undefined,
        })}
      >
        Welcome to the dashboard!
      </Title>
      <Box className={classes.root}>
        <SimpleGrid
          cols={4}
          breakpoints={[
            { maxWidth: "md", cols: 2 },
            { maxWidth: "xs", cols: 1 },
          ]}
        >
          <DashboardCard
            title="Total Orders"
            number={homeData?.total_orders ?? 0}
          />
          <DashboardCard
            title="Total Buy Orders"
            number={homeData?.total_buy_orders ?? 0}
          />
          <DashboardCard
            title="Total Sell Orders"
            number={homeData?.total_sell_orders ?? 0}
          />
          <DashboardCard
            title="Total Failed Orders"
            number={homeData?.total_failed_orders ?? 0}
          />
          {/* {data.map((item) => (
            <Paper withBorder p="md" radius="md" key={item.title}>
              <Group position="apart">
                <div>
                  <Text
                    c="dimmed"
                    tt="uppercase"
                    fw={700}
                    fz="xs"
                    // className={classes.label}
                  >
                    {item.title}
                  </Text>
                  <Text fw={700} fz="xl">
                    {item.value}
                  </Text>
                </div>
                <ThemeIcon
                  color="gray"
                  variant="light"
                  sx={(theme) => ({
                    color:
                      item.diff > 0
                        ? theme.colors.teal[6]
                        : theme.colors.red[6],
                  })}
                  size={38}
                  radius="md"
                >
                  <IconUserPlus size="1.8rem" stroke={1.5} />
                </ThemeIcon>
              </Group>
              <Text c="dimmed" fz="sm" mt="md">
                <Text
                  component="span"
                  c={item.diff > 0 ? "teal" : "red"}
                  fw={700}
                >
                  {item.diff}%
                </Text>{" "}
                {item.diff > 0 ? "increase" : "decrease"} compared to last month
              </Text>
            </Paper>
          ))} */}
        </SimpleGrid>
        <Flex
          w="100%"
          direction="column"
          justify="between"
          align="center"
          gap={20}
          py={20}
          sx={(theme) => ({
            "@media (min-width: 1080px)": {
              flexDirection: "row",
              padding: "10 0",
            },
          })}
        >
          <Paper
            sx={(theme) => ({
              flex: 1,
              height: "400px",

              maxWidth: "600px",
              borderRadius: "10px",
              padding: "5px",
              "@media (min-width: 1080px)": {
                padding: "20px",
              },
            })}
          >
            <Bar data={chartData} options={options} />
          </Paper>
          <Paper
            sx={(theme) => ({
              flex: 1,
              borderRadius: "10px",
              height: "400px",

              maxWidth: "400px",
              padding: "5px",
              "@media (min-width: 1080px)": {
                padding: "20px",
              },
            })}
          >
            <Pie data={pieData} options={pieOptions} />
          </Paper>
        </Flex>
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
            fetching={isFetching}
            withBorder
            striped
            columns={[
              {
                accessor: "execution_date",
                title: "Execution Date",
                render: (value) => (
                  <Text c="dimmed" fz="sm">
                    {new Date(value.execution_date).toLocaleString()}
                  </Text>
                ),
              },
              {
                accessor: "symbol",
                title: "Symbol",
              },
              {
                accessor: "is_buy",
                render: (value) => (
                  <Badge color={value.is_buy ? "green" : "red"}>
                    {value.is_buy ? "Buy" : "Sell"}
                  </Badge>
                ),
              },
              {
                accessor: "amount",
                title: "Amount",
              },
              {
                accessor: "execution_price",
                title: "Execution Price",
              },
              {
                accessor: "status",
                title: "Status",
                render: (value) => (
                  <Badge color={value.status === "closed" ? "red" : "green"}>
                    {value.status}
                  </Badge>
                ),
              },
            ]}
            records={myOrders}
          />
        </Paper>
      </Box>
    </Flex>
  );
};

export default Dashboard;
