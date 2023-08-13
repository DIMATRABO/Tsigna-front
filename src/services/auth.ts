import { SignupSchemaType } from "features/auth/schemas/authSchemas";
import instance from "lib/axios";

export const registerUser = async (user: SignupSchemaType) => {
  const { data } = await instance.post("/users/", {
    password_confirm: user.confirmPassword,
    first_name: user.firstName,
    last_name: user.lastName,
    email: user.email,
    birthday: new Date(user.birthday).toISOString().split("T")[0],
    password: user.password,
  });
  return data;
};

export const loginUser = async (email: string, password: string) => {
  const { data } = await instance.post("/users/auth", { email, password });
  return data;
};

export const getMe = async () => {
  const { data } = await instance.get("/users/me");
  return data;
};

export const adminLogin = async (login: string, password: string) => {
  const { data } = await instance.post("/super/auth", { login, password });
  return data;
};
