import { Auth } from "aws-amplify";
import { useState } from "react";
import { STORAGE_KEYS } from "../../../constants/storage_keys";
import { useFranchiseAuth } from "../../../contexts/franchiseAuthContext";
import { congnitoAuthService } from "./CognitoAuthService";

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

  const { setToken, setHeader } = useFranchiseAuth();

  const getHeaders = async () => {
    const user = await congnitoAuthService.getToken();
    const token = user.accessToken.jwtToken;
    const idToken = user.idToken.jwtToken;
    setHeader({
      Authorization: `Bearer ${token}`,
      Identity: `${idToken}`,
      AuthToken: `${idToken}`,
      "ngrok-skip-browser-warning": true,
    });
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
