import { useMutation } from "react-query";
import { useFranchisorAuth } from "../../../../contexts/franchisorAuthContext";
import { apiFranquia } from "../../../../config/apiFranquia";
import { useEffect } from "react";

export const usePromoterValidateStepOne = ({
  body,
}: {
  body: {
    cpf?: string;
    phone?: string;
    rg?: string;
  };
}) => {
  const { headers } = useFranchisorAuth();
  const { data, error, isLoading, mutate, isSuccess, reset } = useMutation<
    any | null | undefined
  >(["ValidatePromoterStepOne", body], async () => {
    const response = await apiFranquia.post(
      `/promoter/validate/first-step`,
      body,
      {
        headers: {...headers},
      }
    );
    return response.data;
  });

  useEffect(() => {
    if ((body.cpf, body.phone, body.rg)) mutate();
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
