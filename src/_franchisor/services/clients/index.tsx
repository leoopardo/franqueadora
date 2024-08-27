import { useActivateClient } from "./activateClient";
import { useCreateClient } from "./createClient";
import { useGetClientById } from "./getClientById";
import { useInactivateClient } from "./inactivateClient";
import { useListClients } from "./listClients";
import { useUpdateClient } from "./updateClient";

export const ClientsServices = {
  list: useListClients,
  getById: useGetClientById,
  disable: useInactivateClient,
  enable: useActivateClient,
  create: useCreateClient,
  update: useUpdateClient,
};
