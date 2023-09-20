import { EditUserValues } from "features/admin/components/Users";
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

export const activateUser = async (id: string) => {
  const response = await instance.patch(`/users/changestate${id}`);
  return response.data;
};

export const deleteUser = async (id: string) => {
  const response = await instance.delete(`/users/${id}`);
  return response.data;
};

export const getAllUsersPaginatedBySearch = async (
  query: string,
  page: number,
  page_size: number
) => {
  const { data } = await instance.get(
    `/users/paginate/${query}?page=${page}&page_size=${page_size}`
  );
  return data;
};

export const updateUser = async (
  id: string,
  client_id: string,
  data: EditUserValues
) => {
  const response = await instance.post(`/users/update`, {
    id,
    client_id,
    ...data,
  });
  return response.data;
};
