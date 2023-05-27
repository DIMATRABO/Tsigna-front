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
import { Bar, Line } from "react-chartjs-2";
import "chart.js/auto";
import { DataTable } from "mantine-datatable";
import "./test.css";
import { theme } from "config/mantine";
import { useEffect } from "react";

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

const chartData = {
  labels: ["January", "February", "March", "April", "May"],
  datasets: [
    {
      label: "Revenue",
      data: [50, 70, 40, 60, 80],
      backgroundColor: "rgba(153, 102, 255, 0.5)", // Violet color
      borderColor: "rgba(153, 102, 255, 0.5)",
    },
  ],
};

const options = {
  scales: {
    y: {
      beginAtZero: true,
      max: 100,
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
          {data.map((item) => (
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
          ))}
        </SimpleGrid>
        <Flex
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
              padding: "5px",
              "@media (min-width: 1080px)": {
                padding: "20px",
              },
            })}
          >
            <Line data={chartData} options={options} />
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
      </Box>
    </Flex>
  );
};

export default Dashboard;
