import { useMutation } from "react-query";
import { useFranchisorAuth } from "../../../../contexts/franchisorAuthContext";
import { apiFranquia } from "../../../../config/apiFranquia";
import { useEffect } from "react";

export const useValidateStepOne = ({
  body,
}: {
  body: {
    franchise_name?: string;
    cnpj: string;
  };
}) => {
  const { headers } = useFranchisorAuth();
  const { data, error, isLoading, mutate, isSuccess, reset } = useMutation<
    any | null | undefined
  >(["ValidateStepOne", body], async () => {
    const response = await apiFranquia.post(`/franchise/validate/first-step`, body, {
      headers: headers ?? {},
    });
    return response.data;
  });

  useEffect(() => {
    if (body.cnpj || body.franchise_name) mutate();
  }, [body]);

  return {
    data,
    error,
    isLoading,
    mutate,
    isSuccess,
    reset
  };
};
