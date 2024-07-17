import { LoadingOutlined } from "@ant-design/icons";
import { useBreakpoints } from "@hooks/useBreakpoints";
import { Layout, Spin } from "antd";
import { useTheme } from "../../../../contexts/themeContext";

export const Loading = () => {
  const { theme } = useTheme();
  const { isMd, isSm } = useBreakpoints();
  return (
    <Layout
      style={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {theme === "light" ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: 8,
          }}
        >
          <img
            src="/logoDef.svg"
            style={
              !isMd || isSm
                ? { height: 45, width: 150 }
                : { height: 15, width: 50 }
            }
          />
          <Spin size="large" indicator={<LoadingOutlined size={40} spin />} />
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: 8,
          }}
        >
          <img
            src="/logoWhiteDef.svg"
            style={
              !isMd || isSm
                ? { height: 45, width: 150 }
                : { height: 15, width: 50 }
            }
          />
          <Spin size="large" indicator={<LoadingOutlined size={40} spin />} />
        </div>
      )}
    </Layout>
  );
};
