import { apiPortalEvent } from "@config/apiPortalEvent";
import { notification } from "antd";
import { useMutation } from "react-query";
import { useFranchiseAuth } from "../../../contexts/franchiseAuthContext";
import { queryClient } from "../../../services/queryClient";
import ResponseI from "../__interfaces/response.interface";
import { QueryKeys } from "../queryKeys";
import { EventType } from "./__interfaces/events.interface";

interface ActivateEventArgs {
  body: EventType;
  id: string;
}

export const useActivateEvent = () => {
  const { headers } = useFranchiseAuth();
  const mutation = useMutation<
    ResponseI<EventType> | null | undefined,
    unknown,
    ActivateEventArgs
  >({
    mutationFn: async ({ body, id }) => {
      const response = await apiPortalEvent.put(`/event/enable/${id}`, body, {
        headers: { ...headers },
      });
      await queryClient.refetchQueries({
        queryKey: [QueryKeys.LIST_EVENTS],
      });
      return response.data;
    },
    mutationKey: QueryKeys.ACTIVATE_EVENT,
  });

  const { data, error, isLoading, mutate, reset, isSuccess } = mutation;

  if (isSuccess) {
    notification.success({ message: "Evento habilitado com sucesso!" });
    reset();
  }
  if (error) {
    notification.error({
      message: "Não foi possível habilitar o evento.",
      description: (error as any)?.response?.data?.message,
    });
    reset();
  }

  return {
    data,
    error,
    isLoading,
    mutate,
    isSuccess,
    reset,
  };
};
