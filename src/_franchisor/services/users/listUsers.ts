import { apiFranqueadora } from "@config/api";
import { useQuery } from "react-query";
import { useFranchisorAuth } from "../../../contexts/franchisorAuthContext";
import ResponseI from "../__interfaces/response.interface";
import { QueryKeys } from "../queryKeys";
import {
    UserParams,
    userResponseSchema,
    UserType,
} from "./__interfaces/users.interface";

export const useListUsers = (params: UserParams) => {
  const { headers } = useFranchisorAuth();
  const { data, error, isLoading, refetch } = useQuery<
    ResponseI<UserType> | null | undefined
  >(
    [QueryKeys.LIST_USERS, params],
    async () => {
      const response = await apiFranqueadora.get(`/user/all`, {
        headers: headers ?? {},
        params: { ...params, orderBy: "created_at", orderDirection: "desc" },
      });
      const parsedResponse = userResponseSchema.safeParse(response.data);
      if (!parsedResponse.success) {
        throw new Error(parsedResponse.error as any);
      }

      return parsedResponse.data;
    },
    { enabled: headers && headers["AuthToken"] ? true : false, refetchOnWindowFocus: true }
  );

  return {
    data,
    error,
    isLoading,
    refetch,
  };
};
