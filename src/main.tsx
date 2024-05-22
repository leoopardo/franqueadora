import { LoadingOutlined } from "@ant-design/icons";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
// Import the generated route tree
import { Col, Layout, Row, Spin } from "antd";
import "./globalStyles.css";
import { routeTree } from "./routeTree.gen";
import defaultTheme from "./styles/default";

// Create a new router instance
const router = createRouter({ routeTree });

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

// Render the app
const rootElement = document.getElementById("root")!;

if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <RouterProvider
        router={router}
        defaultPendingMinMs={2000}
        defaultPendingComponent={() => (
          <Layout>
            <Row
              style={{
                height: "100vh",
              }}
            >
              <Col
                span={24}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                  gap: 16,
                }}
              >
                <img
                  src={"/logoDef.svg"}
                  alt="logo-pdv365"
                  style={{ width: "25%" }}
                />
                <Spin
                  indicator={
                    <LoadingOutlined
                      style={{ fontSize: 48, color: defaultTheme.primary }}
                      spin
                    />
                  }
                />
              </Col>
            </Row>
          </Layout>
        )}
      />
    </StrictMode>
  );
}
