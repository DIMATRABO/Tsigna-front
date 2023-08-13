import { AppShell } from "@mantine/core";
import { ReactNode } from "react";
import AppHeader from "./AppHeader";
import AppNavbar from "./AppNavbar/Navbar";

type Props = {
  children: ReactNode;
};

function DashboardLayout({ children }: Props) {
  return (
    <AppShell
      padding={"sm"}
      header={<AppHeader />}
      navbar={<AppNavbar />}
      styles={(theme) => ({
        main: {
          backgroundColor:
            theme.colorScheme === "dark"
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      })}
    >
      {children}
    </AppShell>
  );
}

export default DashboardLayout;
