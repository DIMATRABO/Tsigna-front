import { Flex, TextInput, Select, Button } from "@mantine/core";
import { User } from "types/user";
import { EditUserSchema, EditUserValues } from "./Users";
import { useForm, zodResolver } from "@mantine/form";
import { DateInput } from "@mantine/dates";
import { updateUser } from "services/user";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { notifications } from "@mantine/notifications";

type Props = {
  user: User;
};

const EditUserForm = ({ user }: Props) => {
  const queryClient = useQueryClient();
  const formEdit = useForm<EditUserValues>({
    validate: zodResolver(EditUserSchema),
    initialValues: {
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      birthday: new Date(user.birthday),
    },
  });

  const { mutate, isLoading } = useMutation(
    (values: EditUserValues) =>
      updateUser(user.id, user.client_id || "", values),
    {
      onSuccess: () => {
        notifications.show({
          title: "User updated successfully",
          message: "User updated successfully",
          color: "green",
        });
        queryClient.invalidateQueries(["users"]);
      },
      onError: (error) => {
        notifications.show({
          title: "Error",
          message: "Error updating user",
          color: "red",
        });
      },
    }
  );

  const OnEdit = (values: EditUserValues) => {
    mutate(values);
  };

  return (
    <form onSubmit={formEdit.onSubmit(OnEdit)}>
      <Flex w="100%" direction="column" gap={20}>
        <TextInput
          placeholder="First name"
          label="First name"
          size="md"
          // w="100%"
          {...formEdit.getInputProps("first_name")}
        />
        <TextInput
          placeholder="Last name"
          size="md"
          label="Last name"
          // w="100%"
          {...formEdit.getInputProps("last_name")}
        />
        <TextInput
          placeholder="Your email"
          size="md"
          label="Email"
          // w="100%"
          {...formEdit.getInputProps("email")}
        />

        <DateInput
          placeholder="Birth date"
          size="md"
          label="Birth date"
          // w="100%"
          {...formEdit.getInputProps("birthday")}
        />

        {/* <Select
          placeholder="Select your subscription"
          size="md"
          label="Subscription"
          dropdownPosition="bottom"
          // w="100%"
          {...formEdit.getInputProps("subscription")}
          data={[
            { value: "Subscription 1", label: "Subscription 1" },
            { value: "Subscription 2", label: "Subscription 2" },
            { value: "Subscription 3", label: "Subscription 3" },
          ]}
        /> */}

        <Button
          color="violet"
          variant="light"
          fullWidth
          type="submit"
          loading={isLoading}
        >
          Save
        </Button>
      </Flex>
    </form>
  );
};

export default EditUserForm;
