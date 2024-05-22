import {
    ArrowRightOutlined,
    LogoutOutlined,
    MenuFoldOutlined,
    SettingOutlined,
} from "@ant-design/icons";
import { useNavigate } from "@tanstack/react-router";
import { Button, Col, Menu, Row, Tooltip } from "antd";
import Sider from "antd/es/layout/Sider";
import { Dispatch, SetStateAction, useRef } from "react";
import { useTheme } from "../../contexts/themeContext";
import { useBreakpoints } from "../../hooks/useBreakpoints";
import useOutsideClick from "../../hooks/useOutSideClick";
import { MenuItens } from "./menus";

interface SiderComponentI {
  isMenuOpen: boolean;
  setIsMenuOpen: Dispatch<SetStateAction<boolean>>;
}

export const SiderComponent = ({
  isMenuOpen,
  setIsMenuOpen,
}: SiderComponentI) => {
  const { isMd } = useBreakpoints();
  const { theme } = useTheme();
  const siderRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useOutsideClick(siderRef, () => {
    if (isMd && isMenuOpen) {
      setIsMenuOpen(false);
    }
  });

  return (
    <Sider
      theme="light"
      ref={siderRef}
      collapsible
      collapsed={!isMenuOpen}
      onCollapse={() => setIsMenuOpen((state) => !state)}
      trigger={null}
      width={isMenuOpen ? "250px" : "80px"}
      style={{
        display: isMd && !isMenuOpen ? "none" : undefined,
        position: isMd ? "fixed" : "fixed",
        top: 0,
        left: 0,
        zIndex: 99,
        height: "100vh",
      }}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <div>
          <Row align="middle">
            <Col xs={{ span: 20 }} md={{ span: 24 }}>
              <img
                src={theme === "dark" ? "/logoWhiteDef.svg" : "/logoDef.svg"}
                alt="logo-pdv365"
                style={{
                  width: isMenuOpen ? "80%" : "100%",
                  padding: isMenuOpen ? 20 : 8,
                }}
              />
            </Col>
            {isMd && (
              <Col span={2} style={{ paddingRight: 8 }}>
                <Button
                  type="primary"
                  icon={<MenuFoldOutlined />}
                  onClick={() => {
                    setIsMenuOpen(false);
                  }}
                />
              </Col>
            )}
          </Row>

          <Menu
            theme="light"
            mode="inline"
            defaultSelectedKeys={["2"]}
            onClick={() => {
              isMd && setIsMenuOpen(false);
            }}
            style={{ width: "100%", maxHeight: "70vh", overflow: "auto" }}
            items={
              MenuItens(100, isMenuOpen)
                .filter(
                  () => true
                  //implementar aqui a lógica para permissão de cada menu *permissão de ver*
                )
                .map((item) => {
                  return {
                    ...item,
                  };
                }) as any
            }
          />
        </div>

        <div style={{ gap: 8, display: "flex", flexDirection: "column" }}>
          <Tooltip
            arrow
            placement="right"
            title={!isMenuOpen && "Configurações"}
          >
            <Button
              style={{
                width: "98%",
                display: "flex",
                justifyContent: "start",
                alignItems: "center",
                paddingLeft: 32,
              }}
              type="text"
              size="large"
              iconPosition="end"
              icon={<SettingOutlined />}
            >
              {isMenuOpen && "Configurações"}
            </Button>
          </Tooltip>
          <Tooltip
            arrow
            placement="right"
            title={!isMenuOpen && "Acessar franquia"}
          >
            <Button
              style={{
                width: "98%",
                display: "flex",
                justifyContent: "start",
                alignItems: "center",
                paddingLeft: 32,
              }}
              type="text"
              size="large"
              iconPosition="end"
              icon={<ArrowRightOutlined />}
            >
              {isMenuOpen && "Acessar franquia"}
            </Button>
          </Tooltip>

          <Tooltip
            arrow
            placement="right"
            title={!isMenuOpen && "Sair do backoffice"}
          >
            <Button
              danger
              type="text"
              size="large"
              style={{
                width: "98%",
                display: "flex",
                justifyContent: "start",
                alignItems: "center",
                paddingLeft: 32,
              }}
              onClick={() => navigate({ to: "/" })}
              iconPosition="end"
              icon={<LogoutOutlined />}
            >
              {isMenuOpen && "Sair do backoffice"}
            </Button>
          </Tooltip>
        </div>
      </div>
    </Sider>
  );
};
