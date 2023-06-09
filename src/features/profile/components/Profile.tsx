import {
  Box,
  Text,
  Image,
  Flex,
  Paper,
  TextInput,
  Button,
  SimpleGrid,
  PasswordInput,
} from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { IconUser } from "@tabler/icons-react";
import { useMutation } from "@tanstack/react-query";
import { AuthContext } from "context/user";
import { useContext } from "react";
import { changePassword } from "services/user";
import { z } from "zod";

export const ProfileSchema = z
  .object({
    // firstName: z.string({ required_error: "First name is required" }).nonempty(),
    // lastName: z
    //   .string({ required_error: "Last name is required" })
    //   .nonempty({ message: "Last name is required" }),
    // email: z
    //   .string({ required_error: "Email is required" })
    //   .email({ message: "Invalid email" }),
    // phone: z
    //   .string({ required_error: "Phone is required" })
    //   .nonempty({ message: "Phone is required" }),
    // address: z.string().nonempty({ message: "Address is required" }),
    password: z.string().nonempty({ message: "Password is required" }),
    newPassword: z.string().nonempty({ message: "New password is required" }),
    confirmPassword: z
      .string()
      .nonempty({ message: "Confirm password is required" }),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type ProfileSchemaType = z.infer<typeof ProfileSchema>;

function Profile() {
  const { setUser, user } = useContext(AuthContext);
  const form = useForm<ProfileSchemaType>({
    validate: zodResolver(ProfileSchema),
  });

  const onLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    sessionStorage.removeItem("access_token");
    sessionStorage.removeItem("refresh_token");
    setUser(null);
  };

  const { mutate, isLoading } = useMutation(
    (values: ProfileSchemaType) => changePassword(values),
    {
      onSuccess(data, variables, context) {
        notifications.show({
          title: "Password changed successfully",
          message: "You can now login with your new password",
          color: "green",
        });
        onLogout();
      },
      onError(error, variables, context) {
        notifications.show({
          title: "Password change failed",
          message: "Please check your password and try again",
          color: "red",
        });
      },
    }
  );

  const onSubmit = (values: ProfileSchemaType) => {
    mutate(values);
  };

  return (
    <Box>
      <Box
        sx={(theme) => ({
          display: "flex",
          alignItems: "center",
          backgroundColor: theme.colors.violet[9],
          height: 200,
        })}
      >
        <Text
          sx={{
            color: "white",
            fontSize: 20,
            fontWeight: 700,
            width: "90%",
            margin: "auto",
          }}
        >
          My Profile
        </Text>
      </Box>
      <form onSubmit={form.onSubmit(onSubmit)}>
        <Paper
          p="md"
          shadow="sm"
          mt="md"
          sx={{
            display: "flex",
            gap: 20,
            transform: "translateY(-20%)",
            width: "90%",
            margin: "auto",
            "@media (max-width: 36rem)": {
              flexDirection: "column",
              gap: 0,
            },
          }}
        >
          <Flex
            direction={"column"}
            align={"center"}
            sx={(theme) => ({
              paddingRight: 20,
            })}
          >
            <Flex
              mt="md"
              mx="md"
              sx={{
                width: 100,
                height: 100,
              }}
            >
              {/* <Image
                src="https://picsum.photos/600/600"
                alt="it's me"
                radius={100}
              /> */}
              <IconUser size={100} />
            </Flex>
            <Text mt="md" weight={700}>
              {user && user?.first_name + " " + user?.last_name}
            </Text>
            <Text weight={"lighter"} size={"sm"}>
              {user && user?.email}
            </Text>
          </Flex>
          <Box>
            <SimpleGrid
              cols={2}
              spacing={10}
              mt="md"
              breakpoints={[{ maxWidth: "36rem", cols: 1, spacing: "sm" }]}
            >
              {/* <TextInput
                mt="md"
                label="First name"
                placeholder="first name"
                {...form.getInputProps("firstName")}
              />
              <TextInput
                mt="md"
                label="Last name"
                placeholder="last name"
                {...form.getInputProps("lastName")}
              /> */}
              {/* <TextInput
                mt="md"
                label="Phone"
                placeholder="phone number"
                {...form.getInputProps("phone")}
              /> */}
              {/* <TextInput
                mt="md"
                label="Email"
                placeholder="email"
                {...form.getInputProps("email")}
              /> */}
              <PasswordInput
                mt="md"
                label="Old password"
                placeholder="old password"
                {...form.getInputProps("password")}
              />
              <PasswordInput
                mt="md"
                label="New password"
                placeholder="new password"
                {...form.getInputProps("newPassword")}
              />
              <PasswordInput
                mt="md"
                label="Confirm new password"
                placeholder="Confirm new password"
                {...form.getInputProps("confirmPassword")}
              />
            </SimpleGrid>
            <Button
              mt="md"
              type="submit"
              variant="light"
              color="violet"
              sx={{
                "@media (max-width: 36rem)": {
                  width: "100%",
                },
              }}
              loading={isLoading}
            >
              Save
            </Button>
            <Button mt="md" ml="md" color="red" onClick={onLogout}>
              Logout
            </Button>
          </Box>
        </Paper>
      </form>
    </Box>
  );
}

export default Profile;
