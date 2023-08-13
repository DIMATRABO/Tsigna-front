import { notifications } from "@mantine/notifications";
import { AxiosError } from "axios";
import { useState } from "react";
import { AuthContext } from "./user";
import { IUser } from "types/user";
import { useQuery } from "@tanstack/react-query";
import { getMe } from "services/auth";

type Props = {
  children: React.ReactNode;
};

const UserContextProvider = ({ children }: Props) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(
    localStorage.getItem("access_token") ||
      sessionStorage.getItem("access_token")
  );

  const { isLoading, isSuccess, isFetching } = useQuery(["me"], getMe, {
    retry: false,
    onSuccess: (user) => {
      setUser({
        ...user,
        privilege: user.privilege ? user.privilege : "user",
      });
    },
    onError: (error: AxiosError) => {
      setUser(null);
      setAccessToken(null);
      localStorage.removeItem("access_token");
      sessionStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      sessionStorage.removeItem("refresh_token");

      //   if (error.response?.status === 401) return;

      notifications.show({
        title: "Error",
        message: "Something went wrong",
      });
    },
    enabled: accessToken ? true : false,
  });

  return (
    <AuthContext.Provider
      value={{
        user,
        isSuccess,
        setUser,
        accessToken,
        setAccessToken,
        isLoading: isFetching,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default UserContextProvider;
