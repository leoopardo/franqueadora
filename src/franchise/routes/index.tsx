import loading from "@assets/loading.gif";
import { congnitoAuthService } from "@franchise/services/auth/CognitoAuthService";
import { useBreakpoints } from "@hooks/useBreakpoints";
import { Layout } from "antd";
import { Amplify } from "aws-amplify";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useFranchiseAuth } from "../../contexts/franchiseAuthContext";
import { useTheme } from "../../contexts/themeContext";
import { queryClient } from "../../services/queryClient";
import { amplifyConfig } from "../services/auth/login.config";
import { useGetMe } from "../services/auth/useGetMe";
import { PrivateRoutes } from "./private";
import { PublicRoutes } from "./public";
import { CrossAuth } from "./public/CrossAuth";

export const FranchiseRoutes = (): React.ReactElement => {
  const { refetch, isSuccess, isLoading, error, remove } = useGetMe();
  const navigate = useNavigate();
  const location = useLocation();
  const { token } = useFranchiseAuth();
  const { theme } = useTheme();
  const { isMd, isSm } = useBreakpoints();
  const { setHeader } = useFranchiseAuth();
  const [delay, setDelay] = useState<boolean>(true);

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

  useEffect(() => {
    if (!isLoading) {
      setTimeout(() => {
        setDelay(false);
      }, 2000);
    }
  }, [isLoading]);

  if (delay) {
    if (localStorage.getItem("master")) {
      return <CrossAuth />;
    }
    return (
      <Layout
        style={{
          height: "100vh",
          width: "100vw",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {theme === "light" ? (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: 8,
            }}
          >
            <img
              src="/logoDef.svg"
              style={
                !isMd || isSm
                  ? { height: 60, width: 250 }
                  : { height: 15, width: 50 }
              }
            />
            <img
              src={loading}
              alt="logo"
              style={
                !isMd || isSm
                  ? { width: 150 }
                  : {width: 50 }
              }
            />
            {/* <Spin size="large" indicator={<LoadingOutlined size={40} spin />} /> */}
          </div>
        ) : (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: 8,
            }}
          >
            <img
              src="/logoWhiteDef.svg"
              style={
                !isMd || isSm
                  ? { height: 60, width: 250 }
                  : { height: 15, width: 50 }
              }
            />
            <img
              src={loading}
              alt="logo"
              style={
                !isMd || isSm
                  ? { width: 150 }
                  : {width: 50 }
              }
            />
            {/* <Spin size="large" indicator={<LoadingOutlined size={40} spin />} /> */}
          </div>
        )}
      </Layout>
    );
  }

  return isSuccess ? <PrivateRoutes /> : <PublicRoutes />;
};
