import { useActivateProduct } from "./activateProducts";
import { useCreateProduct } from "./createProduct";
import { useGetAvaliableProductCode } from "./getAvaliableProductCode";
import { useGetProductById } from "./getProductById";
import { useGetUnits } from "./getProductUnits";
import { useInactivateProduct } from "./inactivateProduct";
import { useListProducts } from "./listProducts";
import { useUpdateProduct } from "./updateProduct";

export const Product = {
  list: useListProducts,
  byId: useGetProductById,
  create: useCreateProduct,
  update: useUpdateProduct,
  enable: useActivateProduct,
  disable: useInactivateProduct,
  avaliableCode: useGetAvaliableProductCode,
  units: useGetUnits,
};
