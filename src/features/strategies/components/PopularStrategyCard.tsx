import {
  Paper,
  rem,
  Group,
  Flex,
  Text,
  LoadingOverlay,
  Button,
} from "@mantine/core";
import {
  IconStar,
  IconCoin,
  IconUserCircle,
  IconWallet,
  IconUser,
} from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import { useStyles } from "components/shared/styles";
import { getMyWallets } from "services/wallet";
import { Strategy } from "types/strategy";
import { IWallet } from "types/wallet";

type Props = {
  //   strategy: Strategy;
};

const PopularStrategyCard = ({}: Props) => {
  //   const { data: wallets, isLoading } = useQuery<IWallet[]>(
  //     ["myWallets"],
  //     getMyWallets,
  //     {
  //       staleTime: Infinity,
  //       cacheTime: Infinity,
  //     }
  //   );

  //   if (isLoading) return <LoadingOverlay visible />;
  const { classes } = useStyles();

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
            {/* {strategy.symbol} */}
            Symbol
          </Text>
        </Flex>
        <Flex gap={5}>
          <IconWallet size="1.4rem" stroke={1.5} />
          <Text c="dimmed" fz="sm">
            Exchange Name
          </Text>
        </Flex>{" "}
        <Flex gap={5}>
          <IconUser size="1.4rem" stroke={1.5} />
          <Text c="dimmed" fz="sm">
            69
          </Text>
        </Flex>
      </Flex>
      <Flex mt="sm" gap={20} align="center">
        <Flex direction={"column"}>
          <Text c="green" fz="xl" weight={500}>
            750.00%
          </Text>
          <Text c="dimmed" fz="sm">
            7D Roi
          </Text>
        </Flex>
        <Flex direction={"column"}>
          <Text c="green" fz="xl" weight={500}>
            21,000.00
          </Text>
          <Text c="dimmed" fz="sm">
            7D PNL
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
            750.00%
          </Text>
          <Text c="dimmed" fz="sm">
            7D Roi
          </Text>
        </Flex>
        <Flex direction={"column"}>
          <Text
            fz="xl"
            weight={500}
            sx={(theme) => ({ color: theme.colors.dark[4] })}
          >
            00%
          </Text>
          <Text c="dimmed" fz="sm">
            7D PNL
          </Text>
        </Flex>
      </Flex>
      <Flex justify={"space-between"} mt={20} align="center">
        <Flex direction={"column"}>
          <Text c="dimmed" fz="sm">
            Capital : <span style={{ fontWeight: "bold" }}>154545</span>
          </Text>
          <Text c="dimmed" fz="sm">
            Runtime:
            <span style={{ fontWeight: "bold" }}> 2 days</span>
          </Text>
        </Flex>
        <Button className={classes.button}>Copy</Button>
      </Flex>
    </Paper>
  );
};

export default PopularStrategyCard;
