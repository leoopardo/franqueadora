import { useQuery } from "react-query";
import { useFranchisorAuth } from "../../../../contexts/franchisorAuthContext";
import { apiFranquia } from "@config/apiFranquia";
import { QueryKeys } from "@franchisor/services/queryKeys";
import ResponseI from "@franchisor/services/__interfaces/response.interface";
import { AgreementType, agreementResponseSchema } from "../__interfaces/agremeents.interface";

export const useListFranchiseAgreements = () => {
  const { headers } = useFranchisorAuth();
  const { data, error, isLoading, refetch } = useQuery<
    ResponseI<AgreementType> | null | undefined
  >(
    [QueryKeys.LIST_AGREEMENTS],
    async () => {
      const response = await apiFranquia.get(`/agreement`, {
        headers: {...headers},
        params: {size: 50}
      });
      const parsedResponse = agreementResponseSchema.safeParse(response.data);
      if (!parsedResponse.success) {
        throw new Error((parsedResponse.error as any));
      }

      return parsedResponse.data;
    },
    { enabled: headers && headers["AuthToken"] ? true : false, refetchOnWindowFocus: false }
  );

  return {
    data,
    error,
    isLoading,
    refetch,
  };
};
