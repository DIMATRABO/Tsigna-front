import {
  Flex,
  Group,
  LoadingOverlay,
  Menu,
  Paper,
  Text,
  rem,
} from "@mantine/core";
import { modals } from "@mantine/modals";
import {
  IconCoin,
  IconDotsVertical,
  IconEye,
  IconWallet,
} from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { getMyWallets } from "services/wallet";
import { Strategy } from "types/strategy";
import { IWallet } from "types/wallet";
import ApiKeyModal from "./ApiKeyModal";

type Props = {
  strategy: Strategy;
};

const StrategyCard = ({ strategy }: Props) => {
  const navigate = useNavigate();
  const { data: wallets, isLoading } = useQuery<IWallet[]>(
    ["myWallets"],
    getMyWallets,
    {
      staleTime: Infinity,
      cacheTime: Infinity,
    }
  );

  const openApiKeysModal = (webhookUrl: string, webhookKey: string) =>
    modals.open({
      title: "Webhook Details ",

      children: <ApiKeyModal webhookUrl={webhookUrl} webhookKey={webhookKey} />,
    });

  if (isLoading) return <LoadingOverlay visible />;

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

        <Menu shadow="md" width={200}>
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
            <Menu.Item
              icon={<IconEye size={14} />}
              onClick={() =>
                openApiKeysModal(strategy.webhook_id, strategy.webhook_key)
              }
            >
              View Details
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Group>
      <Flex
        align="center"
        mt="sm"
        gap={10}
        sx={{
          cursor: "pointer",
        }}
        onClick={() => navigate(`/strategies/${strategy.id}`)}
      >
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
      <Flex
        mt="sm"
        gap={20}
        align="center"
        onClick={() => navigate(`/strategies/${strategy.id}`)}
      >
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
      <Flex
        gap={20}
        align="center"
        onClick={() => navigate(`/strategies/${strategy.id}`)}
      >
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
      <Flex
        justify={"space-between"}
        mt={20}
        align="center"
        onClick={() => navigate(`/strategies/${strategy.id}`)}
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
