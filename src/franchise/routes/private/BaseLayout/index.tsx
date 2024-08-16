// import { cognitoUserPoolsTokenProvider } from "@aws-amplify/auth/cognito";
import { Row } from "antd";
import { Content } from "antd/es/layout/layout";
import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import secureLocalStorage from "react-secure-storage";
import { SiderComponent } from "../../../../components/sider";
import { useFranchiseAuth } from "../../../../contexts/franchiseAuthContext";
import { useTheme } from "../../../../contexts/themeContext";
import { useBreakpoints } from "../../../../hooks/useBreakpoints";
import { queryClient } from "../../../../services/queryClient";
import { MenuItens } from "../../../components/sider_menus/menus";
import { congnitoAuthService } from "../../../services/auth/CognitoAuthService";
import { getMeI, useGetMe } from "../../../services/auth/useGetMe";

export const BaseLayout = () => {
  const { isMd } = useBreakpoints();
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(isMd ? false : true);
  const { theme } = useTheme();
  const { setHeader } = useFranchiseAuth();
  const { refetch } = useGetMe();
  const navigate = useNavigate();
  const user = queryClient.getQueryData("getMeFranchise") as getMeI;

  useEffect(() => {
    if (location.pathname === "/") {
      navigate("/eventos");
    }
  }, []);

  return (
    <SiderComponent
      isMenuOpen={isMenuOpen}
      setIsMenuOpen={setIsMenuOpen}
      menus={() =>
        MenuItens(
          100,
          user?.Promoter?.id ? true : false,
          user?.Client?.id ? true : false
        )
      }
      logout={async () => {
        await congnitoAuthService.signOut();
        setHeader(null);
        secureLocalStorage.clear();
        localStorage.removeItem("master");
        setTimeout(() => {
          refetch();
        }, 500);
      }}
      franquia
    >
      <Content
        style={{
          width: "100%",
          height: "100%",
          minHeight: "100vh",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundImage:
            theme === "light"
              ? `
          linear-gradient(
            to top left,
            rgba(255, 255, 255, 0.80),
            rgba(255, 255, 255, 1),
            rgba(255, 255, 255, 1), 
            rgba(255, 255, 255, 1),
            rgba(255, 255, 255, 0.80)
          ),
          url("data:image/svg+xml,<svg id='patternId' width='100%' height='100%' xmlns='http://www.w3.org/2000/svg'><defs><pattern id='a' patternUnits='userSpaceOnUse' width='50' height='29.442' patternTransform='scale(1) rotate(0)'><rect x='0' y='0' width='100%' height='100%' fill='hsla(220, 18%, 97%, 1)'/><path d='M35.569-17.373 22.959 4.468l-12.61-21.841Zm0 29.442-12.61 21.84-12.61-21.84Zm25-14.721-12.61 21.841-12.61-21.841zm0 29.441-12.61 21.842-12.61-21.842Zm-33.478 0L39.7 4.95l12.61 21.84zM10.569-2.652l-12.61 21.841-12.61-21.841Zm0 29.441-12.61 21.842-12.61-21.842Zm-33.478 0L-10.3 4.95l12.61 21.84zm25-14.72L14.7-9.773l12.61 21.842zm0 29.441L14.7 19.67l12.61 21.841z'  stroke-width='0.5' stroke='hsla(144, 65%, 20%, 1)' fill='none'/></pattern></defs><rect width='800%' height='800%' transform='translate(0,0)' fill='url(%23a)'/></svg>")
        `
              : `
        linear-gradient(
          to top left,
          rgba(24, 25, 27, 0.3),
          rgba(24, 25, 27, 1),
          rgba(24, 25, 27, 1),
          rgba(24, 25, 27, 1),
          rgba(24, 25, 27, 0.3)
        ),
        url("data:image/svg+xml,<svg id='patternId' width='100%' height='100%' xmlns='http://www.w3.org/2000/svg'><defs><pattern id='a' patternUnits='userSpaceOnUse' width='50' height='29.442' patternTransform='scale(1) rotate(0)'><rect x='0' y='0' width='100%' height='100%' fill='hsla(220, 6%, 10%, 1)'/><path d='M35.569-17.373 22.959 4.468l-12.61-21.841Zm0 29.442-12.61 21.84-12.61-21.84Zm25-14.721-12.61 21.841-12.61-21.841zm0 29.441-12.61 21.842-12.61-21.842Zm-33.478 0L39.7 4.95l12.61 21.84zM10.569-2.652l-12.61 21.841-12.61-21.841Zm0 29.441-12.61 21.842-12.61-21.842Zm-33.478 0L-10.3 4.95l12.61 21.84zm25-14.72L14.7-9.773l12.61 21.842zm0 29.441L14.7 19.67l12.61 21.841z'  stroke-width='0.5' stroke='hsla(144, 65%, 20%, 1)' fill='none'/></pattern></defs><rect width='800%' height='800%' transform='translate(0,0)' fill='url(%23a)'/></svg>")
      `,
        }}
      >
        <Row
          style={{
            top: 0,
            display: "flex",
            flexDirection: "column",
            gap: 8,
            width: "100%",
            overflow: "hidden",
          }}
        >
          <Outlet />
        </Row>
      </Content>
    </SiderComponent>
  );
};
