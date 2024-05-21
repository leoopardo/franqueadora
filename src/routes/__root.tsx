import { createRootRoute, Outlet, useNavigate } from "@tanstack/react-router";
import { ConfigProvider, Layout } from "antd";
import { useEffect } from "react";
import { QueryClientProvider } from "react-query";
import secureLocalStorage from "react-secure-storage";
import { useTheme } from "../contexts/themeContext";
import { queryClient } from "../services/queryClient";
import Dark from "../styles/darkTheme";
import Light from "../styles/lightTheme";
import ptbr from 'antd/locale/pt_BR';

export const Route = createRootRoute({
  component: Root,
  
});

function Root(){
  const navigate = useNavigate();
  const { theme } = useTheme();

  useEffect(() => {
    // if (!secureLocalStorage.getItem("token")) {
    //   navigate({ to: "/login" });
    // }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ConfigProvider locale={ptbr} theme={theme === "dark" ? Dark : Light}>
        <Layout
          style={{
            width: "100%",
            height: "100vh",
            overflow: "auto",
            paddingLeft:  0,
          }}
        >
          <Outlet />
        </Layout>
      </ConfigProvider>
    </QueryClientProvider>
  );
}