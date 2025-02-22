import {
  Flex,
  LoadingOverlay,
  Paper,
  SimpleGrid,
  Title,
  createStyles,
  rem,
  Text,
  Badge,
} from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import DashboardCard from "features/dashboard/components/DashboardCard";
import { useState } from "react";
import { Bar, Pie } from "react-chartjs-2";
import { useNavigate, useParams } from "react-router-dom";
import { getStrategyDashboard } from "services/dashboard";
import { getPopularStrategies, getStrategy } from "services/strategy";
import { StrategyDashboardData } from "types/dashboard";
import { Strategy as IStrategy } from "types/strategy";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import {
  getMyOrdersByWebhook,
  getMyOrdersByWebhookPaginated,
} from "services/orders";
import { DataTable } from "mantine-datatable";
import { Order, OrderPaginated } from "types/order";
import dayjs from "dayjs";
import { getStatusColor, hexColors } from "utils/colors";
import { chartDataInit, options, pieOptions } from "utils/charts";

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

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,

  Tooltip,
  Legend
);

const LIMIT = 5;

function Strategy({}: Props) {
  const { classes } = useStyles();
  const [chartData, setChartData] = useState(chartDataInit);
  const [pieData, setPieData] = useState(chartDataInit);
  const [page, setPage] = useState(1);
  const id = useParams<{ id: string }>().id;
  const navigate = useNavigate();

  const { data: myStrategies, isLoading: loadingStrategies } = useQuery<
    IStrategy[]
  >(["myStrategies"], getPopularStrategies);

  const actualStrategy = myStrategies?.find((s) => s.id === id);

  const { data, isLoading } = useQuery<StrategyDashboardData>(
    ["strategy", actualStrategy?.webhook_id],
    () => getStrategyDashboard(actualStrategy?.webhook_id!),
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
          labels: data.orders_by_trading_pair.map((item) => item[0] as string),
          datasets: [
            {
              label: "Profit",
              data: data.orders_by_trading_pair.map(
                (item) => item[1] as number
              ),
              //@ts-ignore
              backgroundColor: hexColors,
              borderColor: "rgba(153, 102, 255, 0.5)",
            },
          ],
        });
      },
      onError: (error) => {
        navigate("/strategies");
      },
      enabled: !!actualStrategy?.webhook_id,
    }
  );

  const { data: ordersByStrategy, isFetching } = useQuery<Order[]>(
    ["ordersByWebhook", actualStrategy?.webhook_id],
    () => getMyOrdersByWebhook(actualStrategy?.webhook_id!),
    {
      enabled: !!actualStrategy?.webhook_id,
    }
  );

  const { data: ordersByStrategyPaginated } = useQuery<OrderPaginated>(
    ["ordersByWebhookPaginated", actualStrategy?.webhook_id, page],
    () =>
      getMyOrdersByWebhookPaginated(actualStrategy?.webhook_id!, page, LIMIT),
    {
      enabled: !!actualStrategy?.webhook_id,
    }
  );

  console.log("ordersByStrategyPaginated", ordersByStrategyPaginated);
  // console.log("strategy", myStrategies);
  console.log("ordersByStrategy", ordersByStrategy);

  if (isLoading || loadingStrategies) return <LoadingOverlay visible />;

  return (
    <Flex direction={"column"}>
      <Title
        my="md"
        size={25}
        sx={(theme) => ({
          fontFamily: `Greycliff CF, ${theme.fontFamily}`,
          fontWeight: 700,
          color:
            theme.colorScheme === "dark" ? theme.colors.dark[0] : undefined,
        })}
      >
        Strategy {actualStrategy?.name} Dashboard
      </Title>
      <SimpleGrid
        cols={4}
        breakpoints={[
          { maxWidth: "md", cols: 2 },
          { maxWidth: "xs", cols: 1 },
        ]}
      >
        <DashboardCard title="Total Orders" number={data?.total_orders ?? 0} />
        <DashboardCard
          title="Average Buy Price"
          number={data?.average_buy_price ?? 0}
        />
        <DashboardCard
          title="Average Sell Price"
          number={data?.average_sell_price ?? 0}
        />
        <DashboardCard
          title="Total Failed Orders"
          number={data?.total_failed_orders ?? 0}
        />
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
          totalRecords={ordersByStrategyPaginated?.total_records ?? 0}
          page={page}
          onPageChange={setPage}
          recordsPerPage={LIMIT}
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
                <Badge
                  color={getStatusColor(value.status)}
                  // sx={(theme) => ({
                  //   backgroundColor: getStatusColor(value.status),
                  //   color: theme.colorScheme === "dark" ? "white" : "black",
                  // })}
                >
                  {value.status}
                </Badge>
              ),
            },
          ]}
          records={ordersByStrategyPaginated?.orders ?? []}
        />
      </Paper>
    </Flex>
  );
}

export default Strategy;
