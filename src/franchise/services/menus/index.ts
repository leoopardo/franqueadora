import { useCreateMenu } from "./createMenu";
import { useListMenus } from "./listMenus";

export const Menu = {
  list: useListMenus,
  create: useCreateMenu,
};
