import { createStyles, rem } from "@mantine/core";

export const useStyles = createStyles((theme) => ({
  navbar: {
    paddingTop: 0,
  },
  section: {
    marginBottom: theme.spacing.md,

    "&:not(:last-of-type)": {
      borderBottom: `1px solid ${
        theme.colorScheme === "dark"
          ? theme.colors.dark[4]
          : theme.colors.gray[3]
      }`,
    },
  },
  mainLinks: {
    paddingBottom: theme.spacing.md,
  },
  mainLink: {
    borderRadius: theme.radius.sm,
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[0]
        : theme.colors.gray[7],

    "&:hover": {
      backgroundColor: theme.colors.violet,
      color: "white",
    },
  },
  mainLinkInner: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flex: 1,
  },
  nestedLink: {
    width: "100%",
    padding: theme.spacing.md,
    paddingLeft: 25,
    borderRadius: theme.radius.sm,
    color: theme.colors.gray[6],
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,
    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
    },
  },

  mainLinkIcon: {
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[2]
        : theme.colors.gray[6],
  },

  button: {
    backgroundColor: theme.colors.violet,
    color: theme.white,
    height: 40,
    "&:hover": {
      backgroundColor: theme.colors.violet[7],
    },
  },

  input: {
    //change border color on active
    "&:focus": {
      borderColor: theme.colors.red,
    },
  },

  anchor: {
    textDecoration: "none",
  },

  control: {
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[8]
        : theme.colors.gray[0],
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 1000,
    paddingLeft: theme.spacing.sm,
    paddingRight: rem(4),
    width: rem(136),
    height: rem(36),
  },

  iconWrapper: {
    height: rem(28),
    width: rem(28),
    borderRadius: rem(28),
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.yellow[4]
        : theme.colors.dark[4],
    color: theme.colorScheme === "dark" ? theme.black : theme.colors.blue[2],
  },

  value: {
    lineHeight: 1,
  },
}));
