import {
  Badge,
  Box,
  Flex,
  LoadingOverlay,
  Paper,
  SimpleGrid,
  Text,
  Title,
  createStyles,
  rem,
} from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Tooltip,
} from "chart.js";
import "chart.js/auto";
import dayjs from "dayjs";
import { DataTable } from "mantine-datatable";
import { useState } from "react";
import { Bar, Pie } from "react-chartjs-2";
import { getHomeData } from "services/dashboard";
import { getMyOrders, getMyOrdersPaginated } from "services/orders";
import { HomeData } from "types/dashboard";
import { Order, OrderPaginated } from "types/order";
import { chartDataInit, options, pieOptions } from "utils/charts";
import { getStatusColor, hexColors } from "utils/colors";
import DashboardCard from "./DashboardCard";
import "./test.css";

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

const LIMIT = 10;

const Dashboard = ({}: Props) => {
  const { classes } = useStyles();
  const [chartData, setChartData] = useState(chartDataInit);
  const [pieData, setPieData] = useState(chartDataInit);
  const [page, setPage] = useState(1);

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
              backgroundColor: hexColors,
              borderColor: "rgba(153, 102, 255, 0.5)",
            },
          ],
        });
      },
    }
  );

  const { data: myOrders } = useQuery<Order[]>(["myOrders"], getMyOrders);

  const { data: myOrdersPaginated, isFetching } = useQuery<OrderPaginated>(
    ["myOrdersPaginated", page],
    () => getMyOrdersPaginated(page, LIMIT)
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
          // w="100%"
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
            {homeData && <Bar data={chartData} options={options} />}
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
            totalRecords={myOrdersPaginated?.total_records ?? 0}
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
            records={myOrdersPaginated?.orders ?? []}
          />
        </Paper>
      </Box>
    </Flex>
  );
};

export default Dashboard;
