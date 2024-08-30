import { PageHeader } from "@components/header/pageHeader";
import { DocumentArrowDownIcon, FunnelIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Button, Col, Input, Row } from "antd";
import { useEffect } from "react";
import { useReportsPage } from "../../../contexts/ReportPageContext";

export const Courtesies = () => {
  const { setDebounceBreadcrumbs } = useReportsPage();

  useEffect(() => {
    setDebounceBreadcrumbs([
      {
        title: "Cortesias",
      },
    ]);
  }, []);

  return (
    <Row
      style={{ padding: 24, maxWidth: "100%" }}
      align="middle"
      gutter={[8, 8]}
    >
      <Col xs={{ span: 24 }} md={{ span: 12 }}>
        <PageHeader
          title="Cortesias"
          subtitle="Visualizar listagem de caixas ativos."
          //   total={data?.totalItems}
        />
      </Col>
      <Col xs={{ span: 24 }} md={{ span: 6 }}>
        <Input
          size="large"
          style={{ borderRadius: 36 }}
          suffix={<MagnifyingGlassIcon width={16} />}
          placeholder="Pesquisar evento"
        />
      </Col>
      <Col xs={{ span: 24 }} md={{ span: 3 }}>
        <Button
          size="large"
          icon={<DocumentArrowDownIcon width={22} />}
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          Exportar
        </Button>
      </Col>{" "}
      <Col xs={{ span: 24 }} md={{ span: 3 }}>
        <Button
          size="large"
          icon={<FunnelIcon width={22} />}
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          Filtros
        </Button>
      </Col>
    </Row>
  );
};
