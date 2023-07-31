import {
  ActionIcon,
  Badge,
  Button,
  Divider,
  Flex,
  Group,
  Select,
  Text,
  TextInput,
} from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { modals } from "@mantine/modals";
import { IconEdit, IconSearch, IconTrash } from "@tabler/icons-react";
import { DataTable } from "mantine-datatable";
import { useForm, zodResolver } from "@mantine/form";
import { z } from "zod";
import AddUserForm from "./AddUserForm";
import { useQuery } from "@tanstack/react-query";
import { getAllUsersPaginated } from "services/user";
import { useState } from "react";
import { IUsersResponse, User } from "types/user";
import EditUserForm from "./EditUserForm";

export const EditUserSchema = z.object({
  firstName: z.string().nonempty({ message: "First name is required" }),
  lastName: z.string().nonempty({ message: "Last name is required" }),
  email: z.string().email({ message: "Invalid email" }),
  subscription: z.string().nonempty({ message: "Subscription is required" }),
  birthDate: z.string().nonempty({ message: "Birth date is required" }),
});

export type EditUserValues = z.infer<typeof EditUserSchema>;

const LIMIT = 10;

function Users() {
  const [page, setPage] = useState(1);

  const { data: users, isFetching } = useQuery<IUsersResponse>(
    ["users", page],
    () => getAllUsersPaginated(page, LIMIT)
  );

  const editUser = (user: User) =>
    modals.open({
      title: "Edit User",
      size: "lg",

      children: <EditUserForm user={user} />,
    });

  const addUser = () =>
    modals.open({
      title: "Add User",
      size: "lg",
      children: <AddUserForm />,
    });

  const deleteUsers = () =>
    modals.openConfirmModal({
      title: "Delete User",
      children: (
        <Text size="sm">
          This action is so important that you are required to confirm it with a
          modal. Please click one of these buttons to proceed.
        </Text>
      ),
      confirmProps: { color: "red" },

      labels: { confirm: "Confirm", cancel: "Cancel" },
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
      <TextInput
        placeholder="Search for a user"
        icon={<IconSearch size="0.8rem" />}
        py={10}
      />
      <Button
        color="violet"
        onClick={() => addUser()}
        sx={{
          alignSelf: "flex-start",
        }}
      >
        Add User
      </Button>
      <DataTable
        withBorder
        borderRadius="sm"
        withColumnBorders
        striped
        verticalAlignment="top"
        fontSize={16}
        page={page}
        onPageChange={setPage}
        recordsPerPage={LIMIT}
        fetching={isFetching}
        totalRecords={users?.total_records || 0}
        columns={[
          { accessor: "first_name" },
          { accessor: "last_name" },
          { accessor: "email" },
          {
            accessor: "birthday",
            render: (value) => new Date(value.birthday).toLocaleDateString(),
          },
          {
            accessor: "subscription_plan",
            render: (value) => (
              <Badge color="violet" variant="light">
                {value.subscription_plan}
              </Badge>
            ),
          },
          {
            accessor: "is_actif",
            render: (value) => (
              <Badge color={value.is_actif ? "green" : "red"} variant="light">
                {value.is_actif ? "Active" : "Inactive"}
              </Badge>
            ),
          },
          {
            accessor: "action",
            textAlignment: "left",
            render: (user) => (
              <Group spacing={4} position="left" noWrap>
                <ActionIcon color="blue">
                  <IconEdit size={16} onClick={() => editUser(user)} />
                </ActionIcon>
                <ActionIcon color="red">
                  <IconTrash size={16} onClick={() => deleteUsers()} />
                </ActionIcon>
              </Group>
            ),
          },
        ]}
        records={users?.users}
      />
    </Flex>
  );
}

export default Users;
