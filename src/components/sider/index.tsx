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
import { useSetTenant } from "@franchise/services/Tenant/setTenant";
import { useListFranchises } from "@franchise/services/franchises/listFranchises";
import { useSearchFranchises } from "@franchise/services/franchises/searchFranchises";
import { QueryKeys as qK } from "@franchise/services/queryKeys";
import { FranchiseParams } from "@franchisor/services/franchises/__interfaces/franchises.interface";
import { QueryKeys } from "@franchisor/services/queryKeys";
import useDebounce from "@hooks/useDebounce";
import defaultTheme from "@styles/default";
import { formatCNPJ } from "@utils/regexFormat";
import { Badge, Button, Input, Menu, Switch, Typography } from "antd";
import { MenuProps } from "antd/lib";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useFranchisorAuth } from "../../contexts/franchisorAuthContext";
import { useTheme } from "../../contexts/themeContext";
import { useBreakpoints } from "../../hooks/useBreakpoints";
import { queryClient } from "../../services/queryClient";
import Logo from "../../../public/pdv365-logo-white.svg"

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
type MenuItem = Required<MenuProps>["items"][number];

const INITIAL_PARAMS = {
  page: 0,
  size: 500,
};

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
  const [franchisesParams, setFranchisesParams] =
    useState<FranchiseParams>(INITIAL_PARAMS);
  const [tenant, setTenant] = useState<string | null>(
    localStorage.getItem("tenant") || null
  );
  const { data } = useListFranchises(INITIAL_PARAMS, franquia);
  const searchFranchises = useSearchFranchises(franchisesParams, franquia);
  const { mutate } = useSetTenant();

  const debounceSearch = useDebounce((e) => {
    if (!e.target.value) {
      setFranchisesParams((state) => ({
        ...state,
        s: undefined,
        f: undefined,
      }));
      return;
    }
    setFranchisesParams((state) => ({
      ...state,
      s: e.target.value,
      f: ["franchise_name", "cnpj", "ref_id", "username"].join(","),
    }));
  }, 500);

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

  useEffect(() => {
    if(franquia) return
    if (localStorage.getItem("tenant")) {
      setTenant(`${localStorage.getItem("tenant")}`);
    }
  }, []);

  useEffect(() => {
    if(franquia) return
    if (data) {
      mutate({
        franchise_id:
          tenant || localStorage.getItem("tenant")
            ? `${localStorage.getItem("tenant")}`
            : null,
      });
    }
  }, [tenant, data]);

  const getFranchises = useCallback(() => {
    const items: MenuItem[] =
      searchFranchises?.data?.items?.map((franchise) => ({
        key: franchise?.tenant_id || "",
        label: (
          <div style={{ display: "flex", flexDirection: "column", padding: 8 }}>
            <Typography.Text>{franchise.franchise_name}</Typography.Text>
            <Typography.Text>{formatCNPJ(franchise.cnpj)}</Typography.Text>
          </div>
        ),
        disabled: !franchise.active || franchise.is_deleted,
        style: { height: 60, width: 260 },
        onClick: () => {
          setTenant(`${franchise.id}`);
          localStorage.setItem("tenant", `${franchise.id}`);
          setFranchisesParams(INITIAL_PARAMS);
        },
      })) || [];

    const currentFranchise: MenuItem[] = [
      {
        key:
          data?.items.find((franchise) => franchise.id === tenant)?.id ||
          "Selecionar franquia",
        label:
          data?.items.find((franchise) => franchise.id === tenant)
            ?.franchise_name || "Selecionar franquia",
        icon: (
          <div
            style={{
              backgroundColor: defaultTheme.primary,
              height: 30,
              width: 30,
              borderRadius: 6,
            }}
          >
            <img src={Logo} alt="logo-pdv365" />
          </div>
        ),
        children: [
          {
            type: "group",
            label: (
              <Input
                onChange={debounceSearch}
                placeholder="Pesquisar franquia"
                size="large"
              />
            ),
          },
          ...items,
          {
            label: "Visão geral",
            key: "asuidhaisdh",
            onClick: () => {
              mutate({ franchise_id: null });
              setTenant(null);
              localStorage.removeItem("tenant");
            },
          },
        ],
      },
    ];

    return currentFranchise;
  }, [data, tenant, searchFranchises]);

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
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <Link to="/dashboard">
              {" "}
              <img
                src="/logoDef.svg"
                style={
                  !isMd || isSm
                    ? { height: "100%", width: data ? "70%" : "100%" }
                    : { height: 15, width: 50 }
                }
              />{" "}
            </Link>
            {franquia && localStorage.getItem("master") && (
              <Menu
                style={{
                  width: "120%",
                  marginLeft: -20,
                  borderRadius: 8,
                }}
                mode="vertical"
                items={getFranchises()}
              />
            )}
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <Link to="/dashboard">
              <img
                src="/logoWhiteDef.svg"
                style={
                  !isMd || isSm
                    ? { height: "100%", width: data ? "70%" : "100%" }
                    : { height: 15, width: 50 }
                }
              />
            </Link>
            {franquia && localStorage.getItem("master") && (
              <Menu
                style={{
                  width: "120%",
                  marginLeft: -20,
                  borderRadius: 8,
                }}
                mode="vertical"
                items={getFranchises()}
              />
            )}
          </div>
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
                  (queryClient?.getQueryData(QueryKeys.GET_ME) as any)?.name ||
                  (queryClient?.getQueryData(qK.GET_ME) as any)?.name ||
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
      stylish={{
        sider: () => ({ borderRight: "1px solid rgb(113, 113, 122, 0.2)" }),
      }}
    >
      {children}
    </ProLayout>
  );
};
