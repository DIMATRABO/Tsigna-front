import { ProfileSchemaType } from "features/profile/components/Profile";
import instance from "lib/axios";

export const changePassword = async (data: ProfileSchemaType) => {
  const response = await instance.post("/users/changepassword", {
    last_password: data.password,
    new_password: data.newPassword,
    password_confirm: data.confirmPassword,
  });
  return response.data;
};

export const getAllUsersPaginated = async (page: number, page_size: number) => {
  const { data } = await instance.get(
    `/users/paginate?page=${page}&page_size=${page_size}`
  );
  return data;
};
