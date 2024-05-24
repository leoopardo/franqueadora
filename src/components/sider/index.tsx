import {
  ArrowRightOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  MoonOutlined,
  SunOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { ProLayout } from "@ant-design/pro-components";
import { Link, useNavigate } from "@tanstack/react-router";
import { Badge, Button } from "antd";
import { Dispatch, ReactNode, SetStateAction } from "react";
import { useTheme } from "../../contexts/themeContext";
import { MenuItens } from "./menus";
import { useBreakpoints } from "../../hooks/useBreakpoints";

interface SiderComponentI {
  isMenuOpen: boolean;
  setIsMenuOpen: Dispatch<SetStateAction<boolean>>;
  children: ReactNode;
}

export const SiderComponent = ({
  isMenuOpen,
  setIsMenuOpen,
  children,
}: SiderComponentI) => {
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();
  const { isSm } = useBreakpoints();
  return (
    <ProLayout
      fixSiderbar
      fixedHeader
      pageTitleRender={false}
      menuDataRender={() => MenuItens(100)}
      layout="mix"
      collapsed={!isMenuOpen}
      onCollapse={(collapsed) => setIsMenuOpen(!collapsed)}
      logo={theme === "light" ? "/logoDef.svg" : "/logoWhiteDef.svg"}
      headerContentRender={
        !isSm
          ? () => {
              return (
                <div
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  style={{
                    cursor: "pointer",
                    fontSize: "16px",
                    width: 50,
                  }}
                >
                  {!isMenuOpen ? (
                    <MenuUnfoldOutlined style={{ fontSize: 22 }} />
                  ) : (
                    <MenuFoldOutlined style={{ fontSize: 22 }} />
                  )}
                </div>
              );
            }
          : undefined
      }
      collapsedButtonRender={
        isSm
          ? undefined
          : () => {
              return "";
            }
      }
      menuItemRender={(item, dom) => {
        if (item.name === "Pendentes" || item.name === "Terminais") {
          return (
            <Link
              to={item.path}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              {dom} <Badge color="green" count={100}></Badge>
            </Link>
          );
        }
        return <Link to={item.path}>{dom}</Link>;
      }}
      siderWidth={isMenuOpen ? 250 : 80}
      title=""
      actionsRender={(props) => {
        if (props.isMobile) return [];
        if (typeof window === "undefined") return [];
        return [
          theme === "light" ? (
            <Button onClick={() => setTheme("dark")} icon={<SunOutlined />} />
          ) : (
            <Button onClick={() => setTheme("light")} icon={<MoonOutlined />} />
          ),
        ];
      }}
      menuFooterRender={(props) => {
        return (
          <div
            style={{
              textAlign: "center",
              paddingBlockStart: 12,
            }}
          >
            <Button
              size="large"
              type="text"
              style={{ width: "100%" }}
              icon={<ArrowRightOutlined />}
              onClick={() => navigate({ to: "/" })}
            >
              {!props?.collapsed && "Acessar Franquia"}
            </Button>
            <Button
              size="large"
              type="text"
              style={{ width: "100%" }}
              icon={<UserOutlined />}
              onClick={() => navigate({ to: "/" })}
            >
              {!props?.collapsed && "Acessar perfil"}
            </Button>
            <Button
              size="large"
              type="text"
              danger
              style={{ width: "100%" }}
              icon={<LogoutOutlined />}
              onClick={() => navigate({ to: "/" })}
            >
              {!props?.collapsed && "Sair do backoffice"}
            </Button>
          </div>
        );
      }}
    >
      {children}
    </ProLayout>
  );
};
