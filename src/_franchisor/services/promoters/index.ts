import { useActivatePromoter } from "./activatePromoter";
import { useCreatePromoter } from "./createPromoter";
import { useGetPromoterById } from "./getPromoterById";
import { useInactivatePromoter } from "./inactivatePromoter";
import { useListPromoters } from "./listPromoters";
import { useUpdatePromoter } from "./updatePromoter";
import { usePromoterValidateStepOne } from "./validation/validateStepOne";
import { useValidateStepTwo } from "./validation/validateStepTwo";

export const PromoterServices = {
  list: useListPromoters,
  getById: useGetPromoterById,
  disable: useInactivatePromoter,
  enable: useActivatePromoter,
  create: useCreatePromoter,
  update: useUpdatePromoter,
  validateStepOne: usePromoterValidateStepOne,
  validateStepTwo: useValidateStepTwo,
};
