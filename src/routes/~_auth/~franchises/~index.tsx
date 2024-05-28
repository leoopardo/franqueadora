import { BuildingStorefrontIcon } from "@heroicons/react/24/outline";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Button, Col, Input, Row } from "antd";
import { useState } from "react";
import { PageHeader } from "../../../components/header/pageHeader";
import {
  ColumnInterface,
  TableComponent,
} from "../../../components/table/table";
import data from "./mock.json";
import { ProCard } from "@ant-design/pro-components";

export const Route = createFileRoute("/_auth/franchises/")({
  component: Franchises,
});

function Franchises() {
  const [franchises] = useState(data);
  const navigate = useNavigate();
  const [query, setQuery] = useState({
    page: 1,
    limit: 50,
  });
  const columns: ColumnInterface[] = [
    { name: "active", type: "status", head: "Status" },
    { name: "id", type: "", head: "ID" },
    {
      name: "company_name",
      type: "",
      head: "Franquia",
      filters: [{ value: "aassasa", text: "aassasa" }],
    },
  ];

  return (
    <Row gutter={[8, 8]} style={{ width: "100%" }}>
      <Row gutter={[8, 8]} style={{ width: "100%" }} align="middle">
        <Col xs={{ span: 24 }} md={{ span: 14 }}>
          <PageHeader
            title="Franquias"
            subtitle="Visualize e gerencie todas as franquias cadastradas."
          />
        </Col>
        <Col xs={{ span: 24 }} md={{ span: 6 }}>
          <Input.Search size="large" placeholder="Buscar franquias" />
        </Col>
        <Col xs={{ span: 24 }} md={{ span: 4 }}>
          <Button
            shape="round"
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            size="large"
            type="primary"
            icon={<BuildingStorefrontIcon width={24} />}
            onClick={() => navigate({ to: "/franchises/create" })}
          >
            Cadastrar franquia
          </Button>
        </Col>
      </Row>{" "}
      <Col span={24} style={{ marginTop: 24 }}>
        <TableComponent
          columns={columns}
          data={franchises}
          items={franchises.items}
          loading={false}
          query={query}
          setQuery={setQuery}
        />
      </Col>
    </Row>
  );
}
