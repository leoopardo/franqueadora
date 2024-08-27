import { useActivateClient } from "./activateClient";
import { useCreateClient } from "./createClient";
import { useGetClientById } from "./getClientById";
import { useInactivateClient } from "./inactivateFranchise";
import { useListClients } from "./listClients";
import { useUpdateClient } from "./updateClient";

export const Client ={
    list: useListClients,
    byId: useGetClientById,
    create: useCreateClient,
    update: useUpdateClient,
    enable: useActivateClient,
    disable: useInactivateClient,
}