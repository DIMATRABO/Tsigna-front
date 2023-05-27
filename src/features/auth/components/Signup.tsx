import { useForm, zodResolver } from "@mantine/form";
import { SignupSchemaType, signupSchema } from "../schemas/authSchemas";
import {
  Anchor,
  Button,
  Container,
  Paper,
  TextInput,
  Text,
  Title,
  PasswordInput,
} from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { useStyles } from "components/shared/styles";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { registerUser } from "services/auth";
import { showNotification } from "@mantine/notifications";

type Props = {};

const Signup = ({}: Props) => {
  const form = useForm<SignupSchemaType>({
    validate: zodResolver(signupSchema),
  });
  const { classes } = useStyles();
  const navigate = useNavigate();

  const { mutate, isLoading } = useMutation(
    (values: SignupSchemaType) => registerUser(values),
    {
      onSuccess: () => {
        showNotification({
          title: "Account created!",
          message: "You can now login to your account.",
          color: "teal",
        });
        navigate("/login");
      },
      onError: (error) => {
        showNotification({
          title: "Error",
          message: "Something went wrong. Please try again later",
          color: "red",
        });
      },
    }
  );

  const onSubmit = (values: SignupSchemaType) => {
    mutate(values);
  };

  return (
    <Container
      size={720}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        margin: "auto",
      }}
    >
      <Paper withBorder shadow="md" p={30} mt={30} radius="md" w={"80%"}>
        <Title
          align="center"
          size={25}
          sx={(theme) => ({
            fontFamily: `Greycliff CF, ${theme.fontFamily}`,
            fontWeight: 700,
          })}
        >
          Sign up!
        </Title>

        <form
          onSubmit={form.onSubmit(onSubmit)}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            padding: "1rem",
          }}
        >
          <TextInput
            {...form.getInputProps("firstName")}
            label="First Name"
            placeholder="Enter your first name"
            size="md"
          />
          <TextInput
            {...form.getInputProps("lastName")}
            label="Last Name"
            placeholder="Enter your last name"
            size="md"
          />
          <DateInput
            {...form.getInputProps("birthday")}
            label="Date of Birth"
          />
          <TextInput
            {...form.getInputProps("email")}
            label="Email"
            placeholder="Enter your email"
            size="md"
          />
          <PasswordInput
            {...form.getInputProps("password")}
            label="Password"
            placeholder="Enter your password"
            size="md"
          />
          <PasswordInput
            {...form.getInputProps("confirmPassword")}
            label="Confirm Password"
            placeholder="Enter your password"
            size="md"
          />
          <Button
            type="submit"
            fullWidth
            className={classes.button}
            loading={isLoading}
          >
            Signup
          </Button>
        </form>
      </Paper>
      <Text color="dimmed" size="sm" align="center" mt={5}>
        Already have an account?{" "}
        <Anchor size="sm" href="/signin" style={{ textDecoration: "none" }}>
          Sign in
        </Anchor>
      </Text>
    </Container>
  );
};

export default Signup;
