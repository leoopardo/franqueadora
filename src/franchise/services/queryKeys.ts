export enum QueryKeys {
  LIST_TERMINALS = "franchiseListTerminals",
  LIST_EVENTS = "franchiseListEvents",
  LIST_FRANCHISES = "franchiseListFranchises",
  LIST_PROMOTERS = "franchiseListPromoters",
  LIST_CLIENTS = "franchiseListClients",

  CREATE_PROMOTER = "franchiseCreatePromoter",
  CREATE_CLIENT = "franchiseCreateClient",
  CREATE_EVENT = "franchiseCreateEvent",

  GET_TERMINAL_TOTALS = "franchiseGetTerminalTotals",
  GET_ME = "getMeFranchise",
  GET_PROMOTER = "franchiseGetPromoter",
  GET_EVENT_SELECT = "getEventSelect",
  GET_PROMOTER_FEES = "franchiseGetPromoterFees",
  GET_EVENT_BY_ID = "franchiseGetEventById",

  INACTIVATE_TERMINAL = "franchiseInactivateTerminal",
  INACTIVATE_EVENT = "franchiseInactivateEvent",
  INACTIVATE_PROMOTER = "franchiseInactivatePromoter",
  INACTIVATE_CLIENT = "franchiseInactivateClient",

  ACTIVATE_TERMINAL = "franchiseActivateTerminal",
  ACTIVATE_EVENT = "franchiseActivateEvent",
  ACTIVATE_PROMOTER = "franchiseActivatePromoter",
  ACTIVATE_CLIENT = "franchiseActivateClient",

  SET_TENANT = "setTenant",

  SEND_TOKEN = "franchiseSendToken",
  VALIDATE_TOKEN = "franchiseValidateToken",

  SEARCH_FRANCHISES = "franchiseSearchFranchises",
}
