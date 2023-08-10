import { Card, Group, Badge, Image, Text, Menu, Flex } from "@mantine/core";
import { modals } from "@mantine/modals";
import { notifications } from "@mantine/notifications";
import { IconDotsVertical, IconEye, IconTrash } from "@tabler/icons-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import { deletWallet } from "services/wallet";
import { IWallet } from "types/wallet";

type Props = {
  wallet: IWallet;
};

const WalletCard = ({ wallet }: Props) => {
  const queryClient = useQueryClient();

  const { mutate: deleteWalletMutation, isLoading: isDeleting } = useMutation(
    (id: string) => deletWallet(id),
    {
      onSuccess(data, variables, context) {
        notifications.show({
          title: "Wallet Deleted",

          message: "Wallet deleted successfully",
          color: "teal",
        });
        queryClient.invalidateQueries(["myWallets"]);
      },
      onError(error, variables, context) {
        notifications.show({
          title: "Error",

          message: "Error deleting Wallet",
          color: "red",
        });
      },
    }
  );

  const openDeleteWalletModal = (id: string) =>
    modals.openConfirmModal({
      title: "Delete Wallet",
      children: (
        <Flex direction={"column"} gap="md">
          <Text weight={"bold"}>
            Are you sure you want to delete this wallet ?
          </Text>
          <Text>
            Deleting wallet will delete all associated strategies and orders
          </Text>
        </Flex>
      ),
      confirmProps: {
        color: "red",
        variant: "outline",
      },
      cancelProps: {
        variant: "outline",
      },
      labels: {
        confirm: "Delete",
        cancel: "Cancel",
      },
      onConfirm: () => {
        deleteWalletMutation(id);
      },
    });

  return (
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
        {wallet.exchange && wallet.exchange.image && (
          <Image
            src={`${wallet.exchange.image}`}
            height={160}
            alt="wallet image"
          />
        )}
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
          <Badge color={wallet.balance > 0 ? "green" : "red"} variant="light">
            {wallet.balance && wallet.balance >= 0
              ? `${wallet.balance || 0} $`
              : "Cannot Access Wallet"}
          </Badge>
        </Text>
      </Group>
      <Flex
        // mt="sm"
        // mb="xs"
        sx={(theme) => ({
          color: theme.colors.gray[5],
        })}
        justify={"space-between"}
      >
        <Flex gap="md">
          <Text weight={500} size={12}>
            Created :
          </Text>
          <Text weight={500} size={12}>
            {dayjs(wallet.created_at).format("DD/MM/YYYY")}
          </Text>
        </Flex>
        <Menu shadow="md" width={200} position="bottom">
          <Menu.Target>
            <IconDotsVertical
              size="1.2rem"
              style={{
                cursor: "pointer",
              }}
            />
          </Menu.Target>

          <Menu.Dropdown>
            <Menu.Item
              icon={<IconTrash size={14} color="red" />}
              onClick={() => openDeleteWalletModal(wallet.id)}
              color="red"
            >
              Delete Wallet
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Flex>
    </Card>
  );
};

export default WalletCard;
