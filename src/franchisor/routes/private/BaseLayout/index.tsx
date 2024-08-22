// import { cognitoUserPoolsTokenProvider } from "@aws-amplify/auth/cognito";
import { useGetPendingNumber } from "@franchisor/services/terminals/pending/getPendingNumber";
import { Content } from "antd/es/layout/layout";
import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import secureLocalStorage from "react-secure-storage";
import { SiderComponent } from "../../../../components/sider";
import { useFranchisorAuth } from "../../../../contexts/franchisorAuthContext";
import { useTheme } from "../../../../contexts/themeContext";
import { useBreakpoints } from "../../../../hooks/useBreakpoints";
import { MenuItens } from "../../../components/sider_menus/menus";
import { congnitoAuthService } from "../../../services/auth/CognitoAuthService";
import { useGetMe } from "../../../services/auth/useGetMe";

export const BaseLayout = () => {
  const { isMd } = useBreakpoints();
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(isMd ? false : true);
  const { theme } = useTheme();
  const { setHeader } = useFranchisorAuth();
  const { refetch } = useGetMe();
  const pendingNumber = useGetPendingNumber();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname === "/") {
      navigate("/franquias");
    }
  }, []);

  return (
    <SiderComponent
      isMenuOpen={isMenuOpen}
      setIsMenuOpen={setIsMenuOpen}
      menus={() => MenuItens(pendingNumber.data || 0)}
      pending={pendingNumber.data || 0}
      logout={async () => {
        try {
          await congnitoAuthService.signOut();
        } catch (error) {
          console.error(error);
        }
        setHeader(null);
        secureLocalStorage.clear();
        setTimeout(() => {
          refetch();
        }, 500);
      }}
      onChange={() => pendingNumber.refetch()}
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
            rgba(260, 260, 260, 0.80),
            rgba(260, 260, 260, 1),
            rgba(260, 260, 260, 1), 
            rgba(260, 260, 260, 1),
            rgba(260, 260, 260, 0.80)
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
        <Outlet />
      </Content>
    </SiderComponent>
  );
};
