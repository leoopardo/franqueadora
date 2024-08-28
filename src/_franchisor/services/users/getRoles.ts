import { apiFranqueadora } from "@config/api";
import qs from "qs";
import { useQuery } from "react-query";
import { useFranchisorAuth } from "../../../contexts/franchisorAuthContext";
import ResponseI from "../__interfaces/response.interface";
import { QueryKeys } from "../queryKeys";

interface roles {
  FeatureRoleTemplate: {
    Feature: { name: string };
    active: boolean;
    create: boolean;
    created_at: string;
    delete: boolean;
    id: string;
    id_feature: string;
    id_role: string;
    updated_at: string;
    view: boolean;
  }[];
  active: boolean;
  created_at: string;
  description: string;
  hidden: boolean;
  id: string;
  key: string;
  name: string;
  updated_at: string;
}

export const useGetRoles = () => {
  const { headers } = useFranchisorAuth();
  const { data, error, isLoading, refetch } = useQuery<
    ResponseI<roles> | null | undefined
  >(
    [QueryKeys.GET_ROLES],
    async () => {
      const response = await apiFranqueadora.get(`/role`, {
        headers: {
          ...headers,
        },
        params: {},
        paramsSerializer: (params) => {
          return qs.stringify(params, { encode: true });
        },
      });
      return response.data;
    },
    { enabled: headers && headers["AuthToken"] ? true : false }
  );

  return {
    data,
    error,
    isLoading,
    refetch,
  };
};
