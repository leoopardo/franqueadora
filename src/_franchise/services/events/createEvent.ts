import { apiPortalEvent } from "@config/apiPortalEvent";
import { notification } from "antd";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { useFranchiseAuth } from "../../../contexts/franchiseAuthContext";
import { queryClient } from "../../../services/queryClient";
import { QueryKeys } from "../queryKeys";
import { CreateEventType } from "./__interfaces/create_event.interface";
import { getMeI } from "../auth/useGetMe";

export const useCreateEvent = () => {
  const user = queryClient.getQueryData("getMeFranchise") as getMeI;
  const { headers } = useFranchiseAuth();
  const navigate = useNavigate();
  const mutation = useMutation<
    any | null | undefined,
    unknown,
    CreateEventType
  >({
    mutationFn: async (body) => {
      const response = await apiPortalEvent.post(
        `/event`,
        {
          ...body,
          promoter_id: user?.Promoter ? user?.Promoter?.id : undefined,
          client_id: user?.Client ? user?.Client?.id : undefined,
        },
        {
          headers: { ...headers },
        }
      );
      await queryClient.refetchQueries({
        queryKey: [QueryKeys.LIST_EVENTS],
      });
      return response.data;
    },
    mutationKey: QueryKeys.CREATE_EVENT,
  });

  const { data, error, isLoading, mutate, reset, isSuccess } = mutation;

  if (isSuccess) {
    notification.success({ message: "Evento cadastrado com sucesso!" });
    reset();
    navigate("/eventos");
  }
  if (error) {
    notification.error({
      message: "Não foi possível cadastrar o evento.",
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
