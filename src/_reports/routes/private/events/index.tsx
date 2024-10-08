import { PageHeader } from "@components/header/pageHeader";
import TableComponent from "@components/table/tableComponent";
import {
  DocumentArrowDownIcon,
  FunnelIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import { Button, Col, Input, Row, Space, Tooltip, Typography } from "antd";
import { useEffect, useState } from "react";
import { useReportsPage } from "../../../contexts/ReportPageContext";
import { Services } from "../../../services";
import { useNavigate } from "react-router-dom";
import { Event } from "../../../services/events/__interfaces/event.interface";

export const Events = () => {
  const { setBreadcrumbs, setEventName } = useReportsPage();
  const [params, setParams] = useState({ page: 1, size: 15 });
  const { data, isLoading } = Services.event.list(params);
  const navigate = useNavigate();

  useEffect(() => {
    setBreadcrumbs([
      {
        title: "Eventos",
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
          title="Eventos"
          subtitle="Visualize listagem de eventos cadastrados."
          total={data?.totalItems}
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
        <TableComponent<Event>
          loading={isLoading}
          data={data}
          params={params}
          setParams={setParams}
          actions={[
            {
              label: "Detalhes",
              onClick: (row) => {
                setEventName(`${row?.name}`);
                navigate(`/evento/${row?.event_id}`);
              },
            },
          ]}
          columns={[
            { key: "ref_id", head: "ID" },
            {
              key: "name",
              head: "Evento",
              custom: (row) => (
                <Row gutter={[4, 4]}>
                  <Col span={24}>
                    <Typography.Text>{row?.name}</Typography.Text>
                  </Col>
                  <Col span={24}>
                    <Typography.Text style={{ color: "#71717A" }}>
                      {new Date(`${row?.date}`).toLocaleDateString()} às{" "}
                      {new Date(`${row?.date}`).toLocaleTimeString()}
                    </Typography.Text>
                  </Col>
                </Row>
              ),
              width: 300,
            },
            {
              key: "promoter_name",
              head: "Promotor",
              sortKey: "promoter_name",
              // custom: (row) => (
              //   <Row gutter={[4, 4]}>
              //     <Col span={24}>
              //       <Typography.Text>{row?.promoter_name}</Typography.Text>
              //     </Col>
              //     {/* <Col span={24}>
              //       <Typography.Text copyable style={{ color: "#71717A" }}>
              //         {formatCpfCnpj(row?.promoter_id)}
              //       </Typography.Text>
              //     </Col> */}
              //   </Row>
              // ),
            },
            {
              key: "client_name",
              head: "Cliente",
              // custom: (row) => (
              //   <Row gutter={[4, 4]}>
              //     <Col span={24}>
              //       <Typography.Text>{row?.client_name}</Typography.Text>
              //     </Col>
              //     {/* <Col span={24}>
              //       <Typography.Text copyable style={{ color: "#71717A" }}>
              //         {formatCpfCnpj(row?.promoter_id)}
              //       </Typography.Text>
              //     </Col> */}
              //   </Row>
              // ),
            },
          ]}
        />
      </Col>
    </Row>
  );
};
