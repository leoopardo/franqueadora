import { useActivateUser } from "./activateUser";
import { useGetUserById } from "./getUserById";
import { useInactivateUser } from "./inactivateUser";
import { useListUsers } from "./listUsers";

export const Users = {
  list: useListUsers,
  byId: useGetUserById,
  enable: useActivateUser,
  disable: useInactivateUser,
};
