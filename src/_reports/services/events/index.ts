import { useGetEvent } from "./getEvent";
import { useListEvents } from "./listEvents";

export const Event = {
  list: useListEvents,
  getById: useGetEvent
};
