import { congnitoAuthService } from "@franchise/services/auth/CognitoAuthService";
import { Amplify } from "aws-amplify";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useFranchiseAuth } from "../../contexts/franchiseAuthContext";
import { queryClient } from "../../services/queryClient";
import { amplifyConfig } from "../services/auth/login.config";
import { useGetMe } from "../services/auth/useGetMe";
import { PrivateRoutes } from "./private";
import { Loading } from "./private/components/loading";
import { PublicRoutes } from "./public";
import { CrossAuth } from "./public/CrossAuth";

export const FranchiseRoutes = (): React.ReactElement => {
  const { refetch, isSuccess, isLoading, error, remove } = useGetMe();
  const navigate = useNavigate();
  const location = useLocation();
  const { token } = useFranchiseAuth();
  const { setHeader } = useFranchiseAuth();

  document.title = `Painel ${window.location.host.split(".")[0]} - PDV365`;

  useEffect(() => {
    Amplify.configure({
      ...amplifyConfig,
      oauth: {
        ...amplifyConfig.oauth,
        redirectSignIn:
          "https://franqueadora.localhost:5173/,https://franquia.localhost:5173/",
        redirectSignOut:
          "https://franqueadora.localhost:5173/,https://franquia.localhost:5173/",
      },
    });
    if (location.pathname.split("/").includes("cross-auth")) {
      setHeader(null);
      queryClient.clear();
      congnitoAuthService.signOut();
      remove();
    }
  }, []);

  useEffect(() => {
    refetch();
  }, [token]);

  useEffect(() => {
    if (error) {
      if (location.pathname.split("/").includes("cross-auth")) {
        return;
      }
      navigate("/");
    }
  }, [isSuccess, error]);

  if (isLoading) {
    if (localStorage.getItem("master")) {
      return <CrossAuth />;
    } else return <Loading />;
  }

  return isSuccess ? <PrivateRoutes /> : <PublicRoutes />;
};
