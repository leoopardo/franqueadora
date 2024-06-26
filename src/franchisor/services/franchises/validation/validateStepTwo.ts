import { useMutation } from "react-query";
import { useFranchisorAuth } from "../../../../contexts/franchisorAuthContext";
import { apiFranquia } from "../../../../config/apiFranquia";
import { useEffect } from "react";

export const useValidateStepTwo = ({
  body,
}: {
  body: {
    cpf?: string;
    email?: string;
    phone?: string;
    username?: string;
  };
}) => {
  const { headers } = useFranchisorAuth();
  const { data, error, isLoading, mutate, isSuccess, reset } = useMutation<
    any | null | undefined
  >(["ValidateStepOne", body], async () => {
    const response = await apiFranquia.post(
      `/franchise/validate/second-step`,
      body,
      {
        headers: headers ?? {},
      }
    );
    return response.data;
  });

  useEffect(() => {
    if (body.cpf || body.email || body.phone || body.username) mutate();
  }, [body]);

  return {
    data,
    error,
    isLoading,
    mutate,
    isSuccess,
    reset,
  };
};
