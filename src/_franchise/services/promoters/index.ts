import { useActivatePromoter } from "./activatePromoter";
import { useCreatePromoter } from "./createPromoter";
import { useGetPromoterById } from "./getPromoterById";
import { useInactivatePromoter } from "./inactivatePromoter";
import { useListPromoters } from "./listPromoters";
import { useUpdatePromoter } from "./updatePromoter";

export const Promoter = {
  list: useListPromoters,
  byId: useGetPromoterById,
  create: useCreatePromoter,
  update: useUpdatePromoter,
  enable: useActivatePromoter,
  disable: useInactivatePromoter,
};
