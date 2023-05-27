import { createContext } from "react";
import { IUser } from "types/user";

interface IAuthContext {
  user: IUser | null;
  setUser: (user: IUser | null) => void;
  accessToken: string | null;
  setAccessToken: (accessToken: string) => void;
  isLoading: boolean;
  isSuccess: boolean;
}

export const AuthContext = createContext<IAuthContext>({
  user: null,
  setUser: () => {},
  accessToken: null,
  setAccessToken: () => {},
  isLoading: false,
  isSuccess: false,
});
