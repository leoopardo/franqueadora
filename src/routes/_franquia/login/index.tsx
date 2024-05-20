import { createFileRoute } from "@tanstack/react-router";
import { Col, Row } from "antd";
import defaultTheme from "../../../styles/default";
import { useBreakpoints } from "../../../utils/useBreakpoints";
import { useTheme } from "../../../contexts/themeContext";

export const Route = createFileRoute("/_franquia/login/")({
  component: Login,
});

function Login() {
  const { isSm } = useBreakpoints();
  const { theme } = useTheme();
  const logo = theme === "dark" ? "/logoDark.svg" : "/logo.svg";

  return (
    <Row
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      gutter={[8, 8]}
    >
      {isSm && (
        <Col
          xs={{ span: 24 }}
          style={{
            height: "250px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              width: "98%",
              height: "98%",
              borderRadius: 16,
              marginTop: 8,
              backgroundColor: defaultTheme.primary,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img src={logo} />
          </div>
        </Col>
      )}
      <Col xs={{ span: 24 }} md={{ span: 10 }} style={{ height: "100%" }}></Col>
      {!isSm && (
        <Col
          xs={{ span: 0 }}
          md={{ span: 14 }}
          style={{
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              width: "98%",
              height: "98%",
              borderRadius: 16,
              backgroundColor: defaultTheme.primary,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img src={logo} alt="logo-pdv365" style={{ width: "250px" }} />
          </div>
        </Col>
      )}
    </Row>
  );
}
