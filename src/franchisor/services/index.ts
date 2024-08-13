import { AuthServices } from "./auth";
import { ClientsServices } from "./clients";
import { FranchiseServices } from "./franchises";
import { PromoterServices } from "./promoters";
import { TerminalServices } from "./terminals";
import { TokenServices } from "./token";
import { Users } from "./users";

export const Services = {
  auth: AuthServices,
  client: ClientsServices,
  franchise: FranchiseServices,
  promoter: PromoterServices,
  terminal: TerminalServices,
  token: TokenServices,
  users: Users,
};
