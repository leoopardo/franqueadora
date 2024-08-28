import envs from "@config/envs";
import { Amplify, Auth } from "aws-amplify";
import { useState } from "react";
import { STORAGE_KEYS } from "../../../constants/storage_keys";
import { useReportsAuth } from "../../../contexts/reportsAuthContext";
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
  // const [franchiseError, setFranchiseError] = useState<any>(null);

  const { setToken, setHeader } = useReportsAuth();

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
      Amplify.configure({
        Auth: {
          Cognito: {
            identityPoolId: envs.COGNITO.FRANCHISOR.USER_POOL_ID,
            userPoolId: envs.COGNITO.FRANCHISOR.USER_POOL_ID,
            userPoolClientId: envs.COGNITO.FRANCHISOR.CLIENT_ID,
          },
        },
      });
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
    }
  }

  // useEffect(() => {
  //   if (!franchiseError) return;
  //   async function loginFranchise() {
  //     try {
  //       Amplify.configure({
  //         Auth: {
  //           Cognito: {
  //             identityPoolId: envs.COGNITO.FRANCHISE.USER_POOL_ID,
  //             userPoolId: envs.COGNITO.FRANCHISE.USER_POOL_ID,
  //             userPoolClientId: envs.COGNITO.FRANCHISE.CLIENT_ID,
  //           },
  //         },
  //       });
  //       const login = await congnitoAuthService.signIn(
  //         body.AuthParameters.USERNAME,
  //         body.AuthParameters.PASSWORD
  //       );
  //       await getHeaders();
  //       setToken(login);
  //       setData(login);
  //       setIsSuccess(true);
  //     } catch (error) {
  //       setError(error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   }

  //   loginFranchise();
  // }, [franchiseError]);

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
