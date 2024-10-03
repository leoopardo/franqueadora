import { useGetCashRegister } from "./getCashRegister";
import { useListCashRegisters } from "./listCashRegisters";

export const cashRegister = {
  list: useListCashRegisters,
  byId: useGetCashRegister,
};
