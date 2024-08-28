import { useListFranchises } from "./listFranchises";
import { useSearchFranchises } from "./searchFranchises";

export const Franchise = {
  list: useListFranchises,
  search: useSearchFranchises,
};
