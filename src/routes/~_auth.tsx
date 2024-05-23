import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Outlet, createFileRoute } from "@tanstack/react-router";
import { Button, Layout, Row } from "antd";
import { Content, Header } from "antd/es/layout/layout";
import { useEffect, useState } from "react";
import { SiderComponent } from "../components/sider";
import { useBreakpoints } from "../hooks/useBreakpoints";
import defaultTheme from "../styles/default";

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
    <Layout style={{ width: "100vw", height: "100vh" }}>
      <SiderComponent isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      <Layout
        style={{
          top: 0,
          width: isMenuOpen ? "90vw" : "96.5vw",
          minHeight: "100vh",
          paddingLeft: isMd ? 0 : isMenuOpen ? 250 : 80,
          overflowX: "hidden",
        }}
      >
        <Header
          style={{
            padding: "8px 12px",
            backgroundColor: defaultTheme.strong,
            paddingBottom: 16,
            display: "flex",
            justifyContent: "space-between",
          }}
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
            }}
          />
        </Header>
        <Content style={{ width: "100%" }}>
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
              top: 0,
              display: "flex",
              flexDirection: "column",
              gap: 8,
              marginTop: isMd ? "-37vh" : "-38vh",
            }}
          >
            <Outlet />
          </Row>
        </Content>
      </Layout>
    </Layout>
  );
}
