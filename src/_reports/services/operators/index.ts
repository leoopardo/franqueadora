import { useGetOperator } from "./getOperator";
import { useListOperators } from "./listOperators";

export const Operators = {
  list: useListOperators,
  byId: useGetOperator,
};
