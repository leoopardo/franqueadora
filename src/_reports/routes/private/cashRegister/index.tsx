import { CopyOutlined, EyeFilled } from "@ant-design/icons";
import { PageHeader } from "@components/header/pageHeader";
import TableComponent from "@components/table/tableComponent";
import { CheckIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Button, Col, Input, Row, Tooltip, Typography } from "antd";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useReportsPage } from "../../../contexts/ReportPageContext";
import { Services } from "../../../services";
import {
  cashRegisterParams,
  cashRegisterType,
} from "../../../services/cashRegister/__interfaces/cashRegister.interface";

export const CashRegister = () => {
  const { setDebounceBreadcrumbs } = useReportsPage();
  const { event_id } = useParams();
  const [params, setParams] = useState<cashRegisterParams>({
    page: 1,
    size: 15,
    event_id,
  });
  const { data, isLoading } = Services.cashRegister.list(params);
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
      <Col xs={{ span: 24 }} md={{ span: 12 }}>
        <PageHeader
          title="Caixas"
          subtitle="Visualizar listagem de caixas ativos."
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
        <TableComponent<cashRegisterType>
          loading={isLoading}
          data={data}
          params={params}
          setParams={setParams}
          actions={[
            {
              label: "Detalhes",
              icon: <EyeFilled style={{ fontSize: 20 }} />,
              onClick: (row) => {
                navigate(`${row?.caixa_id}`, { state: row });
              },
            },
          ]}
          columns={[
            {
              key: "caixa_id",
              head: "id",
              custom: (row, index) => {
                return (
                  <Tooltip
                    title={
                      copyRowCol === `${row.caixa_id}${index}`
                        ? "Copiado!"
                        : "Copiar"
                    }
                  >
                    <Button
                      type="link"
                      icon={
                        copyRowCol === `${row.caixa_id}${index}` ? (
                          <CheckIcon width={20} />
                        ) : (
                          <CopyOutlined />
                        )
                      }
                      onClick={() => {
                        navigator.clipboard.writeText(`${row.caixa_id}`);
                        setCopyRowCol(`${row.caixa_id}${index}`);

                        setTimeout(() => {
                          setCopyRowCol("");
                        }, 2000);
                      }}
                    />
                  </Tooltip>
                );
              },
            },
            {
              key: "opening_user_name",
              head: "Autorizado por",
              custom(row) {
                return (
                  <Row gutter={[4, 4]}>
                    <Col span={24}>
                      <Typography.Text>
                        {row?.opening_user_name}
                      </Typography.Text>
                    </Col>
                    <Col span={24}>
                      <Typography.Text style={{ color: "#71717A" }}>
                        {row?.opening_user_role}
                      </Typography.Text>
                    </Col>
                  </Row>
                );
              },
            },
            {
              key: "caixa_user_name",
              head: "Operador",
              custom(row) {
                return (
                  <Row gutter={[4, 4]}>
                    <Col span={24}>
                      <Typography.Text>{row?.caixa_user_name}</Typography.Text>
                    </Col>
                    <Col span={24}>
                      <Typography.Text style={{ color: "#71717A" }}>
                        {row?.caixa_user_role}
                      </Typography.Text>
                    </Col>
                  </Row>
                );
              },
            },
            { key: "terminal_serial", head: "Número do terminal", width: 150 },
            {
              key: "sector",
              head: "Setor",
              custom: (row, index) => {
                return (
                  <Tooltip
                    title={
                      copyRowCol === `${row.sector}${index}`
                        ? "Copiado!"
                        : "Copiar"
                    }
                  >
                    <Button
                      type="link"
                      icon={
                        copyRowCol === `${row.sector}${index}` ? (
                          <CheckIcon width={20} />
                        ) : (
                          <CopyOutlined />
                        )
                      }
                      onClick={() => {
                        navigator.clipboard.writeText(`${row.sector}`);
                        setCopyRowCol(`${row.sector}${index}`);

                        setTimeout(() => {
                          setCopyRowCol("");
                        }, 2000);
                      }}
                    />
                  </Tooltip>
                );
              },
            },
            {
              key: "sub_sector",
              head: "Sub-setor",
              custom: (row, index) => {
                return row.sub_sector ? (
                  <Tooltip
                    title={
                      copyRowCol === `${row.sub_sector}${index}`
                        ? "Copiado!"
                        : "Copiar"
                    }
                  >
                    <Button
                      type="link"
                      icon={
                        copyRowCol === `${row.sub_sector}${index}` ? (
                          <CheckIcon width={20} />
                        ) : (
                          <CopyOutlined />
                        )
                      }
                      onClick={() => {
                        navigator.clipboard.writeText(`${row.sub_sector}`);
                        setCopyRowCol(`${row.sub_sector}${index}`);

                        setTimeout(() => {
                          setCopyRowCol("");
                        }, 2000);
                      }}
                    />
                  </Tooltip>
                ) : (
                  "-"
                );
              },
              width: 100,
            },
            {
              key: "opening_date",
              head: "Abertura",
              custom(row) {
                return row.opening_date
                  ? `${new Date(row.opening_date).toLocaleDateString()} às ${new Date(row?.opening_date).toLocaleTimeString()}`
                  : "-";
              },
            },
            {
              key: "closing_date",
              head: "Fechamento",
              custom(row) {
                return row.closing_date
                  ? `${new Date(row.closing_date).toLocaleDateString()} às ${new Date(row?.closing_date).toLocaleTimeString()}`
                  : "-";
              },
            },
          ]}
        />
      </Col>
    </Row>
  );
};
