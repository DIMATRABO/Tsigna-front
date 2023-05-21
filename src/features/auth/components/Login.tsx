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
} from "@mantine/core";
import { useStyles } from "components/shared/styles";
import { useNavigate } from "react-router-dom";
type Props = {};

const Login = ({}: Props) => {
  const form = useForm<LoginSchemaType>({
    validate: zodResolver(loginSchema),
  });
  const { classes } = useStyles();
  const navigate = useNavigate();

  const onSubmit = (values: LoginSchemaType) => {
    navigate("/dashboard");
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

export default Login;
