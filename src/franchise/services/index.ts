import { Auth } from "./auth";
import { Client } from "./clients";
import { Event } from "./events";
import { Franchise } from "./franchises";
import { Menu } from "./menus";
import { Promoter } from "./promoters";
import { Product } from "./service_orders/products";
import { Terminal } from "./terminals";
import { Token } from "./token";

export const Services = {
  auth: Auth,
  client: Client,
  event: Event,
  franchise: Franchise,
  menu: Menu,
  promoter: Promoter,
  product: Product,
  terminal: Terminal,
  token: Token,
};
