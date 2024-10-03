import { PageHeader } from "@components/header/pageHeader";
import TableComponent from "@components/table/tableComponent";
import {
  BanknotesIcon,
  DocumentArrowDownIcon,
  FunnelIcon,
  GiftIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import { formatCurrency } from "@utils/regexFormat";
import { Button, Col, Input, Row, Space, Tooltip } from "antd";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useReportsPage } from "../../../contexts/ReportPageContext";
import { Services } from "../../../services";
import {
  discountParams,
  DiscountType,
} from "../../../services/discounts/__interfaces/discounts.interface";
import { BigNumber } from "../components/bigNumber";

export const Discounts = () => {
  const { event_id } = useParams();
  const [params, setParams] = useState<discountParams>({
    page: 1,
    size: 15,
    event_id,
  });
  const { data, isLoading } = Services.Discounts.list(params);
  const { setDebounceBreadcrumbs } = useReportsPage();

  useEffect(() => {
    setDebounceBreadcrumbs([
      {
        title: "Descontos",
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
          title="Descontos"
          subtitle="Visualizar listagem de descontos realizados."
          total={data?.totalItems}
        />
      </Col>
      <Col xs={{ span: 24 }} md={{ span: 6 }}>
        <Input
          size="large"
          style={{ borderRadius: 36 }}
          suffix={<MagnifyingGlassIcon width={16} />}
          placeholder="Pesquisar desconto"
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
      <Col xs={{ span: 24 }} md={{ span: 4 }}>
        <Row gutter={[8, 8]} style={{ position: "sticky", top: "0px" }}>
          <Col xs={{ span: 24 }} md={{ span: 24 }}>
            <BigNumber
              icon={<GiftIcon width={20} />}
              title="Total de descontos"
              value={data?.totalQuantity ? +data?.totalQuantity : 0}
              loading={isLoading}
            />
          </Col>
          <Col xs={{ span: 24 }} md={{ span: 24 }}>
            <BigNumber
              icon={<BanknotesIcon width={20} />}
              title="Desconto total"
              value={data?.totalValue ? +data?.totalValue : 0}
              loading={isLoading}
              money
            />
          </Col>
        </Row>
      </Col>
      <Col span={20}>
        <TableComponent<DiscountType>
          loading={isLoading}
          data={data}
          params={params}
          setParams={setParams}
          columns={[
            { key: "discount_id", head: "ID" },
            { key: "terminal_serial", head: "Número do terminal" },
            { key: "operator_name", head: "Operador" },
            {
              key: "date",
              head: "Data e hora",
              custom(row) {
                return `${new Date(`${row.date}`).toLocaleDateString()} às ${new Date(`${row.date}`).toLocaleTimeString()}`;
              },
            },
            { key: "total_products", head: "Produtos totais" },
            {
              key: "discount_value",
              head: "Desconto total",
              custom(row) {
                return formatCurrency(row?.discount_value || 0);
              },
            },
            {
              key: "total_value",
              head: "Valor total",
              custom(row) {
                return formatCurrency(row?.total_value || 0);
              },
            },
          ]}
        />
      </Col>
    </Row>
  );
};
