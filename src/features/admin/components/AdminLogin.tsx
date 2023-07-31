import { useForm, zodResolver } from "@mantine/form";
import {
  AdminLoginSchemaType,
  LoginSchemaType,
  adminLoginSchema,
  loginSchema,
} from "../../auth/schemas/authSchemas";
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
import { useMutation } from "@tanstack/react-query";
import { adminLogin } from "services/auth";
import { showNotification } from "@mantine/notifications";
import { AuthContext } from "context/user";
import { useContext, useEffect } from "react";
type Props = {};

const AdminLogin = ({}: Props) => {
  const form = useForm<AdminLoginSchemaType>({
    validate: zodResolver(adminLoginSchema),
  });
  const { classes } = useStyles();
  const navigate = useNavigate();
  const {
    setAccessToken,
    isLoading: loadingUser,
    user,
  } = useContext(AuthContext);

  const { mutate } = useMutation(
    (values: AdminLoginSchemaType) => adminLogin(values.login, values.password),
    {
      onSuccess(data, variables, context) {
        console.log("data", data);
        localStorage.setItem("access_token", data.access_token);
        localStorage.setItem("refresh_token", data.refresh_token);

        setAccessToken(data.access_token);
        showNotification({
          title: "Logged in!",
          message: "You are now logged in.",
          color: "teal",
        });
        window.location.reload();
      },
    }
  );

  const onSubmit = (values: AdminLoginSchemaType) => {
    // navigate("/dashboard");
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
          Welcome back Admin!
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
            {...form.getInputProps("login")}
            label="Login"
            placeholder="Enter your login"
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
            <Checkbox label="Remember me" />
            <Anchor component="button" size="sm">
              Forgot password?
            </Anchor>
          </Group>
          <Button fullWidth mt="xl" type="submit" className={classes.button}>
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

export default AdminLogin;
