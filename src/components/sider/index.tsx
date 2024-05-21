import {
    MenuFoldOutlined
} from "@ant-design/icons";
import { Button, Col, Menu, Row } from "antd";
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
        position: isMd ? "fixed" : "relative",
        top: 0,
        left: 0,
        zIndex: 99,
        height: isMd ? "100vh" : undefined,
      }}
    >
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
        items={
          MenuItens(100).filter(
            () => true
            //implementar aqui a lógica para permissão de cada menu *permissão de ver*
          ).map((item) => {
            return { ...item };
          }) as any
        }
      />
    </Sider>
  );
};
