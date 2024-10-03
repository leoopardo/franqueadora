import { useGetCourtesie } from "./getCourtesie";
import { useListCourtesies } from "./listCourtesies";

export const Courtesie = {
  list: useListCourtesies,
  getById: useGetCourtesie
};

