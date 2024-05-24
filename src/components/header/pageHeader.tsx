import { Typography } from "antd";

interface PageHeaderI {
  title: string;
  subtitle: string;
  color?: string;
}

export const PageHeader = ({ subtitle, title, color }: PageHeaderI) => {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <Typography.Title
        style={{
          color: color === "default" ? undefined : "#fff",
          fontWeight: "700",
          margin: 0,
        }}
      >
        {title}
      </Typography.Title>
      <Typography.Text style={{ color: color === "default" ? undefined : "#fff", margin: 0 }}>
        {subtitle}
      </Typography.Text>
    </div>
  );
};
