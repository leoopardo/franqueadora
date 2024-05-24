import {
  LogoutOutlined,
  MoonOutlined,
  SunOutlined
} from "@ant-design/icons";
import { ProLayout } from "@ant-design/pro-components";
import { Link, useNavigate } from "@tanstack/react-router";
import { Badge, Button } from "antd";
import { Dispatch, ReactNode, SetStateAction } from "react";
import { useTheme } from "../../contexts/themeContext";
import { MenuItens } from "./menus";

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
  return (
    <ProLayout
      fixSiderbar
      fixedHeader
      pageTitleRender={false}
      menuDataRender={() => MenuItens(100)}
      layout="mix"
      onCollapse={(collapsed) => setIsMenuOpen(!collapsed)}
      logo={theme === "light" ?"/logoDef.svg" : "/logoWhiteDef.svg"}
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
