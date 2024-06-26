import { useMutation } from "react-query";
import { apiFranquia } from "../../../config/apiFranquia";
import { useFranchisorAuth } from "../../../contexts/franchisorAuthContext";
import ResponseI from "../interfaces/response.interface";
import { createFranchiseI } from "./interfaces/create_franchise.interface";
import { FranchisesI } from "./interfaces/franchises.interface";

export const useCreateFranchise = (body: createFranchiseI) => {
  const { headers } = useFranchisorAuth();
  const { data, error, isLoading, mutate, isSuccess } = useMutation<
    ResponseI<FranchisesI> | null | undefined
  >("createFranchise", async () => {
    const response = await apiFranquia.post(`/franchise`, body, {
      headers: headers ?? {},
    });
    return response.data;
  });

  return {
    data,
    error,
    isLoading,
    mutate,
    isSuccess,
  };
};
