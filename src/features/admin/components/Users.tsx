import {
  ActionIcon,
  Badge,
  Button,
  Divider,
  Flex,
  Group,
  Select,
  Switch,
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
import { useMutation, useQuery } from "@tanstack/react-query";
import { activateUser, deleteUser, getAllUsersPaginated } from "services/user";
import { useState } from "react";
import { IUsersResponse, User } from "types/user";
import EditUserForm from "./EditUserForm";
import { showNotification } from "@mantine/notifications";

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

  const {
    data: users,
    isFetching,
    refetch,
  } = useQuery<IUsersResponse>(["users", page], () =>
    getAllUsersPaginated(page, LIMIT)
  );

  const { mutate: activateUserMutation, isLoading: isActivating } = useMutation(
    (id: string) => activateUser(id),
    {
      onSuccess: () => {
        showNotification({
          title: "User activated",
          message: "User has been activated",
          color: "green",
        });
        refetch();
      },
      onError: (error) => {
        showNotification({
          title: "User activation failed",
          message: "Something went wrong",
          color: "red",
        });
      },
    }
  );

  const { mutate: deleteUserMutation, isLoading: isDeleting } = useMutation(
    (id: string) => deleteUser(id),
    {
      onSuccess: () => {
        showNotification({
          title: "User deleted",
          message: "User has been deleted",
          color: "green",
        });
        refetch();
      },
      onError: (error) => {
        showNotification({
          title: "User deletion failed",
          message: "Something went wrong",
          color: "red",
        });
      },
    }
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

  const deleteUsers = (id: string) =>
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
      onConfirm: () => {
        deleteUserMutation(id);
      },
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
        fetching={isFetching || isActivating}
        totalRecords={users?.total_records || 0}
        columns={[
          { accessor: "first_name" },
          { accessor: "last_name" },
          { accessor: "email" },
          {
            accessor: "expiration_date",
            title: "Expiration Date",
            render: (value) =>
              new Date(value.expiration_date).toLocaleDateString(),
          },
          // {
          //   accessor: "subscription_plan",
          //   render: (value) => (
          //     <Badge color="violet" variant="light">
          //       {value.subscription_plan}
          //     </Badge>
          //   ),
          // },
          {
            accessor: "is_actif",
            title: "Active",
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
                  <IconTrash size={16} onClick={() => deleteUsers(user.id)} />
                </ActionIcon>
                <Switch
                  checked={user.is_actif}
                  onChange={() => activateUserMutation(user.id)}
                />
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
