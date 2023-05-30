import {
  Button,
  Divider,
  Flex,
  LoadingOverlay,
  Paper,
  SimpleGrid,
  Text,
} from "@mantine/core";
import { modals } from "@mantine/modals";
import { useQuery } from "@tanstack/react-query";
import { useStyles } from "components/shared/styles";
import { getMyWallets } from "services/wallet";
import { IWallet } from "types/wallet";
import ConnectWalletModal from "./ConnectWalletModal";
import WalletCard from "./WalletCard";

type Props = {};

// export const wallets = [
//   {
//     id: "1",
//     name: "My First wallet",
//     balance: 1200,
//     created: "12/12/2021",
//     image: "binance.jpg",
//   },
//   {
//     id: "2",
//     name: "Kucoin wallet",
//     balance: 2300,
//     created: "12/12/2021",
//     image: "kucoin.png",
//   },
//   {
//     id: "3",
//     name: "Last wallet",
//     balance: 1923,
//     created: "12/12/2021",
//     image: "bybit.png",
//   },
// ];

const Wallet = ({}: Props) => {
  const { classes } = useStyles();
  const { data, isLoading } = useQuery<IWallet[]>(["myWallets"], getMyWallets);

  const openConnectWalletModal = () =>
    modals.open({
      title: "Connect wallet",
      children: <ConnectWalletModal />,
      size: "xl",
    });

  if (isLoading) return <LoadingOverlay visible />;

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
          <Button className={classes.button} onClick={openConnectWalletModal}>
            Connect new wallet
          </Button>
        </Flex>
        <Divider />
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
          {data &&
            data.length > 0 &&
            data?.map((wallet) => (
              <WalletCard wallet={wallet} key={wallet.id} />
            ))}
        </SimpleGrid>
      </Paper>
    </Flex>
  );
};

export default Wallet;
