import { ActionIcon, Badge, Button, Flex } from "@mantine/core";
import { useForm } from "@mantine/form";
import { modals } from "@mantine/modals";
import { IconEye, IconPlus, IconTrash } from "@tabler/icons-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { PublicStratSchema } from "features/admin/schemas/strategies";
import { DataTable } from "mantine-datatable";
import { useState } from "react";
import {
  deleteStrategyAdmin,
  getPublicStrategiesPaginated,
} from "services/strategy";
import { PublicStratPaginated } from "types/strategy";
import AddPublicStrategie from "./AddPublicStrategie";
import { notifications } from "@mantine/notifications";
import ApiKeyModal from "features/strategies/components/ApiKeyModal";

type Props = {};

const LIMIT = 4;

const AdminStrategies = ({}: Props) => {
  const [page, setPage] = useState(1);
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery<PublicStratPaginated>(
    ["publicStrategies", page],
    () => getPublicStrategiesPaginated(page, LIMIT)
  );

  const { mutate, isLoading: loadingDelete } = useMutation(
    (id: string) => deleteStrategyAdmin(id),
    {
      onSuccess(data, variables, context) {
        notifications.show({
          title: "Strategy Deleted",
          message: "Strategy deleted successfully",
          color: "teal",
        });
        queryClient.invalidateQueries([
          "subscribedStrategies",
          "publicStrategies",
          "myStrategies",
        ]);
      },

      onError(error, variables, context) {
        notifications.show({
          title: "Error",
          message: "Error deleting strategy",
          color: "red",
        });
      },
    }
  );

  const openAddStrategyModal = () =>
    modals.open({
      title: "Add new strategy",
      size: "xl",
      children: <AddPublicStrategie />,
    });

  const openDeleteStartegyModal = (id: string) =>
    modals.openConfirmModal({
      title: "Delete strategy",
      children: "Are you sure you want to delete this strategy?",
      confirmProps: {
        color: "red",
        variant: "outline",
      },
      labels: {
        cancel: "Cancel",
        confirm: "Delete",
      },
      onConfirm: () => mutate(id),
    });

  const openApiKeysModal = (webhookUrl: string, webhookKey: string) =>
    modals.open({
      title: "Webhook Details ",

      children: <ApiKeyModal webhookUrl={webhookUrl} webhookKey={webhookKey} />,
    });

  return (
    <Flex
      direction="column"
      sx={(theme) => ({
        width: "100%",
        margin: "auto",
        gap: 10,
      })}
    >
      <Flex>
        <Button
          color="violet"
          size="md"
          leftIcon={<IconPlus />}
          onClick={openAddStrategyModal}
        >
          Add Strategie
        </Button>
      </Flex>
      <DataTable
        striped
        withBorder
        borderRadius={"md"}
        page={page}
        onPageChange={setPage}
        recordsPerPage={LIMIT}
        totalRecords={data?.total_records || 0}
        fetching={isLoading}
        records={data?.strategies || []}
        columns={[
          {
            accessor: "name",
            title: "Name",
          },
          {
            accessor: "max_drawdown",
            title: "Drawdown",
          },
          {
            accessor: "symbol",
            title: "Symbol",
          },
          {
            accessor: "is_future",
            title: "Future",
            render: (row) => (
              <Badge color={row.is_future ? "green" : "red"}>
                {row.is_future ? "Yes" : "No"}
              </Badge>
            ),
          },
          {
            accessor: "leverage",
            title: "Leverage",
          },
          {
            accessor: "capital",
            title: "Capital",
          },
          {
            accessor: "backtesting_initial_capital",
            title: " Backtesting Initial capital",
          },
          {
            accessor: "backtesting_start_date",
            title: "Backtesting start date",
            render: (row) => (
              <span>
                {new Date(row.backtesting_start_date).toLocaleDateString()}
              </span>
            ),
          },
          {
            accessor: "backtesting_end_date",
            title: "Backtesting end date",
            render: (row) => (
              <span>
                {new Date(row.backtesting_end_date).toLocaleDateString()}
              </span>
            ),
          },
          {
            accessor: "net_profit",
            title: "Net profit",
          },
          {
            accessor: "total_closed_trades",
            title: "Total closed trades",
          },
          {
            accessor: "percentage_profitable",
            title: "Percentage profitable",
          },
          {
            accessor: "Actions",
            title: "Actions",
            render: (row) => (
              <Flex gap="md">
                <ActionIcon
                  color="blue"
                  variant="outline"
                  onClick={() =>
                    openApiKeysModal(row.webhook_id, row.webhook_key)
                  }
                >
                  <IconEye />
                </ActionIcon>
                <ActionIcon
                  color="red"
                  variant="outline"
                  onClick={() => openDeleteStartegyModal(row.id)}
                >
                  <IconTrash />
                </ActionIcon>
              </Flex>
            ),
          },
        ]}
      />
    </Flex>
  );
};

export default AdminStrategies;
