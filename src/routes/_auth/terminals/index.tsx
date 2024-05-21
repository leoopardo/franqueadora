import { createFileRoute } from '@tanstack/react-router'
import { Col, Row } from 'antd';
import { PageHeader } from '../../../components/header/pageHeader';

export const Route = createFileRoute('/_auth/terminals/')({
  component: Terminals
})

function Terminals() {
  return (
    <Row gutter={[8, 8]} style={{ width: "100%" }}>
      <Row gutter={[8, 8]} style={{ width: "100%" }} align="middle">
        <Col xs={{ span: 24 }} md={{ span: 14 }}>
          <PageHeader
            title="Terminais"
            subtitle="Visualize e gerencie todos os terminais cadastrados."
          />
        </Col>
      </Row>
    </Row>
  );
}