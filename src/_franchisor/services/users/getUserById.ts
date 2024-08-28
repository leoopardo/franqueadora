import qs from "qs";
import { useQuery } from "react-query";
import { apiFranquia } from "../../../config/apiFranquia";
import { useFranchisorAuth } from "../../../contexts/franchisorAuthContext";
import { QueryKeys } from "../queryKeys";
import { UserById } from "./__interfaces/user_by_id.iterface";

export const useGetUserById = (id: string) => {
  const { headers } = useFranchisorAuth();
  const { data, error, isLoading, refetch } = useQuery<
  UserById | null | undefined
  >(
    [QueryKeys.GET_USER_BY_ID, id],
    async () => {
      const response = await apiFranquia.get(`/user/${id}`, {
        headers: {
          ...headers,
        },
        params: { },
        paramsSerializer: (params) => {
          return qs.stringify(params, { encode: false });
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
