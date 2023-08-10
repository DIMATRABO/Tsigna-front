import { Flex, TextInput, Select, Button } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { useForm, zodResolver } from "@mantine/form";
import { z } from "zod";

type Props = {};

export const AddUserSchema = z.object({
  firstName: z.string().nonempty({ message: "First name is required" }),
  lastName: z.string().nonempty({ message: "Last name is required" }),
  email: z.string().email({ message: "Invalid email" }),
  subscription: z.string().nonempty({ message: "Subscription is required" }),
  birthDate: z.date(),
});

export type AddUserValues = z.infer<typeof AddUserSchema>;

const AddUserForm = ({}: Props) => {
  const formAdd = useForm<AddUserValues>({
    validate: zodResolver(AddUserSchema),
  });

  const OnAdd = (values: AddUserValues) => {
    console.log(values);
  };

  return (
    <form onSubmit={formAdd.onSubmit(OnAdd)}>
      <Flex w="100%" direction="column" gap={20}>
        <TextInput
          placeholder="First name"
          label="First name"
          size="md"
          {...formAdd.getInputProps("firstName")}
        />

        <TextInput
          placeholder="Last name"
          size="md"
          label="Last name"
          {...formAdd.getInputProps("lastName")}
        />
        <TextInput
          placeholder="email"
          size="md"
          label="Email"
          {...formAdd.getInputProps("email")}
        />
        <TextInput
          placeholder="password"
          size="md"
          label="Password"
          type="password"
          {...formAdd.getInputProps("password")}
        />
        <Select
          placeholder="Select subscription"
          size="md"
          label="Subscription"
          dropdownPosition="bottom"
          data={[
            { value: "Subscription 1", label: "Subscription 1" },
            { value: "Subscription 2", label: "Subscription 2" },
            { value: "Subscription 3", label: "Subscription 3" },
          ]}
          {...formAdd.getInputProps("subscription")}
        />
        <DateInput
          label="Birth date"
          placeholder="Birth date"
          {...formAdd.getInputProps("birthDate")}
        />

        <Button color="violet" fullWidth type="submit">
          Add User
        </Button>
      </Flex>
    </form>
  );
};

export default AddUserForm;
