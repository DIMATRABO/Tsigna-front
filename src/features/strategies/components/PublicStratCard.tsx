import {
  Paper,
  rem,
  Group,
  Menu,
  Flex,
  Text,
  Badge,
  Divider,
  Button,
} from "@mantine/core";
import { modals } from "@mantine/modals";
import {
  IconDotsVertical,
  IconEye,
  IconTrash,
  IconCoin,
  IconWallet,
  IconChartBar,
  IconScale,
} from "@tabler/icons-react";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { PublicStrat } from "types/strategy";
import SubscribeModal from "./SubscribeModal";

type Props = {
  strategy: PublicStrat;
};

const PublicStratCard = ({ strategy }: Props) => {
  const navigate = useNavigate();

  const openSubscribeModal = () =>
    modals.open({
      title: "Subscribe to this strategy",
      size: "xl",
      children: <SubscribeModal strategy={strategy} />,
    });

  return (
    <Paper
      withBorder
      p="md"
      radius="md"
      shadow="sm"
      sx={(theme) => ({
        minWidth: rem(300),
        cursor: "pointer",
      })}
      // onClick={() => navigate(`/strategies/${strategy.id}`)}
    >
      <Group position="apart" noWrap>
        <Text weight={500} size="lg">
          {strategy.name}
        </Text>

        {/* <Menu shadow="md" width={200}>
          <Menu.Target>
            <IconDotsVertical
              size="1.2rem"
              // style={{
              //   cursor: "pointer",
              // }}
            />
          </Menu.Target>

          <Menu.Dropdown>
            <Menu.Label>Webhook Details : </Menu.Label>
            <Menu.Item icon={<IconEye size={14} />}>View Details</Menu.Item>
            <Menu.Item
              icon={<IconTrash size={14} color="red" />}
              // onClick={() => openDeleteStartegyModal(strategy.id)}
              color="red"
            >
              Delete Strategy
            </Menu.Item>
          </Menu.Dropdown>
        </Menu> */}
      </Group>
      <Flex
        align="center"
        mt="sm"
        gap={10}
        sx={{
          cursor: "pointer",
        }}
        // onClick={() => navigate(`/strategies/${strategy.id}`)}
      >
        <Flex gap={5}>
          <IconCoin size="1.4rem" stroke={1.5} />
          <Text c="dimmed" fz="sm">
            {strategy.symbol}
          </Text>
        </Flex>
        <Flex gap={5}>
          <IconChartBar size="1.4rem" stroke={1.5} />
          <Badge color={strategy.is_future ? "blue" : "red"} variant="light">
            {strategy.is_future ? "Futures" : "Spot"}
          </Badge>
        </Flex>
        <Flex gap={5}>
          <IconScale size="1.4rem" stroke={1.5} />
          <Text c="dimmed" fz="sm">
            {strategy.leverage}
          </Text>
        </Flex>
      </Flex>
      <Divider my="sm" />
      <Flex gap={"md"}>
        <Text c="dimmed" fz="sm">
          <span style={{ fontWeight: "bold" }}>Backtested from :</span>{" "}
          {new Date(strategy.backtesting_start_date).toLocaleDateString()}
        </Text>
        <Text c="dimmed" fz="sm">
          <span style={{ fontWeight: "bold" }}>to :</span>{" "}
          {new Date(strategy.backtesting_end_date).toLocaleDateString()}
        </Text>
        <Text c="dimmed" fz="sm">
          <span style={{ fontWeight: "bold" }}>initial capital :</span>{" "}
          {strategy.backtesting_initial_capital}
        </Text>
      </Flex>
      <Flex
        mt="sm"
        gap={20}
        align="center"
        // onClick={() => navigate(`/strategies/${strategy.id}`)}
      >
        <Flex direction={"column"}>
          <Text c="dimmed" fz="sm">
            Net Profit
          </Text>
          <Text
            c={strategy.net_profit <= 0 ? "red" : "green"}
            fz="xl"
            weight={500}
          >
            {strategy.net_profit}
          </Text>
        </Flex>
        <Flex direction={"column"}>
          <Text c="dimmed" fz="sm">
            Total Closed Trades
          </Text>
          <Text fz="xl" weight={500}>
            {strategy.total_closed_trades}
          </Text>
        </Flex>
        <Flex direction={"column"}>
          <Text c="dimmed" fz="sm">
            Percent Profitable{" "}
          </Text>
          <Text
            c={strategy.percentage_profitable <= 0 ? "red" : "green"}
            fz="xl"
            weight={500}
          >
            {strategy.percentage_profitable} %
          </Text>
        </Flex>
        <Flex direction={"column"}>
          <Text c="dimmed" fz="sm">
            Max Drawdown
          </Text>
          <Text c="red" fz="xl" weight={500}>
            {strategy.max_drawdown}
          </Text>
        </Flex>
      </Flex>

      <Flex
        justify={"space-between"}
        mt={20}
        align="center"
        // onClick={() => navigate(`/strategies/${strategy.id}`)}
      >
        <Flex direction={"column"}>
          <Text c="dimmed" fz="sm">
            Capital :{" "}
            <span style={{ fontWeight: "bold" }}>{strategy.capital}</span>
          </Text>
          <Text c="dimmed" fz="sm">
            Runtime:
            <span style={{ fontWeight: "bold" }}>
              {
                // display how many days ago the strategy was created
                " " +
                  dayjs().diff(dayjs(strategy.backtesting_start_date), "day") +
                  " days"
              }
            </span>
          </Text>
        </Flex>
        <Button onClick={openSubscribeModal}>Copy</Button>
      </Flex>
    </Paper>
  );
};

export default PublicStratCard;
