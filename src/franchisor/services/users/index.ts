import { useActivateUser } from "./activateUser";
import { useCreateUser } from "./createUser";
import { useGetRoles } from "./getRoles";
import { useGetUserById } from "./getUserById";
import { useInactivateUser } from "./inactivateUser";
import { useListUsers } from "./listUsers";

export const Users = {
  list: useListUsers,
  byId: useGetUserById,
  create: useCreateUser,
  enable: useActivateUser,
  disable: useInactivateUser,
  roles: useGetRoles,
};
