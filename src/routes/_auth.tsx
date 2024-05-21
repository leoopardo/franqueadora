import { Outlet, createFileRoute } from "@tanstack/react-router";
import { Button, Layout, Row } from "antd";
import { Content, Header } from "antd/es/layout/layout";
import defaultTheme from "../styles/default";
import { SiderComponent } from "../components/sider";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { useState } from "react";
import { useBreakpoints } from "../hooks/useBreakpoints";

export const Route = createFileRoute("/_auth")({
  component: AuthLayout,
});

function AuthLayout() {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(true);
  const { isMd } = useBreakpoints();
  return (
    <Layout style={{ width: "100vw", height: "100vh" }}>
      <SiderComponent isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      <Layout>
        <Header
          style={{ padding: "12px 4px", backgroundColor: defaultTheme.strong }}
        >
          <Button
            type="text"
            icon={
              !isMenuOpen ? (
                <MenuUnfoldOutlined
                  style={{ color: "#fff", fontSize: "24px" }}
                />
              ) : (
                <MenuFoldOutlined style={{ color: "#fff", fontSize: "24px" }} />
              )
            }
            onClick={() => setIsMenuOpen((prev) => !prev)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content>
          <Row
            style={{
              height: "40%",
              background:
                "linear-gradient(180deg, rgba(18,85,45,1) 0%, rgba(18,171,75,1) 100%)",
            }}
          />
          <Row
            style={{
              padding: "20px",
              position: isMd ? "relative" : "absolute",
              top: 0,
              display: "flex",
              flexDirection: "column",
              gap: 8,
              marginLeft: isMd ? 0 : 54,
              width: isMd ? "100%" : `calc(100% - ${isMenuOpen ? 320 : 150}px)`,
              marginTop: isMd ? "-37vh" : 0,
            }}
          >
            <Outlet />
          </Row>
        </Content>
      </Layout>
    </Layout>
  );
}
