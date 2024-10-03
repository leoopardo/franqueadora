import { PageHeader } from "@components/header/pageHeader";
import TableComponent from "@components/table/tableComponent";
import {
  DocumentArrowDownIcon,
  FunnelIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import { Button, Col, Input, Row, Space, Tooltip } from "antd";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useReportsPage } from "../../../contexts/ReportPageContext";
import { Services } from "../../../services";
import {
  courtesieParams,
  courtesieType,
} from "../../../services/courtesies/__interfaces/courtesies.interface";

export const Courtesies = () => {
  const { event_id } = useParams();
  const [params, setParams] = useState<courtesieParams>({
    page: 1,
    size: 15,
    event_id,
  });
  const { data, isLoading } = Services.Courtesie.list(params);
  const { setDebounceBreadcrumbs } = useReportsPage();
  const navigate = useNavigate();

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
      <Col xs={{ span: 24 }} md={{ span: 16 }}>
        <PageHeader
          title="Cortesias"
          subtitle="Visualizar listagem de cortesias cedidas."
          total={data?.totalItems}
        />
      </Col>
      <Col xs={{ span: 24 }} md={{ span: 6 }}>
        <Input
          size="large"
          style={{ borderRadius: 36 }}
          suffix={<MagnifyingGlassIcon width={16} />}
          placeholder="Pesquisar cortesia"
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
        <TableComponent<courtesieType>
          loading={isLoading}
          data={data}
          params={params}
          setParams={setParams}
          actions={[
            {
              label: "Detalhes",
              onClick: (courtesie) => {
                navigate(`${courtesie?.courtesy_id}`, { state: courtesie });
              },
            },
          ]}
          columns={[
            { key: "courtesy_id", head: "ID" },
            { key: "operator_name", head: "Autorizado por" },
            { key: "date", head: "Data" },
            { key: "quantity", head: "Quantidade" },
            { key: "value", head: "Valor" },
          ]}
        />
      </Col>
    </Row>
  );
};
