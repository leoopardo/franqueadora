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
import { Dispatch, ReactNode, SetStateAction, useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useFranchisorAuth } from "../../contexts/franchisorAuthContext";
import { useTheme } from "../../contexts/themeContext";
import { useBreakpoints } from "../../hooks/useBreakpoints";
import { queryClient } from "../../services/queryClient";

interface SiderComponentI {
  isMenuOpen: boolean;
  setIsMenuOpen: Dispatch<SetStateAction<boolean>>;
  children: ReactNode;
  menus: (PendingCount: number) => MenuDataItem[];
  pending?: number;
  franquia?: boolean;
  logout?: () => void;
  onChange?: (item: any) => void;
}

export const SiderComponent = ({
  isMenuOpen,
  setIsMenuOpen,
  children,
  menus,
  franquia,
  logout,
  onChange,
  pending,
}: SiderComponentI) => {
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();
  const { isSm, isMd, isXl, isLg } = useBreakpoints();
  const { headers } = useFranchisorAuth();
  const location = useLocation();
  const [openKeys, setOpenKeys] = useState<string[]>([]);

  const handleMenuOpenChange = (keys: string[] | false) => {
    if (keys && keys.length > 1) {
      setOpenKeys([keys[keys.length - 1]]);
    } else {
      setOpenKeys(keys ? keys : []);
    }
  };

  useEffect(() => {
    setOpenKeys([]);
    window.scroll({ top: 0, left: 0, behavior: "smooth" });
  }, [location]);

  return (
    <ProLayout
      pageTitleRender={false}
      menuDataRender={() => menus(pending || 0)}
      contentStyle={{
        padding: 0,
        margin: 0,
        display: "flex",
        justifyContent: "center",
      }}
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
                  ? { height: "100%", width: "100%" }
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
                  ? { height: "100%", width: "100%" }
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
      menuItemRender={(item, dom) => {
        if (item?.name === "Pendentes" || item?.name === "Terminais") {
          return (
            <Link
              key={item.key}
              to={item.disabled ? "#" : item.path ?? ""}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                cursor: item.disabled ? "no-drop" : "pointer",
              }}
              onClick={onChange ? () => onChange(item) : undefined}
            >
              {dom}{" "}
              {pending && pending >= 1 ? (
                <Badge color="green" count={pending || 0}></Badge>
              ) : (
                <></>
              )}
            </Link>
          );
        }
        return (
          <Link
            key={item.key}
            to={item.disabled ? "#" : item.path ?? ""}
            style={{ cursor: item.disabled ? "no-drop" : "pointer" }}
            onClick={onChange ? () => onChange(item) : undefined}
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
              <Link
                to={`http://franquia${
                  import.meta.env.VITE_ENV === "local" ? "." : "-"
                }${window.location.host
                  .split(import.meta.env.VITE_ENV === "local" ? "." : "-")
                  .slice(
                    1,
                    window.location.host.split(
                      import.meta.env.VITE_ENV === "local" ? "." : "-"
                    ).length
                  )
                  .join()}/cross-auth/${JSON.stringify({
                  ...headers,
                  master: true,
                })}`}
                target="_blank"
              >
                <Button
                  size="middle"
                  type="default"
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    backgroundColor: "transparent",
                    border: "none",
                    fontSize: 15,
                  }}
                  icon={<ArrowRightOutlined />}
                >
                  {!props?.collapsed && "Acessar Franquia"}
                </Button>
              </Link>
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
      openKeys={openKeys}
      onOpenChange={handleMenuOpenChange}
    >
      {children}
    </ProLayout>
  );
};
