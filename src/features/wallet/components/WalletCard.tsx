import { Card, Group, Badge, Image, Text } from "@mantine/core";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import { IWallet } from "types/wallet";

type Props = {
  wallet: IWallet;
};

const WalletCard = ({ wallet }: Props) => {
  return (
    <Link
      to={`/wallet/${wallet.id}`}
      key={wallet.id}
      style={{
        textDecoration: "none",
      }}
    >
      <Card
        shadow="sm"
        padding="lg"
        radius="md"
        withBorder
        sx={(theme) => ({
          "&:hover": {
            transform: "scale(1.02)",
            transition: "all 0.3s ease-in-out",
            backgroundColor:
              theme.colorScheme === "dark" ? theme.colors.dark[5] : "",
          },
        })}
      >
        <Card.Section
          sx={{
            overflow: "hidden",
          }}
        >
          <Image src={`${wallet.exchange.image}`} height={160} alt="Norway" />
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
            {dayjs(wallet.created_at).format("DD/MM/YYYY")}
          </Text>
        </Group>
      </Card>
    </Link>
  );
};

export default WalletCard;
