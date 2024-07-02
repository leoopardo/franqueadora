import { ConfigProvider, notification } from "antd";
import ptbr from "antd/locale/pt_BR";
import { QueryClientProvider } from "react-query";
import { BrowserRouter } from "react-router-dom";
import { FranchiseAuthProvider } from "./contexts/franchiseAuthContext";
import { FranchisorAuthProvider } from "./contexts/franchisorAuthContext";
import { useTheme } from "./contexts/themeContext";
import { FranchiseRoutes } from "./franchise/routes";
import { FranchisorRoutes } from "./franchisor/routes";
import { LandingRoutes } from "./public";
import { queryClient } from "./services/queryClient";
import Dark from "./styles/darkTheme";
import Light from "./styles/lightTheme";

export const App = () => {
  const PainelList = ["franquia", "promotor", "cliente"];
  const { theme } = useTheme();
  const [_api, contextHolder] = notification.useNotification({
    placement: "topRight",
    duration: 3000,
  });

  return (
    <QueryClientProvider client={queryClient}>
      <ConfigProvider locale={ptbr} theme={theme === "light" ? Light : Dark}>
        {contextHolder}
        <FranchisorAuthProvider>
          <FranchiseAuthProvider>
            <BrowserRouter>
              {PainelList.includes(
                window.location.host.split(".")[0].toLowerCase()
              ) ? (
                <FranchiseRoutes />
              ) : window.location.host.split(".")[0] == "franqueadora" ? (
                <FranchisorRoutes />
              ) : (
                <LandingRoutes />
              )}
            </BrowserRouter>
          </FranchiseAuthProvider>
        </FranchisorAuthProvider>
      </ConfigProvider>
    </QueryClientProvider>
  );
};
