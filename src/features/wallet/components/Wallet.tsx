import {
  Flex,
  Paper,
  Title,
  Text,
  Button,
  Divider,
  Badge,
  Card,
  Group,
  Image,
  SimpleGrid,
} from "@mantine/core";
import { useStyles } from "components/shared/styles";
import DataTableComponent from "components/shared/DataTableComponent";

type Props = {};

const wallets = [
  {
    name: "My First wallet",
    balance: 1200,
    created: "12/12/2021",
    image: "binance.jpg",
  },
  {
    name: "Kucoin wallet",
    balance: 2300,
    created: "12/12/2021",
    image: "kucoin.png",
  },
  {
    name: "Last wallet",
    balance: 1923,
    created: "12/12/2021",
    image: "bybit.png",
  },
];

const Wallet = ({}: Props) => {
  const { classes } = useStyles();
  return (
    <Flex
      direction="column"
      sx={(theme) => ({
        width: "90%",
        margin: "auto",
      })}
    >
      <Paper withBorder p="md" radius="md">
        <Flex justify={"space-between"} align="center" py={10}>
          <Text c="dimmed" tt="uppercase" fw={700} fz="xs">
            My Wallet
          </Text>
          <Button className={classes.button}>Connect new wallet</Button>
        </Flex>
        <Divider />
        {/* <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Card.Section component="a" href="https://mantine.dev/">
            <Image
              src="https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80"
              height={160}
              alt="Norway"
            />
          </Card.Section>

          <Group position="left" mt="sm" mb="xs">
            <Text weight={500}>Name :</Text>
            <Text weight={500}>My first wallet</Text>
          </Group>
          <Group position="left" mt="sm" mb="xs">
            <Text weight={500}>Name :</Text>
            <Text weight={500}>My first wallet</Text>
          </Group>
        </Card> */}
        <SimpleGrid
          py={10}
          cols={3}
          spacing="lg"
          breakpoints={[
            { maxWidth: "62rem", cols: 3, spacing: "md" },
            { maxWidth: "48rem", cols: 2, spacing: "sm" },
            { maxWidth: "36rem", cols: 1, spacing: "sm" },
          ]}
        >
          {wallets.map((wallet, index) => (
            <Card shadow="sm" padding="lg" radius="md" withBorder key={index}>
              <Card.Section>
                <Image src={`${wallet.image}`} height={160} alt="Norway" />
              </Card.Section>

              <Group
                position="left"
                mt="sm"
                mb="xs"
                spacing={20}
                sx={(theme) => ({
                  color:
                    theme.colorScheme === "dark"
                      ? theme.colors.gray[2]
                      : theme.colors.gray[7],
                })}
              >
                <Text weight={700}>Name :</Text>
                <Text weight={500}>{wallet.name}</Text>
              </Group>
              <Group
                position="left"
                mt="sm"
                mb="xs"
                sx={(theme) => ({
                  color:
                    theme.colorScheme === "dark"
                      ? theme.colors.gray[2]
                      : theme.colors.gray[7],
                })}
              >
                <Text weight={700}>Balance :</Text>
                <Text weight={500} color="green">
                  <Badge color="green" variant="light">
                    {wallet.balance} $
                  </Badge>
                </Text>
              </Group>
              <Group
                position="left"
                mt="sm"
                mb="xs"
                sx={(theme) => ({
                  color: theme.colors.gray[5],
                })}
              >
                <Text weight={500} size={12}>
                  Created :
                </Text>
                <Text weight={500} size={12}>
                  {wallet.created}
                </Text>
              </Group>
            </Card>
          ))}
        </SimpleGrid>
        <DataTableComponent />
      </Paper>
    </Flex>
  );
};

export default Wallet;
