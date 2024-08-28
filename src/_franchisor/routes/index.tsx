import loading from "@assets/loading.gif";
import { Layout } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFranchisorAuth } from "../../contexts/franchisorAuthContext";
import { useTheme } from "../../contexts/themeContext";
import { useBreakpoints } from "../../hooks/useBreakpoints";
import { useGetMe } from "../services/auth/useGetMe";
import { PrivateRoutes } from "./private";
import { PublicRoutes } from "./public";

export const FranchisorRoutes = (): React.ReactElement => {
  const { refetch, isSuccess, isLoading, error } = useGetMe();
  const navigate = useNavigate();
  const { token } = useFranchisorAuth();
  const { theme } = useTheme();
  const { isMd, isSm } = useBreakpoints();
  const [delay, setDelay] = useState<boolean>(true);

  document.title = `Franqueadora - PDV365`;

  useEffect(() => {
    refetch();
  }, [token]);

  useEffect(() => {
    if (error) {
      navigate("/");
    }
  }, [isSuccess, error]);

  useEffect(() => {
    if(!isLoading) {
      setTimeout(() => {
        setDelay(false);
      }, 2000);
    }
  }, [isLoading])

  if (delay) {
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
