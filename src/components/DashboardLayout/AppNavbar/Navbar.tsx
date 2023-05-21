// import { UserContext } from 'context/user';
import {
  Avatar,
  Flex,
  Loader,
  Text,
  Navbar,
  Paper,
  ScrollArea,
  rem,
  Box,
  Menu,
} from "@mantine/core";
import { useContext } from "react";
// import { links } from 'components/AppShell/Navbar/links';
// import MainLinks from 'components/AppShell/Navbar/MainLinks';
// import { useStyles } from 'components/shared/styles';
import { UserButton } from "./UserButton";
import MainLinks from "./MainLinks";
import { links } from "./links";
import { useStyles } from "components/shared/styles";
import { IconDoorEnter } from "@tabler/icons-react";

const AppNavbar = () => {
  const { classes } = useStyles();
  // const { user } = useContext(UserContext);

  return (
    <Navbar p="xs" width={{ base: 70, sm: 250, md: 250, lg: 250 }}>
      <Navbar.Section className={classes.section} component={ScrollArea} grow>
        <div className={classes.mainLinks}>
          <MainLinks links={links} />
        </div>
      </Navbar.Section>

      <Navbar.Section>
        <Menu shadow="md" width={200}>
          <Menu.Target>
            <Flex
              align="center"
              mb="md"
              p="sm"
              sx={(theme) => ({
                borderRadius: theme.radius.md,
                cursor: "pointer",
                justifyContent: "center",
                backgroundColor:
                  theme.colorScheme === "dark" ? theme.colors.dark[6] : "#fff",
                "@media (min-width: 765px)": {
                  justifyContent: "flex-start",
                },
              })}
            >
              <Avatar
                src="https://picsum.photos/600/600"
                alt="it's me"
                radius="100%"
                sx={{
                  width: rem(40),
                  height: rem(40),
                  "@media (min-width: 765px)": {
                    width: rem(50),
                    height: rem(50),
                  },
                }}
              />
              <Box
                sx={{
                  marginLeft: rem(10),
                  display: "none",
                  "@media (min-width: 765px)": {
                    display: "block",
                  },
                }}
              >
                <Text size="sm" weight={500}>
                  John Doe
                </Text>
                <Text size="xs" color="dimmed">
                  @johndoe
                </Text>
              </Box>
            </Flex>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Label>Danger zone</Menu.Label>

            <Menu.Item color="red" icon={<IconDoorEnter size={14} />}>
              Logout
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Navbar.Section>
    </Navbar>
  );
};

export default AppNavbar;
