import { LoadingOutlined } from "@ant-design/icons";
import { useBreakpoints } from "@hooks/useBreakpoints";
import { Layout, Spin, Typography } from "antd";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useFranchiseAuth } from "../../../../contexts/franchiseAuthContext";
import { useTheme } from "../../../../contexts/themeContext";
import secureLocalStorage from "react-secure-storage";

export const CrossAuth = () => {
  const { theme } = useTheme();
  const { isMd, isSm } = useBreakpoints();
  const { credentials } = useParams();
  const { setHeader } = useFranchiseAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (credentials) {
      setTimeout(() => {
        for (const key of Object.keys(JSON.parse(credentials))) {
          secureLocalStorage.setItem(key, JSON.parse(credentials)[key]);
        }
        localStorage.setItem("master", JSON.parse(credentials)?.master);
        setHeader(JSON.parse(credentials));
      }, 2500);

      setTimeout(() => {
        navigate("/");
      }, 3000);
    }
  }, []);

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
          <Typography.Text>Autenticando como usuário master</Typography.Text>
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
          />{" "}
          <Typography.Text>Autenticando como usuário master</Typography.Text>
          <Spin size="large" indicator={<LoadingOutlined size={40} spin />} />
        </div>
      )}
    </Layout>
  );
};
