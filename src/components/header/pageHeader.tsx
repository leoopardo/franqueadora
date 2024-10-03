import defaultTheme from "@styles/default";
import { Badge, Typography } from "antd";

interface PageHeaderI {
  title: string;
  subtitle: string;
  color?: string;
  total?: number;
}

export const PageHeader = ({ subtitle, title, color, total }: PageHeaderI) => {
  return (
    <div style={{ display: "flex", flexDirection: "column", marginBottom: 16 }}>
      <Typography.Title
        style={{
          color: color === "default" ? undefined : undefined,
          fontWeight: "700",
          margin: 0,
          gap: 16,
          display: "flex",
          alignItems: "center",
        }}
        level={2}
      >
        {title}{" "}
        {total && <Badge count={total || 0} color={defaultTheme.primary} />}
      </Typography.Title>
      <Typography.Text
        style={{
          color: color === "default" ? undefined : undefined,
          margin: 0,
        }}
      >
        {subtitle}
      </Typography.Text>
    </div>
  );
};
