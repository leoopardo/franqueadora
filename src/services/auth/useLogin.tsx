import { useMutation } from "react-query";
import { api } from "../../config/api";

export function useLogin(body: {
  AuthFlow: string;
  AuthParameters: { USERNAME: string; PASSWORD: string };
  ClientId: string;
  ClientMetadata?: any;
}) {
  const { isLoading, error, mutate, isSuccess, reset } = useMutation<
    any | null | undefined
  >("createAggregatorUser", async () => {
    const response = await api("auth").post("", body, {});
    return response.data;
  });

  return {
    isLoading,
    error,
    mutate,
    isSuccess,
    reset,
  };
}
