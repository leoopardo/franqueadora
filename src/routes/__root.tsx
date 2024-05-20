import { createRootRoute, Outlet, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import secureLocalStorage from "react-secure-storage";
import "./globalStyles.css";
import { QueryClientProvider } from "react-query";
import { queryClient } from "../services/queryClient";
import { ConfigProvider, Layout } from "antd";
import { useTheme } from "../contexts/themeContext";
import Dark from "../styles/darkTheme";
import Light from "../styles/lightTheme";
import { useBreakpoints } from "../utils/useBreakpoints";

export const Route = createRootRoute({
  component: Root,
  
});

function Root(){
  const navigate = useNavigate();
  const { theme } = useTheme();
  const { isSm } = useBreakpoints();

  useEffect(() => {
    // if (!secureLocalStorage.getItem("token")) {
    //   navigate({ to: "/login" });
    // }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ConfigProvider theme={theme === "dark" ? Dark : Light}>
        <Layout
          style={{
            width: "100%",
            height: "100vh",
            overflow: "auto",
            paddingLeft: isSm ? 6 : 0,
          }}
        >
          <Outlet />
        </Layout>
      </ConfigProvider>
    </QueryClientProvider>
  );
}