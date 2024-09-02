import { CopyOutlined, EyeFilled } from "@ant-design/icons";
import { PageHeader } from "@components/header/pageHeader";
import TableComponent from "@components/table/tableComponent";
import {
  CheckIcon,
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
  waiterParams,
  waiterType,
} from "../../../services/waiters/__interfaces/waiter.interface";
import { formatCurrency } from "@utils/regexFormat";

export const Waiters = () => {
  const { setDebounceBreadcrumbs } = useReportsPage();
  const { event_id } = useParams();
  const [params, setParams] = useState<waiterParams>({
    page: 1,
    size: 15,
    event_id,
  });
  const { data, isLoading } = Services.Waiters.list(params);
  const [copyRowCol, setCopyRowCol] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    setDebounceBreadcrumbs([
      {
        title: "Caixas",
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
          title="Garçons"
          subtitle="Visualizar listagem de garçons do evento."
          total={data?.totalItems}
        />
      </Col>
      <Col xs={{ span: 24 }} md={{ span: 6 }}>
        <Input
          size="large"
          style={{ borderRadius: 36 }}
          suffix={<MagnifyingGlassIcon width={16} />}
          placeholder="Pesquisar caixa"
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
        <TableComponent<waiterType>
          loading={isLoading}
          data={data}
          params={params}
          setParams={setParams}
          actions={[
            {
              label: "Detalhes",
              icon: <EyeFilled style={{ fontSize: 20 }} />,
              onClick: (row) => {
                navigate(`${row?.id}`, { state: row });
              },
            },
          ]}
          columns={[
            {
              key: "id",
              head: "ID",
              custom: (row, index) => {
                return (
                  <>
                    {" "}
                    {row.id}
                    <Tooltip
                      title={
                        copyRowCol === `${row.id}${index}`
                          ? "Copiado!"
                          : "Copiar"
                      }
                    >
                      <Button
                        type="link"
                        icon={
                          copyRowCol === `${row.id}${index}` ? (
                            <CheckIcon width={20} />
                          ) : (
                            <CopyOutlined />
                          )
                        }
                        onClick={() => {
                          navigator.clipboard.writeText(`${row.id}`);
                          setCopyRowCol(`${row.id}${index}`);

                          setTimeout(() => {
                            setCopyRowCol("");
                          }, 2000);
                        }}
                      />
                    </Tooltip>
                  </>
                );
              },
              width: 100,
            },
            { key: "name", head: "Nome" },
            {
              key: "waiter_sale",
              head: "Vendas",
              custom(row) {
                return formatCurrency(row?.waiter_sale ? +row?.waiter_sale : 0);
              },
            },
            {
              key: "waiter_fee",
              head: "Comissão",
              custom(row) {
                return formatCurrency(row?.waiter_fee ? +row?.waiter_fee : 0);
              },
            },
          ]}
        />
      </Col>
    </Row>
  );
};
