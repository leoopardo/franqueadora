import { createFileRoute } from "@tanstack/react-router";
import { Col, Layout, Row } from "antd";
import Sider from "antd/es/layout/Sider";
import defaultTheme from "../../styles/default";

export const Route = createFileRoute("/login/")({
  component: Login,
});

function Login() {
  return (
    <Layout
      style={{
        width: "100vw",
        height: "100vh",
      }}
    >
      <Row
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Col span={10} style={{ height: "100%" }}></Col>
        <Col
          span={13}
          style={{
            height: "95%",
            borderRadius: 8,
            backgroundColor: defaultTheme.primary,
          }}
        ></Col>
      </Row>
    </Layout>
  );
}
