import { apiPortalEvent } from "@config/apiPortalEvent";
import { notification } from "antd";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { useFranchiseAuth } from "../../../contexts/franchiseAuthContext";
import { queryClient } from "../../../services/queryClient";
import { QueryKeys } from "../queryKeys";
import { CreateEventType } from "./__interfaces/create_event.interface";

export const useUpdateEvent = () => {
  const { headers } = useFranchiseAuth();
  const navigate = useNavigate();
  const mutation = useMutation<
    any | null | undefined,
    unknown,
    {body: CreateEventType, id: string}
  >({
    mutationFn: async ({body, id}) => {
      const response = await apiPortalEvent.put(`/event/${id}`, body, {
        headers: { ...headers },
      });
      await queryClient.refetchQueries({
        queryKey: [QueryKeys.LIST_EVENTS],
      });
      return response.data;
    },
    mutationKey: QueryKeys.CREATE_EVENT,
  });

  const { data, error, isLoading, mutate, reset, isSuccess } = mutation;

  if (isSuccess) {
    notification.success({ message: "Evento atualizado com sucesso!" });
    reset();
    navigate(-1);
  }
  if (error) {
    notification.error({
      message: "Não foi possível atualizar o evento.",
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
