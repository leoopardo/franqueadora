import { createRootRoute, Outlet } from "@tanstack/react-router";
import { ConfigProvider, Layout } from "antd";
import ptbr from 'antd/locale/pt_BR';
import { QueryClientProvider } from "react-query";
import { useTheme } from "../contexts/themeContext";
import { queryClient } from "../services/queryClient";
import Dark from "../styles/darkTheme";
import Light from "../styles/lightTheme";

export const Route = createRootRoute({
  component: Root,
  
});

function Root(){
  const { theme } = useTheme();
 

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