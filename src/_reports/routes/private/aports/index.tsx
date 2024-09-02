import { PageHeader } from "@components/header/pageHeader";
import TableComponent from "@components/table/tableComponent";
import {
  DocumentArrowDownIcon,
  FunnelIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import { formatCurrency } from "@utils/regexFormat";
import { Button, Col, Input, Row, Space, Tooltip, Typography } from "antd";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useReportsPage } from "../../../contexts/ReportPageContext";
import { Services } from "../../../services";
import {
  contributionsInParams,
  contributionsInType,
} from "../../../services/contributionsIn/_interfaces/contributionsIn.interface";

export const Aports = () => {
  const { setDebounceBreadcrumbs } = useReportsPage();
  const { event_id } = useParams();
  const [params, setParams] = useState<contributionsInParams>({
    page: 1,
    size: 15,
    event_id,
  });
  const { data, isLoading } = Services.contributionsIn.list(params);

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
      <Col xs={{ span: 24 }} md={{ span: 16 }}>
        <PageHeader
          title="Aportes"
          subtitle="Visualize listagem de aportes realizados."
          total={data?.totalItems}
        />
      </Col>
      <Col xs={{ span: 24 }} md={{ span: 6 }}>
        <Input
          size="large"
          style={{ borderRadius: 36 }}
          suffix={<MagnifyingGlassIcon width={16} />}
          placeholder="Pesquisar aporte"
        />
      </Col>
      <Col xs={{ span: 24 }} md={{ span: 2 }}>
        <Space.Compact size="large" block>
          <Tooltip title="Filtrar">
            <Button
              size="large"
              icon={<FunnelIcon width={22} />}
              shape="round"
              style={{
                width: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            />
          </Tooltip>
          <Tooltip title="Exportar relatório">
            <Button
              size="large"
              icon={<DocumentArrowDownIcon width={22} />}
              shape="round"
              type="primary"
              style={{
                width: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            ></Button>
          </Tooltip>
        </Space.Compact>
      </Col>

      <Col span={24}>
        <TableComponent<contributionsInType>
          loading={isLoading}
          data={data}
          params={params}
          setParams={setParams}
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
