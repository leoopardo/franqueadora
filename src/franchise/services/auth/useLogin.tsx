import axios from "axios";
import { useState } from "react";
import { congnitoAuthService } from "./CognitoAuthService";
import { useFranchisorAuth } from "../../../contexts/franchisorAuthContext";
import { Auth } from "aws-amplify";
import { STORAGE_KEYS } from "../../../constants/storage_keys";
import { useFranchiseAuth } from "../../../contexts/franchiseAuthContext";
import { apiFranquia } from "../../../config/apiFranquia";

export function useLogin(body: {
  AuthFlow: string;
  AuthParameters: { USERNAME: string; PASSWORD: string };
  ClientId: string;
  ClientMetadata?: any;
  rememberMe?: boolean;
}) {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [isLoggedIn] = useState(false);

  const { setToken } = useFranchiseAuth();

  const getHeaders = async () => {
    const user = await congnitoAuthService.getToken();
    const authToken = congnitoAuthService.getAuthToken();
    const token = user.accessToken.jwtToken;
    const idToken = user.idToken.jwtToken;
    apiFranquia.defaults.headers.Authorization = `Bearer ${token}`;
    apiFranquia.defaults.headers.Identity = `${idToken}`;
    apiFranquia.defaults.headers.AuthToken = `${authToken}`;
    apiFranquia.defaults.headers["ngrok-skip-browser-warning"] = true;
  };

  async function mutate() {
    try {
      setLoading(true);
      Auth.configure({
        storage: localStorage.setItem(
          STORAGE_KEYS.local.remmemberMe,
          `${body.rememberMe}`
        ),
      });
      const login = await congnitoAuthService.signIn(
        body.AuthParameters.USERNAME,
        body.AuthParameters.PASSWORD
      );
      getHeaders();
      setToken(login);
      setData(login);
      setIsSuccess(true);
    } catch (error) {
      setError(error);
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  function reset() {
    setError(null);
    setData(null);
    setLoading(false);
    setIsSuccess(false);
  }

  return {
    loading,
    error,
    mutate,
    isSuccess,
    reset,
    data,
    isLoggedIn,
  };
}
