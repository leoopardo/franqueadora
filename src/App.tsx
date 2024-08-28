import { ConfigProvider, notification } from "antd";
import ptbr from "antd/locale/pt_BR";
import { QueryClientProvider } from "react-query";
import { BrowserRouter } from "react-router-dom";
import { FranchiseAuthProvider } from "./contexts/franchiseAuthContext";
import { FranchisorAuthProvider } from "./contexts/franchisorAuthContext";
import { useTheme } from "./contexts/themeContext";
import { FranchiseRoutes } from "./_franchise/routes";
import { FranchisorRoutes } from "./_franchisor/routes";
import { LandingRoutes } from "./public";
import { queryClient } from "./services/queryClient";
import Dark from "./styles/darkTheme";
import Light from "./styles/lightTheme";
import { getSubdomain } from "@utils/getSubdomain";
import { ReportsAuthProvider } from "./contexts/reportsAuthContext";
import { ReportsRoutes } from "./_reports/routes";

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
        <ReportsAuthProvider>
          <FranchisorAuthProvider>
            <FranchiseAuthProvider>
              <BrowserRouter>
                {PainelList.includes(getSubdomain()) ? (
                  <FranchiseRoutes />
                ) : getSubdomain() == "franqueadora" ? (
                  <FranchisorRoutes />
                ) : getSubdomain() == "relatorios" ? (
                  <ReportsRoutes />
                ) : (
                  <LandingRoutes />
                )}
              </BrowserRouter>
            </FranchiseAuthProvider>
          </FranchisorAuthProvider>
        </ReportsAuthProvider>
      </ConfigProvider>
    </QueryClientProvider>
  );
};
