import { ThemeConfig } from "antd";
import defaultTheme from "./default";

const Dark: ThemeConfig = {
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
      colorTextLightSolid: "#fff",
    },
    Tooltip: {
      colorTextLightSolid: "#000",
    },
    DatePicker: {
      controlItemBgActive: "#303030",
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
          controlHeightLG: 38 
    },
    Select: {
      controlItemBgActive: "#303030",
    },
    Table: {
      controlItemBgActive: defaultTheme.primary,
      controlItemBgActiveHover: "#c0c0c09f",
    },
    Card: {
      boxShadow: "0px 4px 15.7px -3px rgba(0, 0, 0, 0.25)",
      boxShadowSecondary: "0px 4px 15.7px -3px rgba(0, 0, 0, 0.25)",
      boxShadowTertiary: "0px 4px 15.7px -3px rgba(0, 0, 0, 0.25)",
      colorBgContainer: "#1b1c1e",
    },
    Layout: {
      colorBgHeader: "#18191B",
    },
    Segmented: {
      colorBgElevated: defaultTheme.primary,
      colorBgLayout: "#272727",
    },
    Badge: {
      colorError: import.meta.env.VITE_APP_COLOR_SECONDARY,
    },
    Input: { controlHeightLG: 38 },
  },

  token: {
    colorPrimary: defaultTheme.primary,
    colorBgTextHover: defaultTheme.primary,
    colorBgContainer: "#18191B",

    colorBgLayout: "#18191B",
    colorText: "#f5f5f5",
    colorTextHeading: "#f5f5f5",
    colorTextLightSolid: "#ffffff",
    colorTextBase: "#f5f5f5",
    colorTextLabel: "#f5f5f5",

    colorBgElevated: "#18191B",
    colorBorder: "#ACACAC",
    colorInfoBorder: "#ACACAC",
    colorBorderSecondary: "#353535",
    fontFamily: "Inter",
  },
};

export default Dark;
