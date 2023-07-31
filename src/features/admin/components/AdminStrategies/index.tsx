import { Button, Flex } from "@mantine/core";
import { useForm } from "@mantine/form";
import { modals } from "@mantine/modals";
import { IconPlus } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import { PublicStratSchema } from "features/admin/schemas/strategies";
import { DataTable } from "mantine-datatable";
import { useState } from "react";
import { getPublicStrategiesPaginated } from "services/strategy";
import { PublicStratPaginated } from "types/strategy";
import AddPublicStrategie from "./AddPublicStrategie";

type Props = {};

const LIMIT = 4;

const AdminStrategies = ({}: Props) => {
  const [page, setPage] = useState(1);

  const { data, isLoading } = useQuery<PublicStratPaginated>(
    ["publicStrategies", page],
    () => getPublicStrategiesPaginated(page, LIMIT)
  );

  const openAddStrategyModal = () =>
    modals.open({
      title: "Add new strategy",
      size: "xl",
      children: <AddPublicStrategie />,
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
        ]}
      />
    </Flex>
  );
};

export default AdminStrategies;
