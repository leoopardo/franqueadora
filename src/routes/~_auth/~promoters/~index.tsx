import { createFileRoute } from "@tanstack/react-router";
import { Col, Row } from "antd";
import { PageHeader } from "../../../components/header/pageHeader";

export const Route = createFileRoute("/_auth/promoters/")({
  component: Promoters,
});

function Promoters() {
  return (
    <Row gutter={[8, 8]} style={{ width: "100%" }}>
      <Row gutter={[8, 8]} style={{ width: "100%" }} align="middle">
        <Col xs={{ span: 24 }} md={{ span: 14 }}>
          <PageHeader
            title="Promotores"
            subtitle="Visualize e gerencie todas os promotores cadastrados."
          />
        </Col>
      </Row>
    </Row>
  );
}
