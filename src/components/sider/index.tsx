import {
  ArrowRightOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  MoonOutlined,
  SunOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { MenuDataItem, ProLayout } from "@ant-design/pro-components";
import { Badge, Button, Switch } from "antd";
import { Dispatch, ReactNode, SetStateAction } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "../../contexts/themeContext";
import { useBreakpoints } from "../../hooks/useBreakpoints";
import { queryClient } from "../../services/queryClient";
// import { signOut } from "@aws-amplify/auth";

interface SiderComponentI {
  isMenuOpen: boolean;
  setIsMenuOpen: Dispatch<SetStateAction<boolean>>;
  children: ReactNode;
  menus: (PendinCount: number) => MenuDataItem[];
  franquia?: boolean;
  logout?: () => void;
}

export const SiderComponent = ({
  isMenuOpen,
  setIsMenuOpen,
  children,
  menus,
  franquia,
  logout,
}: SiderComponentI) => {
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();
  const { isSm, isMd, isXl, isLg } = useBreakpoints();

  return (
    <ProLayout
      fixSiderbar
      fixedHeader
      pageTitleRender={false}
      menuDataRender={() => menus(100)}
      contentStyle={{
        padding: 0,
        margin: 0,
        display: "flex",
        justifyContent: "center",
      }}
      layout="side"
      collapsed={!isMenuOpen}
      onCollapse={(collapsed) => setIsMenuOpen(!collapsed)}
      logo={
        theme === "light" ? (
          <Link to="/dashboard">
            {" "}
            <img
              src="/logoDef.svg"
              style={
                !isMd || isSm
                  ? { height: 45, width: 150 }
                  : { height: 15, width: 50 }
              }
            />{" "}
          </Link>
        ) : (
          <Link to="/dashboard">
            <img
              src="/logoWhiteDef.svg"
              style={
                !isMd || isSm
                  ? { height: 45, width: 150 }
                  : { height: 15, width: 50 }
              }
            />
          </Link>
        )
      }
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
              to={item.disabled ? "#" : item.path ?? ""}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                cursor: item.disabled ? "no-drop" : "pointer"
              }}
            >
              {dom} <Badge color="green" count={100}></Badge>
            </Link>
          );
        }
        return (
          <Link
            to={item.disabled ? "#" : item.path ?? ""}
            style={{ cursor: item.disabled ? "no-drop" : "pointer" }}
          >
            {dom}
          </Link>
        );
      }}
      siderWidth={isXl ? 240 : isLg ? 200 : isMenuOpen ? 300 : 80}
      title=""
      menuFooterRender={(props) => {
        return (
          <div
            style={{
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              paddingBlockStart: 12,
              gap: 8,
            }}
          >
            {!props?.collapsed && (
              <Switch
                style={{ width: 50, marginLeft: 14 }}
                value={theme === "dark"}
                checkedChildren={<SunOutlined />}
                unCheckedChildren={<MoonOutlined />}
                defaultChecked
                onChange={(checked) =>
                  checked ? setTheme("dark") : setTheme("light")
                }
              />
            )}

            {!franquia && (
              <Button
                size="middle"
                type="default"
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  backgroundColor: "transparent",
                  border: "none",
                  boxShadow: "none",
                  fontSize: 15,
                }}
                icon={<ArrowRightOutlined />}
                onClick={() => navigate("/")}
              >
                {!props?.collapsed && "Acessar Franquia"}
              </Button>
            )}
            <Button
              size="middle"
              type="default"
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                backgroundColor: "transparent",
                border: "none",
                boxShadow: "none",
                fontSize: 15,
              }}
              icon={<UserOutlined />}
              onClick={() => navigate("/")}
            >
              {!props?.collapsed &&
                `${
                  (queryClient?.getQueryData("getMe") as any)?.name ||
                  (queryClient?.getQueryData("getMeFranchise") as any)?.name ||
                  "Perfil"
                }`}
            </Button>
            {logout && (
              <Button
                size="middle"
                danger
                type="default"
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  backgroundColor: "transparent",
                  border: "none",
                  boxShadow: "none",
                  fontSize: 15,
                }}
                icon={<LogoutOutlined />}
                onClick={logout}
              >
                {!props?.collapsed && "Sair do backoffice"}
              </Button>
            )}
          </div>
        );
      }}
    >
      {children}
    </ProLayout>
  );
};
