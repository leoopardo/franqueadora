export enum QueryKeys {
  LIST_TERMINALS = "franchiseListTerminals",
  LIST_EVENTS = "franchiseListEvents",
  LIST_FRANCHISES = "franchiseListFranchises",
  LIST_PROMOTERS = "franchiseListPromoters",
  LIST_CLIENTS = "franchiseListClients",
  LIST_MENUS = "franchiseListMenus",
  LIST_PRODUCTS = "franchiseListProducts",

  CREATE_PROMOTER = "franchiseCreatePromoter",
  CREATE_CLIENT = "franchiseCreateClient",
  CREATE_EVENT = "franchiseCreateEvent",
  CREATE_PRODUCT = "franchiseCreateProduct",
  CREATE_TERMINAL = "franchiseCreateTerminal",

  UPDATE_EVENT = "franchiseUpdateEvent",
  UPDATE_PRODUCT = "franchiseUpdateProduct",
  UPDATE_PROMOTER = "franchiseUpdatePromoter",
  UPDATE_CLIENT = "franchiseUpdateClient",
  UPDATE_TERMINAL = "franchiseUpdateTerminal",

  DELETE_PRODUCT = "franchiseDeleteProduct",
  DELETE_PROMOTER = "franchiseDeletePromoter",
  DELETE_CLIENT = "franchiseDeleteClient",
  DELETE_EVENT = "franchiseDeleteEvent",
  DELETE_TERMINAL = "franchiseDeleteTerminal",


  GET_TERMINAL_TOTALS = "franchiseGetTerminalTotals",
  GET_ME = "getMeFranchise",
  GET_PROMOTER = "franchiseGetPromoter",
  GET_EVENT_SELECT = "getEventSelect",
  GET_PROMOTER_FEES = "franchiseGetPromoterFees",
  GET_EVENT_BY_ID = "franchiseGetEventById",
  GET_AVALIABLE_PRODUCT_CODE = "franchiseGetAvaliableProductCode",
  GET_UNITS_LIST = "franchiseGetUnitsList",
  GET_CLIENT_BY_ID = "franchiseGetClientById",
  GET_PROMOTER_BY_ID = "franchiseGetPromoterById",
  GET_PRODUCT_BY_ID = "franchiseGetProductById",
  GET_TERMINAL_BY_ID = "franchiseGetTerminalById",

  INACTIVATE_TERMINAL = "franchiseInactivateTerminal",
  INACTIVATE_EVENT = "franchiseInactivateEvent",
  INACTIVATE_PROMOTER = "franchiseInactivatePromoter",
  INACTIVATE_CLIENT = "franchiseInactivateClient",
  INACTIVATE_PRODUCT = "franchiseInactivateProduct",

  ACTIVATE_TERMINAL = "franchiseActivateTerminal",
  ACTIVATE_EVENT = "franchiseActivateEvent",
  ACTIVATE_PROMOTER = "franchiseActivatePromoter",
  ACTIVATE_CLIENT = "franchiseActivateClient",
  ACTIVATE_PRODUCT = "franchiseActivateProduct",

  SET_TENANT = "setTenant",

  SEND_TOKEN = "franchiseSendToken",
  VALIDATE_TOKEN = "franchiseValidateToken",

  SEARCH_FRANCHISES = "franchiseSearchFranchises",
}
