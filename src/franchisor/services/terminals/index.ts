import { useActivateTerminal } from "./activateTerminals";
import { useCreateTerminals } from "./create/createTerminals";
import { useTerminalsSelects } from "./create/getSelectsData";
import { useDeleteTerminal } from "./deleteTerminal";
import { useTerminalTotals } from "./getTerminalTotals";
import { useInactivateTerminal } from "./inactivateTerminals";
import { useListTerminals } from "./listTerminals";
import { useApproveTerminals } from "./pending/approveTerminals";
import { useGetPendingNumber } from "./pending/getPendingNumber";
import { useListPending } from "./pending/listPending";
import { useReproveTerminals } from "./pending/reproveTerminals";

export const TerminalServices = {
  list: useListTerminals,
  create: useCreateTerminals,
  Delete: useDeleteTerminal,
  disable: useInactivateTerminal,
  enable: useActivateTerminal,
  totals: useTerminalTotals,
  listPending: useListPending,
  approvePending: useApproveTerminals,
  reprovePending: useReproveTerminals,
  pendingTotal: useGetPendingNumber,
  selectData: useTerminalsSelects,
};
