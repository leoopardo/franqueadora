import { useCreateMenu } from "./createMenu";
import { useCreateMenuItem } from "./createMenuItem";
import { useDeleteProductMenu } from "./deleteProductMenu";
import { useListMenus } from "./listMenus";
import { useGetMenyuById } from "./menuItemsById";
import { useUpdateMenuItem } from "./updateMenuItem";

export const Menu = {
  list: useListMenus,
  create: useCreateMenu,
  menuItem: useGetMenyuById,
  updateMenuItens: useUpdateMenuItem,
  createMenuItem: useCreateMenuItem,
  deleteMenuItem: useDeleteProductMenu,
};
