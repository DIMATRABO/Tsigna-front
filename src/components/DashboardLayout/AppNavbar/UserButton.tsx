import {
  UnstyledButton,
  UnstyledButtonProps,
  Group,
  Avatar,
  Text,
  createStyles,
  Menu,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { IconChevronRight, IconDoorExit } from "@tabler/icons-react";
// import { logout } from 'features/Auth/Login/services/auth';
// import { useTranslation } from 'react-i18next';
// import { useQueryClient } from 'react-query';

const useStyles = createStyles((theme) => ({
  user: {
    display: "block",
    width: "100%",
    padding: theme.spacing.md,
    color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[8]
          : theme.colors.gray[0],
    },
  },
}));

interface UserButtonProps extends UnstyledButtonProps {
  image: string;
  name: string;
  email: string;
  icon?: React.ReactNode;
}

export function UserButton({
  image,
  name,
  email,
  icon,
  ...others
}: UserButtonProps) {
  // const { t } = useTranslation();
  const { classes } = useStyles();
  // const queryClient = useQueryClient();

  const onLogout = async () => {
    try {
      // await logout();
      // queryClient.invalidateQueries(['me']);
    } catch (error) {
      notifications.show({
        title: "Error",
        message: "Something went wrong",
        color: "red",
      });
    }
  };

  return (
    <Menu position="right" width={250}>
      <Menu.Target>
        <UnstyledButton className={classes.user} {...others}>
          <Group>
            <Avatar src={image} radius="xl" />

            <div style={{ flex: 1 }}>
              <Text size="sm" weight={500}>
                {name}
              </Text>

              <Text color="dimmed" size="xs">
                {email}
              </Text>
            </div>

            {icon || <IconChevronRight size="0.9rem" stroke={1.5} />}
          </Group>
        </UnstyledButton>
      </Menu.Target>

      <Menu.Dropdown>
        {/* <Menu.Label>{t('menu.dangerZone')}</Menu.Label>
        <Menu.Item color="red" icon={<IconDoorExit size={14} />} onClick={onLogout}>
          {t('menu.logout')}
        </Menu.Item> */}
      </Menu.Dropdown>
    </Menu>
  );
}
