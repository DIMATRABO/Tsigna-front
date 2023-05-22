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
import { modals } from "@mantine/modals";
import {
  IconAt,
  IconEdit,
  IconEye,
  IconSearch,
  IconTrash,
} from "@tabler/icons-react";
import { DataTable } from "mantine-datatable";
import React from "react";

const records = [
  {
    name: "User 1",
    email: "user1@email.com",
    subscription: "Subscription 1",
    action: "Action 1",
  },
];

function Admin() {
  const editUser = () =>
    modals.open({
      title: "Edit User",
      size: "lg",

      children: (
        <Flex w="100%" direction="column" gap={20}>
          <TextInput
            placeholder="Your name"
            label="Name"
            size="md"
            // w="100%"
            defaultValue={records[0].name}
          />
          <TextInput
            placeholder="Your email"
            label="Email"
            // w="100%"
            defaultValue={records[0].email}
          />

          <Select
            placeholder="Select your subscription"
            label="Subscription"
            // w="100%"
            defaultValue={records[0].subscription}
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
      ),
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
      })}
    >
      <TextInput
        placeholder="Search for a user"
        icon={<IconSearch size="0.8rem" />}
        py={10}
      />
      <DataTable
        withBorder
        borderRadius="sm"
        withColumnBorders
        striped
        verticalAlignment="top"
        fontSize={16}
        columns={[
          { accessor: "name" },
          { accessor: "email" },
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
