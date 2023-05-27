import { useParams } from "react-router-dom";
import { wallets } from "./Wallet";
import { Box, Image, Text } from "@mantine/core";
import DataTableComponent from "components/shared/DataTableComponent";

function MyWallet() {
  const { id } = useParams();
  return (
    <div>
      {wallets.map((wallet) => {
        if (wallet.id === id) {
          return (
            <>
              <Box
                key={wallet.id}
                p={20}
                sx={(theme) => ({
                  backgroundColor:
                    theme.colorScheme === "dark"
                      ? theme.colors.dark[7]
                      : theme.colors.gray[0],
                })}
              >
                <Image
                  src={`/${wallet.image}`}
                  height={160}
                  alt="Norway"
                  style={{
                    margin: "auto",
                    display: "block",
                  }}
                />
                <Text c="dimmed" size={24}>
                  {wallet.name}
                </Text>
                <Text size={18}>
                  Balance :{" "}
                  <span
                    style={{
                      color: wallet.balance > 0 ? "green" : "red",
                      fontWeight: "bold",
                    }}
                  >
                    {wallet.balance}
                  </span>
                </Text>
                <Text>Created : {wallet.created}</Text>
              </Box>
              <DataTableComponent />
            </>
          );
        }
      })}
    </div>
  );
}

export default MyWallet;
