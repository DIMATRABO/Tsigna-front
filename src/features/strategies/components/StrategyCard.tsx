import { Paper, rem, Group, Flex, Text, LoadingOverlay } from "@mantine/core";
import {
  IconStar,
  IconCoin,
  IconUserCircle,
  IconWallet,
} from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { getMyWallets } from "services/wallet";
import { Strategy } from "types/strategy";
import { IWallet } from "types/wallet";

type Props = {
  strategy: Strategy;
};

const StrategyCard = ({ strategy }: Props) => {
  const { data: wallets, isLoading } = useQuery<IWallet[]>(
    ["myWallets"],
    getMyWallets,
    {
      staleTime: Infinity,
      cacheTime: Infinity,
    }
  );

  if (isLoading) return <LoadingOverlay visible />;

  return (
    <Paper
      withBorder
      p="md"
      radius="md"
      shadow="sm"
      sx={(theme) => ({
        minWidth: rem(300),
      })}
    >
      {/* <Group position="apart" noWrap>
        <Text weight={500} size="lg"></Text>
        <IconStar size="1.2rem" />
      </Group> */}
      <Flex align="center" mt="sm" gap={10}>
        <Flex gap={5}>
          <IconCoin size="1.4rem" stroke={1.5} />
          <Text c="dimmed" fz="sm">
            {strategy.symbol}
          </Text>
        </Flex>
        <Flex gap={5}>
          <IconWallet size="1.4rem" stroke={1.5} />
          <Text c="dimmed" fz="sm">
            {/* {wallets?.find((w) => w.id === strategy.)?.name} */}
            {strategy.account_name}
          </Text>
        </Flex>
      </Flex>
      <Flex mt="sm" gap={20} align="center">
        <Flex direction={"column"}>
          <Text c="green" fz="xl" weight={500}>
            {strategy.income_7_days}
          </Text>
          <Text c="dimmed" fz="sm">
            7D Income
          </Text>
        </Flex>
        <Flex direction={"column"}>
          <Text c="green" fz="xl" weight={500}>
            {strategy.invested_7_days}
          </Text>
          <Text c="dimmed" fz="sm">
            7D Invested
          </Text>
        </Flex>
      </Flex>
      <Flex gap={20} align="center">
        <Flex direction={"column"}>
          <Text
            fz="xl"
            weight={500}
            sx={(theme) => ({ color: theme.colors.dark[4] })}
          >
            {strategy.income_7_days_percent}%
          </Text>
          <Text c="dimmed" fz="sm">
            7D Income
          </Text>
        </Flex>
        <Flex direction={"column"}>
          <Text
            fz="xl"
            weight={500}
            sx={(theme) => ({ color: theme.colors.dark[4] })}
          >
            {strategy.invested_7_days_percent}%
          </Text>
          <Text c="dimmed" fz="sm">
            7D Invested
          </Text>
        </Flex>
      </Flex>
      <Flex justify={"space-between"} mt={20} align="center">
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
                  dayjs().diff(dayjs(strategy.creation_date), "day") +
                  " days"
              }
            </span>
          </Text>
        </Flex>
      </Flex>
    </Paper>
  );
};

export default StrategyCard;
