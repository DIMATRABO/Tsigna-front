import {
  ColorScheme,
  ColorSchemeProvider,
  MantineProvider,
} from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import { Notifications } from "@mantine/notifications";
import ProtectedRoutes from "components/ProtectedRoutes";
import { theme } from "config/mantine";
import Admin from "features/admin/components/Admin";
import Login from "features/auth/components/Login";
import Signup from "features/auth/components/Signup";
import Dashboard from "features/dashboard/components/Dashboard";
import Strategies from "features/strategies/components/Strategies";
import Wallet from "features/wallet/components/Wallet";
import { useState } from "react";
import { Route, Routes } from "react-router-dom";

function App() {
  const [colorScheme, setColorScheme] = useState<ColorScheme>("light");
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider
        theme={{ ...theme, colorScheme }}
        withGlobalStyles
        withNormalizeCSS
      >
        <ModalsProvider>
          <Notifications />
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/*" element={<Login />} />

            <Route element={<ProtectedRoutes />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/wallet" element={<Wallet />} />
              <Route path="/strategies" element={<Strategies />} />
              <Route path="/admin" element={<Admin />} />
            </Route>
          </Routes>
        </ModalsProvider>
      </MantineProvider>
    </ColorSchemeProvider>
  );
}

export default App;
