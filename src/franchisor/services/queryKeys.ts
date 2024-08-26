export enum QueryKeys {
  LIST_FRANCHISES = "listFranchises",
  LIST_PROMOTERS = "listPromoters",
  LIST_TERMINALS = "listTerminals",
  LIST_PENDING_TERMINALS = "listPendingTerminals",
  LIST_CLIENTS = "listClients",
  LIST_AGREEMENTS = "listAgreements",
  LIST_USERS = "listUsers",

  GET_TERMINAL_SELECTS = "getTerminalSelects",
  GET_TERMINAL_TOTALS = "getTerminalTotals",
  GET_ME = "getMeFranchisor",
  GET_PROMOTER_BY_ID = "getPromoterById",
  GET_CLIENT_BY_ID = "getClientById",
  GET_USER_BY_ID = "getUserById",
  GET_TERMINAL_BY_ID = "getTerminalById",
  GET_ROLES = "getRoles",

  INACTIVATE_FRANCHISE = "inactivateFranchise",
  INACTIVATE_PROMOTER = "inactivatePromoter",
  INACTIVATE_TERMINAL = "inactivateTerminal",
  INACTIVATE_CLIENT = "inactivateClient",
  INACTIVATE_USER = "inactiveUser",

  ACTIVATE_FRANCHISE = "activateFranchise",
  ACTIVATE_PROMOTER = "activatePromoter",
  ACTIVATE_TERMINAL = "activateTerminal",
  ACTIVATE_CLIENT = "activateClient",
  ACTIVATE_USER = "activateUser",

  APPROVE_TERMINALS = "approveTerminals",
  REPROVE_TERMINAL = "reproveTerminals",

  CREATE_FRANCHISE = "createFranchise",
  CREATE_PROMOTER = "createPromoter",
  CREATE_CLIENT = "createClient",
  CREATE_TERMINALS = "createClient",
  CREATE_USER = "createUser",

  UPDATE_FRANCHISE = "updateFranchise",
  UPDATE_FRANCHISE_AGREEMENTS = "updateFranchiseAgreements",
  UPDATE_PROMOTER = "updatePromoter",
  UPDATE_CLIENT = "updateClient",
  UPDTAE_TERMINAL = "updateTerminal",

  PENDING_NUMBER = "pendingNumber",

  SEND_TOKEN = "sendToken",

  DELETE_TERMINAL = "deleteTerminal",
  DELETE_FRANCHISE = "deleteFranchise",
}
