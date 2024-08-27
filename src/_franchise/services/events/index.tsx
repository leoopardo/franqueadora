import { useActivateEvent } from "./activateEvent";
import { useCreateEvent } from "./createEvent";
import { useGetEventById } from "./getEventById";
import { getSelectsData } from "./getSelectsData";
import { useInactivateEvent } from "./inactivateEvent";
import { useListEvents } from "./listEvents";
import { useUpdateEvent } from "./updateEvent";

export const Event = {
  list: useListEvents,
  byId: useGetEventById,
  create: useCreateEvent,
  update: useUpdateEvent,
  enable: useActivateEvent,
  disable: useInactivateEvent,
  selects: getSelectsData,
};
