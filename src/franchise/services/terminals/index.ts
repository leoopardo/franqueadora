import { useActivateTerminal } from "./activateTerminals";
import { useCreateTerminals } from "./create/createTerminals";
import { useTerminalsSelects } from "./create/getSelectsData";
import { useDeleteTerminal } from "./deleteTerminal";
import { useGetTerminalById } from "./getTerminalById";
import { useInactivateTerminal } from "./inactivateTerminals";
import { useListTerminals } from "./listTerminals";
import { useUpdateTerminal } from "./updateTerminal";

export const Terminal = {
  list: useListTerminals,
  byId: useGetTerminalById,
  create: useCreateTerminals,
  update: useUpdateTerminal,
  enable: useActivateTerminal,
  disable: useInactivateTerminal,
  delete: useDeleteTerminal,
  selects: useTerminalsSelects,
};
