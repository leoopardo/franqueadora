import { AuthServices } from "./auth";
import { cashRegister } from "./cashRegister";
import { ContributionsIn } from "./contributionsIn";
import { Event } from "./events";

export const Services = {
  auth: AuthServices,
  event: Event,
  contributionsIn: ContributionsIn,
  cashRegister,
};
