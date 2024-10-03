import { PageHeader } from "@components/header/pageHeader";
import TableComponent from "@components/table/tableComponent";
import {
  ArrowUturnLeftIcon,
  BanknotesIcon,
  ChevronLeftIcon,
  CurrencyDollarIcon,
  ReceiptPercentIcon,
  TicketIcon,
  UserMinusIcon,
} from "@heroicons/react/24/outline";
import { useBreakpoints } from "@hooks/useBreakpoints";
import { formatCurrency } from "@utils/regexFormat";
import { Button, Card, Col, Row, Typography } from "antd";
import ReactECharts from "echarts-for-react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useReportsPage } from "../../../../contexts/ReportPageContext";
import { Services } from "../../../../services";
import ParamsI from "../../../../services/__interfaces/queryParams.interface";
import {
  ProductsSoldData,
  ReturnsData,
} from "../../../../services/cashRegister/__interfaces/overview.interface";
import { BigNumber } from "../../components/bigNumber";

const methodLegends: any = {
  pix_value: "PIX",
  money_value: "Dinheiro",
  credit_card_value: "Cartão de crédito",
  debit_card_value: "Cartão de débito",
  cashless_payments: "Cartão cashless",
  others_total: "Outros",
  total_value: "Total",
};

export const OperatorDetails = () => {
  const { state } = useLocation();
  const { setDebounceBreadcrumbs } = useReportsPage();
  const [params, setParams] = useState<ParamsI>({
    page: 1,
    size: 15,
  });
  const { event_id, id } = useParams();
  const { isSm } = useBreakpoints();
  const { data, isLoading } = Services.Operators.byId(`${event_id}`, `${id}`);

  const navigate = useNavigate();
  useEffect(() => {
    setDebounceBreadcrumbs([
      {
        title: "Operadores",
        href: `/evento/${event_id}/operadores`,
      },
      {
        title: state?.name
          ? `Operador: ${state?.name}`
          : "Detalhes do operador",
      },
    ]);
  }, []);

  console.log(data);

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
          title={`${state?.name} `}
          subtitle={`Visualize os principais dados do operador no evento.`}
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
      <Col xs={{ span: 24 }} md={{ span: 24 }} xl={{ span: 10 }}>
        <Card>
          <Typography.Title level={5} italic>
            Métodos de pagamento
          </Typography.Title>
          <ReactECharts
            style={{ marginTop: -35, marginLeft: isSm ? "0" : "-50%" }}
            option={{
              tooltip: {
                trigger: "item",
                backgroundColor: "#000",
                textStyle: {
                  color: "#fff",
                },
                formatter: (params: any) => {
                  const { name, value } = params;
                  return `${methodLegends[name]}: ${formatCurrency(value)}`;
                },
              },
              legend: {
                top: isSm ? "90%" : "center", // Move the legend below the chart on small screens
                left: isSm ? "center" : "70%", // Center the legend on small screens
                orient: isSm ? "horizontal" : "vertical", // Change the orientation based on screen size
                show: !isSm,
                itemGap: 20,
                textStyle: {
                  color: "#fff",
                  fontSize: 16,
                },
                formatter: (name: any) => {
                  const value = (data?.paymentMethods as any)[name];
                  return `${methodLegends[name]} - ${formatCurrency(value)}`;
                },
              },
              series: [
                {
                  name: "",
                  type: "pie",
                  radius: ["58%", "75%"],
                  avoidLabelOverlap: false,

                  label: {
                    show: true,
                    position: "center",
                    fontSize: 22,
                    fontWeight: "regular",
                    color: "#fff",

                    formatter: () => {
                      const totalValue = (data?.paymentMethods as any)[
                        "total_value"
                      ];
                      return `${formatCurrency(totalValue || 0)}`;
                    },
                  },
                  labelLine: {
                    show: false,
                  },
                  left: "0%",
                  data:
                    data &&
                    !isLoading &&
                    Object.keys(data?.paymentMethods)
                      .filter(
                        (i) =>
                          !i.includes("percentage") &&
                          i !== "total_value" &&
                          i !== "average_ticket"
                      )
                      .map((i) => ({
                        name: i,
                        value: (data?.paymentMethods as any)[i],
                      })),
                },
              ],
            }}
            opts={{ renderer: "svg" }}
            lazyUpdate
          />
        </Card>
      </Col>
      <Col xs={{ span: 24 }} md={{ span: 24 }} xl={{ span: 14 }}>
        <Row style={{ width: "100%" }} align={"top"} gutter={[8, 8]}>
          <Col xs={{ span: 24 }} md={{ span: 12 }}>
            <BigNumber
              icon={<CurrencyDollarIcon width={20} />}
              title="Total de vendas"
              value={data ? data?.totals.sold_total : 0}
              money
              loading={isLoading}
            />
          </Col>
          <Col xs={{ span: 24 }} md={{ span: 12 }}>
            <BigNumber
              icon={<BanknotesIcon width={20} />}
              title="Ticket médio"
              value={data ? data?.totals.median_ticket : 0}
              money
              loading={isLoading}
            />
          </Col>
          <Col xs={{ span: 24 }} md={{ span: 12 }}>
            <BigNumber
              icon={<UserMinusIcon width={20} />}
              title="Comissão do garçom"
              value={data ? data?.totals.waiter_fee : 0}
              money
              loading={isLoading}
            />
          </Col>
          <Col xs={{ span: 24 }} md={{ span: 12 }}>
            <BigNumber
              icon={<ReceiptPercentIcon width={20} />}
              title="Descontos"
              value={data ? data?.totals.discount_total : 0}
              money
              loading={isLoading}
            />
          </Col>
          <Col xs={{ span: 24 }} md={{ span: 12 }}>
            <BigNumber
              icon={<ArrowUturnLeftIcon width={20} />}
              title="Estornos realizados"
              value={data ? data?.totals.refund_total : 0}
              money
              loading={isLoading}
            />
          </Col>
          <Col xs={{ span: 24 }} md={{ span: 12 }}>
            <BigNumber
              icon={<TicketIcon width={20} />}
              title="Fichas de consumo"
              value={data ? data?.totals.ticket_value : 0}
              money
              loading={isLoading}
            />
          </Col>
        </Row>
      </Col>
      <Col xs={{ span: 24 }} lg={{ span: 12 }}>
        <Card>
          <Row gutter={[8, 8]}>
            <Col xs={{ span: 24 }}>
              <BigNumber
                icon={<BanknotesIcon width={20} />}
                title="Produtos vendidos"
                value={data ? `${data?.productSold?.totalValue}` : 0}
                money
                loading={isLoading}
                card={false}
              />
            </Col>
            <Col xs={{ span: 24 }}>
              <TableComponent<ProductsSoldData>
                loading={isLoading}
                data={data?.productSold}
                params={params}
                setParams={setParams}
                columns={[
                  { key: "name", head: "Nome" },
                  { key: "quantity", head: "Quantidade" },
                  {
                    key: "total",
                    head: "Total",
                    custom: (row) => formatCurrency(+row.total),
                  },
                ]}
              />
            </Col>
          </Row>
        </Card>
      </Col>
      <Col xs={{ span: 24 }} lg={{ span: 12 }}>
        <Card>
          <Row gutter={[8, 8]}>
            <Col xs={{ span: 24 }}>
              <BigNumber
                icon={<BanknotesIcon width={20} />}
                title="Produtos devolvidos"
                value={data ? `${data?.returnsTotals?.totalValue}` : 0}
                money
                loading={isLoading}
                card={false}
              />
            </Col>
            <Col xs={{ span: 24 }}>
              <TableComponent<ReturnsData>
                loading={isLoading}
                data={data?.returnsTotals}
                params={params}
                setParams={setParams}
                columns={[
                  { key: "name", head: "Nome" },
                  { key: "quantity", head: "Quantidade" },
                  {
                    key: "total",
                    head: "Total",
                    custom: (row) => formatCurrency(+row.total),
                  },
                ]}
              />
            </Col>
          </Row>
        </Card>
      </Col>
      <Col xs={{ span: 24 }} lg={{ span: 12 }}>
        <Card>
          <Row gutter={[8, 8]}>
            <Col xs={{ span: 24 }}>
              <BigNumber
                icon={<BanknotesIcon width={20} />}
                title="Produtos cortesia"
                value={data ? `${data?.productSoldCourtesies?.totalValue}` : 0}
                money
                loading={isLoading}
                card={false}
              />
            </Col>
            <Col xs={{ span: 24 }}>
              <TableComponent<ReturnsData>
                loading={isLoading}
                data={data?.productSoldCourtesies}
                params={params}
                setParams={setParams}
                columns={[
                  { key: "name", head: "Nome" },
                  { key: "quantity", head: "Quantidade" },
                  {
                    key: "total",
                    head: "Total",
                    custom: (row) => formatCurrency(+row.total),
                  },
                ]}
              />
            </Col>
          </Row>
        </Card>
      </Col>
      <Col xs={{ span: 24 }} lg={{ span: 12 }}>
        <Card style={{ minHeight: "100%" }}>
          <Row gutter={[8, 8]}>
            <Col xs={{ span: 24 }}>
              <BigNumber
                icon={<TicketIcon width={20} />}
                title="Produtos reimpressos"
                value={data ? `${data?.reprintsTotals?.totalValue}` : 0}
                money
                loading={isLoading}
                card={false}
              />
            </Col>
            <Col xs={{ span: 24 }}>
              <TableComponent<ReturnsData>
                loading={isLoading}
                data={data?.reprintsTotals}
                params={params}
                setParams={setParams}
                columns={[
                  { key: "name", head: "Nome" },
                  { key: "quantity", head: "Quantidade" },
                  {
                    key: "total",
                    head: "Total",
                    custom: (row) => formatCurrency(+row.total),
                  },
                ]}
              />
            </Col>
          </Row>
        </Card>
      </Col>
    </Row>
  );
};
