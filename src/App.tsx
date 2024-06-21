import { Button, Col, ConfigProvider, Layout, Row } from "antd";
import { useEffect, useState } from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { FranchiseRoutes } from "./franchise/routes";
import { FranchisorRoutes } from "./franchisor/routes";
import { QueryClientProvider } from "react-query";
import ptbr from "antd/locale/pt_BR";
import { useTheme } from "./contexts/themeContext";
import Light from "./styles/lightTheme";
import Dark from "./styles/darkTheme";
import { queryClient } from "./services/queryClient";
import { FranchisorAuthProvider } from "./contexts/franchisorAuthContext";
import { FranchiseAuthProvider } from "./contexts/franchiseAuthContext";

export const App = () => {
  const PainelList = ["franquia", "promotor", "cliente"];
  const { theme } = useTheme();

  return (
    <QueryClientProvider client={queryClient}>
      <ConfigProvider locale={ptbr} theme={theme === "light" ? Light : Dark}>
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
                <Routes>
                  <Route
                    path="/"
                    element={
                      <Layout
                        style={{
                          height: "100vh",
                          width: "100vw",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <Row
                          gutter={[8, 8]}
                          style={{
                            width: "100%",
                            display: "flex",
                            justifyContent: "center",
                          }}
                        >
                          <Col span={4}>
                            <Link
                              to={`http://franqueadora.${window.location.host}`}
                            >
                              <Button style={{ width: "100%" }} size="large">
                                Franqueadora
                              </Button>
                            </Link>
                          </Col>
                          <Col span={4}>
                            <Link
                              to={`http://franquia.${window.location.host}`}
                            >
                              <Button style={{ width: "100%" }} size="large">
                                Franquia
                              </Button>
                            </Link>
                          </Col>
                        </Row>
                      </Layout>
                    }
                  />
                </Routes>
              )}
            </BrowserRouter>
          </FranchiseAuthProvider>
        </FranchisorAuthProvider>
      </ConfigProvider>
    </QueryClientProvider>
  );
};
