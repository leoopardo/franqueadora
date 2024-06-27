import { Spin } from "antd";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PrivateRoutes } from "./private";
import { PublicRoutes } from "./public";
import { Amplify } from "aws-amplify";
import { amplifyConfig } from "@franchisor/services/auth/login.config";
import { useFranchiseAuth } from "@contexts/franchiseAuthContext";
import { useGetMe } from "../services/auth/useGetMe";

export const FranchiseRoutes = (): React.ReactElement => {
  const { refetch, isSuccess, isLoading, error } = useGetMe();
  const navigate = useNavigate();
  const { token } = useFranchiseAuth();

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
  }, []);

  useEffect(() => {
    refetch();
    if (isSuccess) {
      navigate("/franquias");
    }
    if (error) {
      navigate("/");
    }
  }, [token]);

  if (isLoading) {
    return <Spin />;
  }

  return isSuccess ? <PrivateRoutes /> : <PublicRoutes />;
};
