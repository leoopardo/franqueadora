import { Typography } from "antd";

interface PageHeaderI {
  title: string;
  subtitle: string;
}

export const PageHeader = ({ subtitle, title }: PageHeaderI) => {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <Typography.Title style={{ color: "#fff", fontWeight: "700", margin: 0 }}>
        {title}
      </Typography.Title>
      <Typography.Text style={{ color: "#fff", margin: 0 }}>
        {subtitle}
      </Typography.Text>
    </div>
  );
};
