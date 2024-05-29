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
    },
    Select: {
      controlItemBgActive: defaultTheme.primary,
      paddingContentVerticalLG: 12
    },
    Table: {
      controlItemBgActive: defaultTheme.primary,
      controlItemBgActiveHover: "#c0c0c09f",
    },
    Card: {
      boxShadow: "0px 4px 15.7px -3px rgba(0, 0, 0, 0.144)",
      boxShadowSecondary: "0px 4px 15.7px -3px rgba(0, 0, 0, 0.144)",
      boxShadowTertiary: "0px 4px 15.7px -3px rgba(0, 0, 0, 0.144)",
      colorBgContainer: "#F5F6F8"
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
