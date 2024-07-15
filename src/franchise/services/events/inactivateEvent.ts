import { apiPortalEvent } from "@config/apiPortalEvent";
import { notification } from "antd";
import { useMutation } from "react-query";
import { useFranchiseAuth } from "../../../contexts/franchiseAuthContext";
import { queryClient } from "../../../services/queryClient";
import ResponseI from "../__interfaces/response.interface";
import { QueryKeys } from "../queryKeys";
import { EventType } from "./__interfaces/events.interface";

interface InactivateEventArgs {
  body: EventType;
  id: string;
}

export const useInactivateEvent = () => {
  const { headers } = useFranchiseAuth();
  const mutation = useMutation<
    ResponseI<EventType> | null | undefined,
    unknown,
    InactivateEventArgs
  >({
    mutationFn: async ({ body, id }) => {
      const response = await apiPortalEvent.put(`/event/disable/${id}`, body, {
        headers: { ...headers },
      });
      await queryClient.refetchQueries({
        queryKey: [QueryKeys.LIST_EVENTS],
      });
      return response.data;
    },
    mutationKey: QueryKeys.INACTIVATE_EVENT,
  });

  const { data, error, isLoading, mutate, reset, isSuccess } = mutation;

  if (isSuccess) {
    notification.success({ message: "Evento desabilitado com sucesso!" });
    reset();
  }
  if (error) {
    notification.error({
      message: "Não foi possível desabilitar evento.",
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
