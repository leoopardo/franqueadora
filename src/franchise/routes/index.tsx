import { Layout, Spin } from "antd";
import { Amplify } from "aws-amplify";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useFranchiseAuth } from "../../contexts/franchiseAuthContext";
import { amplifyConfig } from "../services/auth/login.config";
import { useGetMe } from "../services/auth/useGetMe";
import { PrivateRoutes } from "./private";
import { PublicRoutes } from "./public";
import { useTheme } from "../../contexts/themeContext";
import { useBreakpoints } from "@hooks/useBreakpoints";
import { LoadingOutlined } from "@ant-design/icons";

export const FranchiseRoutes = (): React.ReactElement => {
  const { refetch, isSuccess, isLoading, error } = useGetMe();
  const navigate = useNavigate();
  const location = useLocation()
  const { token } = useFranchiseAuth();
  const { theme } = useTheme();
  const { isMd, isSm } = useBreakpoints();

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
  }, [token]);

  useEffect(() => {
    if (error) {
      if(location.pathname.split("/").includes("cross-auth")){return}
      navigate("/");
    }
  }, [isSuccess, error]);

  if (isLoading) {
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
                  ? { height: 45, width: 150 }
                  : { height: 15, width: 50 }
              }
            />
            <Spin size="large" indicator={<LoadingOutlined size={40} spin />} />
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
                  ? { height: 45, width: 150 }
                  : { height: 15, width: 50 }
              }
            />
            <Spin size="large" indicator={<LoadingOutlined size={40} spin />} />
          </div>
        )}
      </Layout>
    );
  }

  return isSuccess ? <PrivateRoutes /> : <PublicRoutes />;
};
