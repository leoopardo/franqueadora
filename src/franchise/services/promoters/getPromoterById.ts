import { useQuery } from "react-query";
import { apiFranquia } from "../../../config/apiFranquia";
import { useFranchiseAuth } from "../../../contexts/franchiseAuthContext";
import { QueryKeys } from "../queryKeys";
import {
  PromoterById
} from "./__interfaces/promoter_by_id.interface";

export const useGetPromoterById = (id?: string) => {
  const { headers } = useFranchiseAuth();
  const { data, error, isLoading, refetch } = useQuery<
    { data: PromoterById; agrupatedAgreements: any[] } | null | undefined
  >(
    [QueryKeys.GET_PROMOTER, id],
    async () => {
      const response = await apiFranquia.get(`/promoter/${id}`, {
        headers: {
          ...headers,
        },
      });

      const PHYSICAL_PUB = response.data?.PromoterAgreement?.filter(
        (agreement: any) => agreement.type === "PHYSICAL_PUB"
      );
      const agrupatedAgreements: any = [];
      if (!PHYSICAL_PUB) return agrupatedAgreements;
      for (const agreement of PHYSICAL_PUB) {
        const index = agrupatedAgreements.findIndex(
          (agreementAgrupated: any) =>
            agreementAgrupated.debit_transaction_fee ===
              agreement.debit_transaction_fee &&
            agreementAgrupated.credit_transaction_fee ===
              agreement.credit_transaction_fee &&
            agreementAgrupated.antecipation_fee === agreement.antecipation_fee
        );

        if (index === -1) {
          agrupatedAgreements.push({
            brand: [agreement.brand],
            debit_transaction_fee: agreement.debit_transaction_fee,
            credit_transaction_fee: agreement.credit_transaction_fee,
            antecipation_fee: agreement.antecipation_fee,
          });
        } else {
          agrupatedAgreements[index].brand.push(agreement.brand);
        }
      }

      return { data: response.data, agrupatedAgreements };
    },
    { enabled: headers && headers["AuthToken"] && id ? true : false }
  );

  return {
    data,
    error,
    isLoading,
    refetch,
  };
};
