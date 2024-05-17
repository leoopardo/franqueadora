import { createRootRoute, Outlet, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import secureLocalStorage from "react-secure-storage";
import "./globalStyles.css";
import { QueryClientProvider } from "react-query";
import { queryClient } from "../services/queryClient";
import { ConfigProvider } from "antd";
import { useTheme } from "../contexts/themeContext";
import Dark from "../styles/darkTheme";
import Light from "../styles/lightTheme";

export const Route = createRootRoute({
  component: () => {
    const navigate = useNavigate();
    const { theme } = useTheme();
    useEffect(() => {
      // if (!secureLocalStorage.getItem("token")) {
      //   navigate({ to: "/login" });
      // }
    }, []);

    return (
      <QueryClientProvider client={queryClient}>
        <ConfigProvider theme={theme === "dark" ? Dark : Light}>
          <Outlet />
        </ConfigProvider>
      </QueryClientProvider>
    );
  },
});
