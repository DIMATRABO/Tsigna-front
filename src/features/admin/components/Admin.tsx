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

export const EditUserSchema = z.object({
  firstName: z.string().nonempty({ message: "First name is required" }),
  lastName: z.string().nonempty({ message: "Last name is required" }),
  email: z.string().email({ message: "Invalid email" }),
  subscription: z.string().nonempty({ message: "Subscription is required" }),
  birthDate: z.string().nonempty({ message: "Birth date is required" }),
});

export type EditUserValues = z.infer<typeof EditUserSchema>;

function Admin() {
  const formEdit = useForm<EditUserValues>({
    validate: zodResolver(EditUserSchema),
  });

  const OnEdit = (values: EditUserValues) => {
    console.log(values);
  };

  const records = [
    {
      firstName: "User 1",
      lastName: "User 1",
      email: "user1@email.com",
      subscription: "Subscription 1",
      action: "Action 1",
      birthDate: "01/01/2001",
    },
  ];
  const editUser = () =>
    modals.open({
      title: "Edit User",
      size: "lg",

      children: (
        <form onSubmit={formEdit.onSubmit(OnEdit)}>
          <Flex w="100%" direction="column" gap={20}>
            <TextInput
              placeholder="First name"
              label="First name"
              size="md"
              // w="100%"
              defaultValue={records[0].firstName}
              {...formEdit.getInputProps("firstName")}
            />
            <TextInput
              placeholder="Last name"
              size="md"
              label="Last name"
              // w="100%"
              defaultValue={records[0].email}
              {...formEdit.getInputProps("lastName")}
            />
            <TextInput
              placeholder="Your email"
              size="md"
              label="Email"
              // w="100%"
              defaultValue={records[0].email}
              {...formEdit.getInputProps("email")}
            />

            <Select
              placeholder="Select your subscription"
              size="md"
              label="Subscription"
              dropdownPosition="bottom"
              // w="100%"
              defaultValue={records[0].subscription}
              {...formEdit.getInputProps("subscription")}
              data={[
                { value: "Subscription 1", label: "Subscription 1" },
                { value: "Subscription 2", label: "Subscription 2" },
                { value: "Subscription 3", label: "Subscription 3" },
              ]}
            />

            <Button color="violet" variant="light" fullWidth type="submit">
              Save
            </Button>
          </Flex>
        </form>
      ),
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
        columns={[
          { accessor: "firstName" },
          { accessor: "lastName" },
          { accessor: "email" },
          { accessor: "birthDate" },
          {
            accessor: "subscription",
            render: () => (
              <Badge color="violet" variant="light">
                {records[0].subscription}
              </Badge>
            ),
          },
          {
            accessor: "action",
            textAlignment: "left",
            render: () => (
              <Group spacing={4} position="left" noWrap>
                <ActionIcon color="blue">
                  <IconEdit size={16} onClick={editUser} />
                </ActionIcon>
                <ActionIcon color="red">
                  <IconTrash size={16} onClick={() => deleteUsers()} />
                </ActionIcon>
              </Group>
            ),
          },
        ]}
        records={records}
      />
    </Flex>
  );
}

export default Admin;
