import { PageHeader } from "@components/header/pageHeader";
import TableComponent from "@components/table/tableComponent";
import {
  DocumentArrowDownIcon,
  FunnelIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import { formatCurrency } from "@utils/regexFormat";
import { Button, Col, Input, Row } from "antd";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useReportsPage } from "../../../contexts/ReportPageContext";
import { Services } from "../../../services";
import {
  discountParams,
  DiscountType,
} from "../../../services/discounts/__interfaces/discounts.interface";

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
      <Col xs={{ span: 24 }} md={{ span: 12 }}>
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
      <Col span={24}>
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
