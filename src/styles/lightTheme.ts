import { ThemeConfig } from "antd";
import defaultTheme from "./default";

const Light: ThemeConfig = {
  components: {
    Alert: {
      colorError: "#000",
      colorText: "#000",
    },
    Breadcrumb: {
      colorFill: "#fff",
      colorPrimary: "#000",
      colorTextLabel: "#000",
      lastItemColor: "#fff",
      linkHoverColor: "#ffffff",
    },
    Menu: {
      colorTextLightSolid: "#000",
      controlItemBgActive: defaultTheme["primary-200"],
      controlItemBgHover: defaultTheme["primary-300"],
      itemHoverBg: defaultTheme["primary-500"],
    },
    Typography: { colorTextHeading: "#272727"},
    Tooltip: {
      colorTextLightSolid: "#fff",
    },
    DatePicker: {
      controlItemBgActive: defaultTheme.primary,
      padding: 0,
      margin: 0,
      paddingXS: 5,
    },
    FloatButton: { colorBgElevated: "#e4e4e4" },

    Button: {
      colorTextLightSolid:
        import.meta.env.VITE_APP_BUTTON === "dark"
          ? "rgba(0, 0, 0, 0.88)"
          : "#fff",
          boxShadowSecondary: "none",
          primaryShadow: "none",
          dangerShadow: "none",
    },
    Select: {
      controlItemBgActive: defaultTheme["primary-300"],
      paddingContentVerticalLG: 12,
    },
    Table: {
      controlItemBgActive: defaultTheme["primary-200"],
      controlItemBgActiveHover: defaultTheme["primary-300"],
    },
    Card: {
      boxShadow: "0px 4px 15.7px -3px rgba(0, 0, 0, 0.144)",
      boxShadowSecondary: "0px 4px 15.7px -3px rgba(0, 0, 0, 0.144)",
      boxShadowTertiary: "0px 4px 15.7px -3px rgba(0, 0, 0, 0.144)",
      colorBgContainer: "#ffffff"
    },
    Layout: {
      colorBgHeader: "#fdfdfd",
    },
    Segmented: {
      colorBgElevated: defaultTheme.primary,
      colorBgLayout: "#f1f1f1",
    },
    Badge: {
      colorError: import.meta.env.VITE_APP_COLOR_SECONDARY,
    },
    Spin: { colorPrimary: defaultTheme.primary },
    
    
  },

  token: {
    colorPrimary: defaultTheme.primary,
    colorBgTextHover: defaultTheme.primary,
    colorBgContainer: "#ffffff",

    colorBgLayout: "#F5F6F8",
    colorText: "rgba(0, 0, 0, 0.88)",
    colorTextHeading: "rgba(0, 0, 0, 0.88)",
    colorTextLightSolid: "rgba(0, 0, 0, 0.88)",
    colorTextBase: "rgba(0, 0, 0, 0.88)",
    colorTextLabel: "rgba(0, 0, 0, 0.88)",

    colorBgElevated: "#ffffff",
    colorBorder: "#ACACAC",
    colorInfoBorder: "#ACACAC",
    colorBorderSecondary: "#f5f5f5",
    fontFamily: "Inter"
  },
};

export default Light;
