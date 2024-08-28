import { formatCurrency } from "@utils/regexFormat";
import { Avatar, Card, Col, Row, Statistic } from "antd";
import React from "react";

interface BigNumberProps {
  icon: React.ReactNode;
  title: string;
  value: string | number;
  money?: boolean;
  loading?: boolean;
}

export const BigNumber = ({
  icon,
  title,
  value,
  money,
  loading,
}: BigNumberProps) => {
  return (
    <Card style={{ width: "100%", height: "100%" }}>
      <Row gutter={[8, 8]} align="middle">
        <Col sm={{ span: 8 }} md={{ span: 8 }}>
          <Avatar size="large" shape="square" icon={icon} />
        </Col>
        <Col sm={{ span: 16 }} md={{ span: 16 }}>
          <Statistic
            title={title}
            value={money ? formatCurrency(+value) : value}
            valueStyle={{ fontSize: 22 }}
            loading={loading}
          />
        </Col>
      </Row>
    </Card>
  );
};
