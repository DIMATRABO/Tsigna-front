import {
  useMantineTheme,
  useMantineColorScheme,
  Switch,
  Center,
  Group,
  UnstyledButton,
  Text,
} from "@mantine/core";
import { upperFirst } from "@mantine/hooks";
import { IconMoonStars, IconMoon, IconSun } from "@tabler/icons-react";
import { useStyles } from "./styles";

const ThemeSwitcher = () => {
  const theme = useMantineTheme();
  const { toggleColorScheme } = useMantineColorScheme();
  const { classes } = useStyles();
  const colorScheme = theme.colorScheme;
  const Icon = colorScheme === "dark" ? IconSun : IconMoon;

  return (
    <Switch
      sx={{ cursor: "pointer" }}
      size="md"
      color={theme.colorScheme === "dark" ? "gray" : "dark"}
      onLabel={
        <IconSun size="1rem" stroke={2.5} color={theme.colors.yellow[4]} />
      }
      offLabel={
        <IconMoonStars size="1rem" stroke={2.5} color={theme.colors.blue[6]} />
      }
      onChange={() => toggleColorScheme()}
    />
    // <Group position="center" my="xl">
    //   <UnstyledButton
    //     aria-label="Toggle theme"
    //     className={classes.control}
    //     onClick={() => toggleColorScheme()}
    //     title="Ctrl + J"
    //   >
    //     <Text size="sm" className={classes.value}>
    //       {upperFirst(colorScheme === "light" ? "dark" : "light")} theme
    //     </Text>

    //     <Center className={classes.iconWrapper}>
    //       <Icon size="1.05rem" stroke={1.5} />
    //     </Center>
    //   </UnstyledButton>
    // </Group>
  );
};

export default ThemeSwitcher;
