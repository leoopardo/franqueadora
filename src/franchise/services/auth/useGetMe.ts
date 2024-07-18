import { apiFranqueadora } from "@config/api";
import { useEffect } from "react";
import { QueryFunction, useQuery } from "react-query";
import secureLocalStorage from "react-secure-storage";
import { apiFranquia } from "../../../config/apiFranquia";
import { useFranchiseAuth } from "../../../contexts/franchiseAuthContext";
import { congnitoAuthService } from "./CognitoAuthService";

export interface getMeI {
  id: string;
  user_id: number;
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
  const { headers, setHeader } = useFranchiseAuth();

  useEffect(() => {
    const getHeaders = async () => {
      if (secureLocalStorage.getItem("Authorization")) {
        setHeader({
          Authorization: `${secureLocalStorage.getItem("Authorization")}`,
          Identity: `${secureLocalStorage.getItem("Identity")}`,
          AuthToken: `${secureLocalStorage.getItem("AuthToken")}`,
        });
      } else {
        const user = await congnitoAuthService.getToken();
        const token = user.accessToken.jwtToken;
        const idToken = user.idToken.jwtToken;
        setHeader({
          Authorization: `Bearer ${token}`,
          Identity: `${idToken}`,
          "ngrok-skip-browser-warning": true,
        });
      }
    };

    if (!headers) {
      getHeaders();
    }
  }, [headers, setHeader]);

  const fetchMe: QueryFunction<getMeI> = async () => {
    let user;
    let authToken;

    if (!secureLocalStorage.getItem("Authorization")) {
      user = await congnitoAuthService.getToken();
      authToken = await congnitoAuthService.getAuthToken();
    }

    const token = user?.accessToken?.jwtToken;
    const idToken = user?.idToken?.jwtToken;

    const response =
      localStorage.getItem("master") === "true"
        ? await apiFranqueadora.get("/user/me", {
            headers: headers ?? {
              Authorization: `${secureLocalStorage.getItem("Authorization")}`,
              Identity: `${secureLocalStorage.getItem("Identity")}`,
              AuthToken: `${secureLocalStorage.getItem("AuthToken")}`,
              "ngrok-skip-browser-warning": true,
            },
          })
        : await apiFranquia.get("/user/me", {
            headers: headers ?? {
              Authorization: `Bearer ${token}`,
              Identity: `${idToken}`,
              AuthToken: `${authToken}`,
              "ngrok-skip-browser-warning": true,
            },
          });
    setHeader((state) => ({ ...state, AuthToken: data?.AuthToken }));
    return response.data;
  };

  const { data, error, isLoading, refetch, isSuccess, remove } = useQuery(
    "getMeFranchise",
    fetchMe,
    {
      enabled: !!headers,
    }
  );

  useEffect(() => {
    if (error) {
      setHeader(null);
      secureLocalStorage.clear();
      localStorage.removeItem("master");
    }
  }, [error, setHeader]);

  return {
    data,
    error,
    isLoading,
    refetch,
    isSuccess,
    remove,
  };
}
