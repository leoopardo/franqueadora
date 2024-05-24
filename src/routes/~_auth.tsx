import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  SmileOutlined,
} from "@ant-design/icons";
import { Link, Outlet, createFileRoute } from "@tanstack/react-router";
import { Badge, Button, Layout, Row } from "antd";
import { Content, Header } from "antd/es/layout/layout";
import { useEffect, useState } from "react";
import { SiderComponent } from "../components/sider";
import { useBreakpoints } from "../hooks/useBreakpoints";
import defaultTheme from "../styles/default";
import { ProLayout } from "@ant-design/pro-components";
import { MenuItens } from "../components/sider/menus";
import { ArrowLeftCircleIcon } from "@heroicons/react/24/outline";

export const Route = createFileRoute("/_auth")({
  component: AuthLayout,
});

function AuthLayout() {
  const { isMd } = useBreakpoints();
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(isMd ? false : true);

  // const navigate = useNavigate();
  useEffect(() => {
    // if (!secureLocalStorage.getItem("token")) {
    //   navigate({ to: "/" });
    // }
  }, []);

  return (
    <SiderComponent isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen}>
      <Content
        style={{
          minWidth: isMd
            ? "100vw"
            : isMenuOpen
              ? `calc(100vw - 250px)`
              : `calc(100vw - 64px)`,
          marginLeft: -40,
          marginTop: -36,
        }}
      >
        <Row
          style={{
            height: "40vh",
            padding: isMd ? 0 : 16,
            background:
              "linear-gradient(180deg, rgba(18,85,45,1) 0%, rgba(18,171,75,1) 100%)",
            width: "100%",
          }}
        >
          <Row
            style={{
              padding: "20px",
              top: 0,
              display: "flex",
              flexDirection: "column",
              gap: 8,
              width: "100%",
            }}
          >
            <Outlet />
          </Row>
        </Row>
      </Content>
    </SiderComponent>
  );
}
