import { formatCurrency } from "@utils/regexFormat";
import { Avatar, Card, Statistic } from "antd";
import React from "react";

interface BigNumberProps {
  icon: React.ReactNode;
  title: string;
  value: string | number;
  money?: boolean;
  loading?: boolean;
  card?: boolean;
}

export const BigNumber = ({
  icon,
  title,
  value,
  money,
  loading,
  card = true,
}: BigNumberProps) => {
  return card ? (
    <Card style={{ width: "100%", height: "100%" }}>
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          gap: 16,
        }}
      >
        <Avatar size="large" shape="square" icon={icon} />
        <Statistic
          title={title}
          value={money ? formatCurrency(+value) : value}
          valueStyle={{ fontSize: 22 }}
          loading={loading}
        />
      </div>
    </Card>
  ) : (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        gap: 16,
      }}
    >
      <Avatar size="large" shape="square" icon={icon} />
      <Statistic
        title={title}
        value={money ? formatCurrency(+value) : value}
        valueStyle={{ fontSize: 22 }}
        loading={loading}
      />
    </div>
  );
};
