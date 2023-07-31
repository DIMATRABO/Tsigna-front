import { Flex, TextInput, Select, Button } from "@mantine/core";
import { User } from "types/user";
import { EditUserSchema, EditUserValues } from "./Users";
import { useForm, zodResolver } from "@mantine/form";

type Props = {
  user: User;
};

const EditUserForm = ({ user }: Props) => {
  const formEdit = useForm<EditUserValues>({
    validate: zodResolver(EditUserSchema),
  });

  const OnEdit = (values: EditUserValues) => {
    console.log(values);
  };

  return (
    <form onSubmit={formEdit.onSubmit(OnEdit)}>
      <Flex w="100%" direction="column" gap={20}>
        <TextInput
          placeholder="First name"
          label="First name"
          size="md"
          // w="100%"
          defaultValue={user.first_name}
          {...formEdit.getInputProps("firstName")}
        />
        <TextInput
          placeholder="Last name"
          size="md"
          label="Last name"
          // w="100%"
          defaultValue={user.last_name}
          {...formEdit.getInputProps("lastName")}
        />
        <TextInput
          placeholder="Your email"
          size="md"
          label="Email"
          // w="100%"
          defaultValue={user.email}
          {...formEdit.getInputProps("email")}
        />

        <Select
          placeholder="Select your subscription"
          size="md"
          label="Subscription"
          dropdownPosition="bottom"
          // w="100%"
          defaultValue={user.subscription_plan}
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
  );
};

export default EditUserForm;
