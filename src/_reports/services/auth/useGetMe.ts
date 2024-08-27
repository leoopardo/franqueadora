import { useEffect } from "react";
import { QueryFunction, useQuery } from "react-query";
import { apiFranqueadora } from "../../../config/api";
import { useReportsAuth } from "../../../contexts/reportsAuthContext";
import { QueryKeys } from "../queryKeys";
import { congnitoAuthService } from "./CognitoAuthService";

export interface getMeI {
  id: string;
  user_id: 43817;
  name: string;
  avatar: string;
  role: string;
  type: string;
  phone: string;
  email: string;
  username: string;
  cognito_id: string;
  active: boolean;
  created_at: string;
  updated_at: string;
  document: string;
  is_deleted: boolean;
  is_blocked: boolean;
  birthdate: string;
  id_role: string;
  id_auth: string;
  modified_role: boolean;
  Auth: {
    id: string;
    request_password_token: string;
    request_password_expiration: string;
    retries: number;
    first_access: boolean;
    active: boolean;
    created_at: string;
    updated_at: string;
  };
  UserPermission: {
    id: string;
    id_feature: string;
    id_user: string;
    view: boolean;
    delete: boolean;
    create: boolean;
    active: boolean;
    created_at: string;
    updated_at: string;
    Feature: {
      name: string;
      key: string;
    };
  }[];
  AuthToken: string;
}

export function useGetMe() {
  const { headers, setHeader } = useReportsAuth();

  useEffect(() => {
    const getHeaders = async () => {
      const user = await congnitoAuthService.getToken();
      const token = user.accessToken.jwtToken;
      const idToken = user.idToken.jwtToken;
      setHeader({
        Authorization: `Bearer ${token}`,
        Identity: `${idToken}`,
        "ngrok-skip-browser-warning": true,
      });
    };

    getHeaders();
  }, [setHeader]);

  const fetchMe: QueryFunction<getMeI> = async () => {
    const user = await congnitoAuthService.getToken();
    const authToken = await congnitoAuthService.getAuthToken();

    const token = user.accessToken.jwtToken;
    const idToken = user.idToken.jwtToken;
    const response = await apiFranqueadora.get("/user/me", {
      headers: {
        Authorization: `Bearer ${token}`,
        Identity: `${idToken}`,
        AuthToken: `${authToken}`,
        "ngrok-skip-browser-warning": true,
      },
    });
    setHeader((state) => ({ ...state, AuthToken: data?.AuthToken }));

    return response.data;
  };

  const { data, error, isLoading, refetch, isSuccess } = useQuery(
    QueryKeys.GET_ME,
    fetchMe,
    {
      enabled: !!headers, // Habilita a query somente quando o header Authorization estiver definido
    }
  );

  return {
    data,
    error,
    isLoading,
    refetch,
    isSuccess,
  };
}
