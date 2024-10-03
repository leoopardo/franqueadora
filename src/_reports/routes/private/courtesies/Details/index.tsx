import { PageHeader } from "@components/header/pageHeader";
import TableComponent from "@components/table/tableComponent";
import {
  BanknotesIcon,
  ChevronLeftIcon,
  GiftIcon,
} from "@heroicons/react/24/outline";
import { formatCurrency } from "@utils/regexFormat";
import { Button, Col, Row } from "antd";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useReportsPage } from "../../../../contexts/ReportPageContext";
import { Services } from "../../../../services";
import ParamsI from "../../../../services/__interfaces/queryParams.interface";
import { courtesyType } from "../../../../services/courtesies/__interfaces/getCourtesie.interface";
import { BigNumber } from "../../components/bigNumber";

export const CoutersieDetails = () => {
  const { state } = useLocation();
  const { setDebounceBreadcrumbs } = useReportsPage();
  const [params, setParams] = useState<ParamsI>({
    page: 1,
    size: 15,
  });
  const { event_id, id } = useParams();
  const { data, isLoading } = Services.Courtesie.getById(
    `${event_id}`,
    `${id}`
  );

  const navigate = useNavigate();
  useEffect(() => {
    setDebounceBreadcrumbs([
      {
        title: "Caixas",
        href: `/evento/${event_id}/cortesias`,
      },
      {
        title: state?.operator_name
          ? `Cortesias por: ${state?.operator_name}`
          : "Detalhes da cortesia",
      },
    ]);
  }, []);

  return (
    <Row style={{ padding: 24, maxWidth: "100%" }} align="top" gutter={[8, 8]}>
      <Col xs={{ span: 2 }} md={{ span: 1 }}>
        <Button
          type="text"
          size="large"
          style={{ width: "100%" }}
          icon={<ChevronLeftIcon width={20} />}
          onClick={() => navigate(-1)}
        />
      </Col>
      <Col xs={{ span: 22 }} md={{ span: 17 }}>
        <PageHeader
          title={`${state?.operator_name} `}
          subtitle={`Visualize os detalhes das cortesias cedidas pelo operador.`}
        />
      </Col>
      <Col xs={{ span: 24 }} md={{ span: 3 }}>
        <Button size="large" style={{ width: "100%" }}>
          Exportar
        </Button>
      </Col>{" "}
      <Col xs={{ span: 24 }} md={{ span: 3 }}>
        <Button size="large" style={{ width: "100%" }}>
          Filtros
        </Button>
      </Col>
      <Col xs={{ span: 24 }} md={{ span: 12 }}>
        <BigNumber
          icon={<GiftIcon width={20} />}
          title="Cortesias realizadas"
          value={data ? data.courtesie_quantity : 0}
          loading={isLoading}
        />
      </Col>
      <Col xs={{ span: 24 }} md={{ span: 12 }}>
        <BigNumber
          icon={<BanknotesIcon width={20} />}
          title="Valor de cortesias"
          value={data ? data.total_courtesie : 0}
          money
          loading={isLoading}
        />
      </Col>
      <Col xs={{ span: 24 }}>
        <TableComponent<courtesyType>
          loading={isLoading}
          data={data}
          params={params}
          setParams={setParams}
          columns={[
            { key: "id", head: "ID" },
            { key: "product_name", head: "Nome do produto" },
            { key: "quantity", head: "Quantidade" },
            {
              key: "value_total",
              head: "Valor",
              custom(row) {
                return formatCurrency(row.value_total);
              },
            },
          ]}
        />
      </Col>
    </Row>
  );
};
