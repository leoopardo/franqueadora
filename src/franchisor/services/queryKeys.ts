export enum QueryKeys {
  LIST_FRANCHISES = "listFranchises",
  LIST_PROMOTERS = "listPromoters",
  LIST_TERMINALS = "listTerminals",
  LIST_PENDING_TERMINALS = "listPendingTerminals",
  LIST_CLIENTS = "listClients",
  LIST_AGREEMENTS = "listAgreements",

  GET_TERMINAL_SELECTS = "getTerminalSelects",
  GET_TERMINAL_TOTALS = "getTerminalTotals",
  GET_ME = "getMeFranchisor",
  GET_PROMOTER_BY_ID = "getPromoterById",

  INACTIVATE_FRANCHISE = "inactivateFranchise",
  INACTIVATE_PROMOTER = "inactivatePromoter",
  INACTIVATE_TERMINAL = "inactivateTerminal",
  INACTIVATE_CLIENT = "inactivateClient",

  ACTIVATE_FRANCHISE = "activateFranchise",
  ACTIVATE_PROMOTER = "activatePromoter",
  ACTIVATE_TERMINAL = "activateTerminal",
  ACTIVATE_CLIENT = "activateClient",

  APPROVE_TERMINALS = "approveTerminals",
  REPROVE_TERMINAL = "reproveTerminals",

  CREATE_FRANCHISE = "createFranchise",
  CREATE_PROMOTER = "createPromoter",

  UPDATE_FRANCHISE = "updateFranchise",
  UPDATE_FRANCHISE_AGREEMENTS = "updateFranchiseAgreements",
  UPDATE_PROMOTER = "updatePromoter",

  PENDING_NUMBER = "pendingNumber",
  
  SEND_TOKEN = "sendToken"
  
}
