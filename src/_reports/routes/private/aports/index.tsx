import { PageHeader } from "@components/header/pageHeader";
import TableComponent from "@components/table/tableComponent";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Button, Col, Input, Row, Typography } from "antd";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useReportsPage } from "../../../contexts/ReportPageContext";
import { Services } from "../../../services";
import {
  contributionsInType,
  contributionsInParams,
} from "../../../services/contributionsIn/_interfaces/contributionsIn.interface";
import { formatCurrency } from "@utils/regexFormat";

export const Aports = () => {
  const { setDebounceBreadcrumbs } = useReportsPage();
  const { event_id } = useParams();
  const [params, setParams] = useState<contributionsInParams>({
    page: 1,
    size: 15,
    event_id,
  });
  const { data, isLoading } = Services.contributionsIn.list(params);
  const navigate = useNavigate();

  useEffect(() => {
    setDebounceBreadcrumbs([
      {
        title: "Aportes",
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
          title="Aportes"
          subtitle="Visualize listagem de aportes realizados."
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
        <Button type="primary" size="large" style={{ width: "100%" }}>
          Exportar
        </Button>
      </Col>{" "}
      <Col xs={{ span: 24 }} md={{ span: 3 }}>
        <Button size="large" style={{ width: "100%" }}>
          Filtros
        </Button>
      </Col>
      <Col span={24}>
        <TableComponent<contributionsInType>
          loading={isLoading}
          data={data}
          params={params}
          setParams={setParams}
          actions={[
            {
              label: "Detalhes",
              onClick: (row) => navigate(`${row?.contribution_id}`),
            },
          ]}
          columns={[
            { key: "operator_name", head: "Autorizado por" },
            {
              key: "terminal_serial",
              head: "Número do terminal",
              custom(row) {
                return (
                  <Typography.Text copyable>
                    {row.terminal_serial}
                  </Typography.Text>
                );
              },
            },
            { key: "sector_name", head: "Setor" },

            {
              key: "date",
              head: "Data",
              custom(row) {
                return row.date
                  ? `${new Date(row.date).toLocaleDateString()} às ${new Date(row?.date).toLocaleTimeString()}`
                  : "-";
              },
            },
            {
              key: "value",
              head: "Valor",
              custom(row) {
                return formatCurrency(row.value || 0);
              },
            },
          ]}
        />
      </Col>
    </Row>
  );
};
