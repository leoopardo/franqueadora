import { useGetWaiter } from "./getWaiter";
import { useListWaiters } from "./listWaiters";

export const Waiters = {
  list: useListWaiters,
  byId: useGetWaiter,
};
