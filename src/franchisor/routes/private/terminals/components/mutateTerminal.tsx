import { useBreakpoints } from "@hooks/useBreakpoints";
import defaultTheme from "@styles/default";
import { Card, Col, Row, Typography } from "antd";
import { motion } from "framer-motion";
import { useState } from "react";

interface MutateTerminalI {
  title: string;
  subtitle: string;
}

export const MutateTerminal = ({ subtitle, title }: MutateTerminalI) => {
  const { isSm } = useBreakpoints();
  const [width, setWidth] = useState<number>((100 / 1) * 1);
  return (
    <Row justify="center" style={{ width: "100%" }}>
      <Col
        style={{
          width: "100%",
          height: "20vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center",
        }}
        span={24}
      >
        <Row
          style={{ width: "100%", height: "100%" }}
          justify="center"
          align="middle"
        >
          <Col xs={{ span: 20 }} md={{ span: 10 }}>
            <Typography.Title level={isSm ? 5 : 3} style={{ margin: 0 }}>
              {title}
            </Typography.Title>
            <Typography.Text style={{ lineHeight: 0 }}>
              {subtitle}
            </Typography.Text>
          </Col>
        </Row>
      </Col>
      <div
        style={{
          backgroundColor: "rgb(207, 207, 207, 0.2)",
          height: 5,
          width: "100%",
        }}
      >
        <motion.div
          style={{
            width: 0,
            minHeight: 5,
            borderRadius: 25,
            backgroundColor: defaultTheme.primary,
          }}
          animate={{
            width: `${width}%`,
            transition: {
              bounce: 0.8,
              bounceDamping: 1,
              stiffness: 30,
              type: "spring",
            },
          }}
        />
      </div>
      <Card
        style={{
          maxHeight: isSm ? undefined : "70vh",
          overflowY: "auto",
          overflowX: "hidden",
          minWidth: "100%",
        }}
      >
        <Row
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Col xs={{ span: 24 }} md={{ span: 16 }}></Col>
        </Row>
      </Card>
    </Row>
  );
};
