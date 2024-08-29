import { LogoutOutlined, UserOutlined } from "@ant-design/icons";
import { ProLayout } from "@ant-design/pro-components";
import { useBreakpoints } from "@hooks/useBreakpoints";
import { Breadcrumb, Col, Dropdown, Row, Tabs } from "antd";
import { useEffect } from "react";
import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import secureLocalStorage from "react-secure-storage";
import { useReportsAuth } from "../../../../../contexts/reportsAuthContext";
import { useReportsPage } from "../../../../contexts/ReportPageContext";
import { congnitoAuthService } from "../../../../services/auth/CognitoAuthService";
import { useGetMe } from "../../../../services/auth/useGetMe";
import { Menus } from "./menus";
export const ReportsBaseLayout = () => {
  const { breadcrumbs, setBreadcrumbs } = useReportsPage();
  const { refetch } = useGetMe();
  const { setHeader } = useReportsAuth();
  const { isSm } = useBreakpoints();
  const navigate = useNavigate();
  const location = useLocation();
  const { event_id, id } = useParams();

  useEffect(() => {
    if (location.pathname === "/") {
      navigate("/eventos");
    }
  }, []);

  useEffect(() => {
    setBreadcrumbs([]);
  }, [location]);

  return (
    <ProLayout
      pageTitleRender={false}
      contentStyle={{
        padding: 0,
        margin: 0,
        display: "flex",
        justifyContent: "center",
      }}
      style={{}}
      layout="top"
      headerTitleRender={(logo) => {
        return (
          <div style={{ display: "flex", gap: 16 }}>
            {logo}
            <Breadcrumb items={breadcrumbs} style={{ width: 500 }} />
          </div>
        );
      }}
      avatarProps={{
        icon: <UserOutlined />,
        shape: "square",
        render: (_props, avatar) => (
          <Dropdown
            menu={{
              items: [
                {
                  key: "logout",
                  label: "Sair da conta",
                  icon: <LogoutOutlined />,
                  onClick: async () => {
                    await congnitoAuthService.signOut();
                    setHeader(null);
                    secureLocalStorage.clear();
                    localStorage.removeItem("master");
                    setTimeout(() => {
                      refetch();
                    }, 500);
                  },
                },
              ],
            }}
            placement="bottomRight"
            arrow
          >
            {avatar}
          </Dropdown>
        ),
      }}
      logo={
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {/* <Link to="/dashboard"> */}
            <img
              src="/logoWhiteDef.svg"
              style={
                isSm
                  ? { height: "100%", width: "70%" }
                  : { height: "100%", width: "90%" }
              }
            />
            {/* </Link> */}
          </div>
        </div>
      }
      title=""
    >
      {event_id && !id && (
        <Row style={{}}>
          <Col span={24}>
            <Tabs
              size="large"
              tabBarStyle={{ padding: "16px 32px 0px 32px" }}
              onChange={(key) => {
                if (key === "visao-geral") {
                  navigate(`/evento/${event_id}`);
                  return;
                }
                navigate(`/evento/${event_id}/${key}`);
              }}
              defaultActiveKey={location.pathname.split("/")[3] || undefined}
              items={Menus}
            />
          </Col>
        </Row>
      )}

      <Outlet />
    </ProLayout>
  );
};
