import { useForm, zodResolver } from "@mantine/form";
import { LoginSchemaType, loginSchema } from "../schemas/authSchemas";
import {
  Anchor,
  Button,
  Checkbox,
  Container,
  Group,
  Paper,
  PasswordInput,
  TextInput,
  Title,
  Text,
  LoadingOverlay,
} from "@mantine/core";
import { useStyles } from "components/shared/styles";
import { useNavigate } from "react-router-dom";
import { loginUser } from "services/auth";
import { useMutation } from "@tanstack/react-query";
import { showNotification } from "@mantine/notifications";
import { useContext, useEffect } from "react";
import { AuthContext } from "context/user";

type Props = {};

const Login = ({}: Props) => {
  const {
    setAccessToken,
    isLoading: loadingUser,
    user,
  } = useContext(AuthContext);
  const form = useForm<LoginSchemaType>({
    validate: zodResolver(loginSchema),
    initialValues: {
      email: "",
      password: "",
      keepLoggedIn: false,
    },
  });
  const { classes } = useStyles();
  const navigate = useNavigate();

  const { mutate, isLoading } = useMutation(
    (values: LoginSchemaType) => loginUser(values.email, values.password),
    {
      onSuccess: (data) => {
        if (form.values.keepLoggedIn) {
          localStorage.setItem("access_token", data.access_token);
          localStorage.setItem("refresh_token", data.refresh_token);
        } else {
          sessionStorage.setItem("access_token", data.access_token);
          sessionStorage.setItem("refresh_token", data.refresh_token);
        }

        setAccessToken(data.access_token);
        showNotification({
          title: "Logged in!",
          message: "You are now logged in.",
          color: "teal",
        });
        window.location.reload();
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

  const onSubmit = (values: LoginSchemaType) => {
    mutate(values);
  };

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  if (loadingUser) {
    return <LoadingOverlay visible />;
  }

  if (user) {
    return null;
  }

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
      }}
    >
      <Paper withBorder shadow="md" p={30} mt={30} radius="md" w={500}>
        <Title
          align="center"
          size={25}
          sx={(theme) => ({
            fontFamily: `Greycliff CF, ${theme.fontFamily}`,
            fontWeight: 700,
          })}
        >
          Welcome back!
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
            {...form.getInputProps("email")}
            label="Email"
            placeholder="Enter your email"
            size="md"
          />
          <PasswordInput
            label="Password"
            placeholder="Enter your password"
            size="md"
            classNames={{
              input: classes.input,
            }}
            {...form.getInputProps("password")}
          />
          <Group position="apart" mt="lg">
            <Checkbox
              label="Remember me"
              // checked={form.values.keepLoggedIn}
              //   onChange={(event) => {
              //     form.setFieldValue("keepLoggedIn", event.currentTarget.checked);
              //   }}
              {...form.getInputProps("keepLoggedIn")}
            />
            <Anchor component="button" size="sm">
              Forgot password?
            </Anchor>
          </Group>
          <Button
            fullWidth
            mt="xl"
            type="submit"
            className={classes.button}
            loading={isLoading}
          >
            Sign in
          </Button>
        </form>
      </Paper>
      <Text color="dimmed" size="sm" align="center" mt={5}>
        Do not have an account yet?{" "}
        <Anchor size="sm" href="/signup" style={{ textDecoration: "none" }}>
          Create account
        </Anchor>
      </Text>
    </Container>
  );
};

export default Login;
