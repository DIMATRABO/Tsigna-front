import { Paper, rem, Group, Menu, Flex ,Text} from "@mantine/core";
import { IconDotsVertical, IconEye, IconTrash, IconCoin, IconWallet } from "@tabler/icons-react";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { PublicStrat } from "types/strategy"

type Props = {
    strategy : PublicStrat
}

const PublicStratCard = ({ strategy }: Props) => {
    const navigate = useNavigate()
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
                <Menu.Item
                  icon={<IconEye size={14} />}
                  onClick={() =>
                    openApiKeysModal(strategy.webhook_id, strategy.webhook_key)
                  }
                >
                  View Details
                </Menu.Item>
                <Menu.Item
                  icon={<IconTrash size={14} color="red" />}
                  onClick={() => openDeleteStartegyModal(strategy.id)}
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
              <IconWallet size="1.4rem" stroke={1.5} />
              <Text c="dimmed" fz="sm">
                {/* {wallets?.find((w) => w.id === strategy.)?.name} */}
                {/* {strategy.account_name} */}
              </Text>
            </Flex>
          </Flex>
          <Flex
            mt="sm"
            gap={20}
            align="center"
            // onClick={() => navigate(`/strategies/${strategy.id}`)}
          >
            <Flex direction={"column"}>
              <Text c="green" fz="xl" weight={500}>
                {/* {strategy.income_7_days} */}
              </Text>
              <Text c="dimmed" fz="sm">
                7D Income
              </Text>
            </Flex>
            <Flex direction={"column"}>
              <Text c="green" fz="xl" weight={500}>
                {/* {strategy.invested_7_days} */}
              </Text>
              <Text c="dimmed" fz="sm">
                7D Invested
              </Text>
            </Flex>
          </Flex>
          <Flex
            gap={20}
            align="center"
            // onClick={() => navigate(`/strategies/${strategy.id}`)}
          >
            <Flex direction={"column"}>
              <Text
                fz="xl"
                weight={500}
                sx={(theme) => ({ color: theme.colors.dark[4] })}
              >
                {/* {strategy.income_7_days_percent}% */}
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
                {/* {strategy.invested_7_days_percent}% */}
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
          </Flex>
        </Paper>
      );
}

export default PublicStratCard
