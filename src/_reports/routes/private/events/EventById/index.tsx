import { PageHeader } from "@components/header/pageHeader";
import {
  ArrowPathIcon,
  ArrowUturnLeftIcon,
  BanknotesIcon,
  DocumentMinusIcon,
  DocumentPlusIcon,
  ReceiptPercentIcon,
  TicketIcon,
  UserIcon,
  UserMinusIcon,
} from "@heroicons/react/24/outline";
import { useBreakpoints } from "@hooks/useBreakpoints";
import { formatCurrency } from "@utils/regexFormat";
import { Button, Card, Col, Row, Typography } from "antd";
import ReactECharts from "echarts-for-react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useReportsPage } from "../../../../contexts/ReportPageContext";
import { Services } from "../../../../services";
import { BigNumber } from "../../components/bigNumber";

export const EventById = () => {
  const { setDebounceBreadcrumbs } = useReportsPage();
  // const [params, setParams] = useState({ page: 1, size: 15 });
  const { event_id } = useParams();
  const { data, isLoading } = Services.event.getById(`${event_id}`);
  const { isSm } = useBreakpoints();

  const methodLegends: any = {
    pix_value: "PIX",
    money_value: "Dinheiro",
    credit_card_value: "Cartão de crédito",
    debit_card_value: "Cartão de débito",
    others_value: "Outros",
    total_value: "Total",
  };

  useEffect(() => {
    setDebounceBreadcrumbs([]);
  }, []);

  return (
    <Row
      style={{ padding: 24, maxWidth: "100%" }}
      align="middle"
      gutter={[8, 8]}
    >
      <Col xs={{ span: 24 }} md={{ span: 18 }}>
        <PageHeader
          title="Módulo bar"
          subtitle="Visualize as informações gerais do módulo bar."
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
            style={{ marginTop: -30, marginLeft: isSm ? "0" : "-50%" }}
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
                  const value = data[1][name];
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
                      const totalValue = data[1]["total_value"];
                      return `${formatCurrency(totalValue)}`;
                    },
                  },
                  labelLine: {
                    show: false,
                  },
                  left: "0%",
                  data:
                    data &&
                    !isLoading &&
                    Object.keys(data[1])
                      .filter(
                        (i) => !i.includes("percentage") && i !== "total_value"
                      )
                      .map((i) => ({
                        name: i,
                        value: data[1][i],
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
          <Col xs={{ span: 24 }} md={{ span: 8 }}>
            <BigNumber
              icon={<BanknotesIcon width={20} />}
              title="Ticket médio"
              value={data ? data[2]?.median_ticket : 0}
              money
              loading={isLoading}
            />
          </Col>
          <Col xs={{ span: 24 }} md={{ span: 8 }}>
            <BigNumber
              icon={<ArrowPathIcon width={20} />}
              title="Estornos realizados"
              value={data ? data[0]?.totalizers?.returns_total : 0}
              money
              loading={isLoading}
            />
          </Col>
          <Col xs={{ span: 24 }} md={{ span: 8 }}>
            <BigNumber
              icon={<ArrowUturnLeftIcon width={20} />}
              title="Devoluções"
              value={data ? data[0]?.totalizers?.refunds_total : 0}
              money
              loading={isLoading}
            />
          </Col>
          <Col xs={{ span: 24 }} md={{ span: 8 }}>
            <BigNumber
              icon={<UserIcon width={20} />}
              title="Receita do operador"
              value={data ? data[0]?.totalizers?.operator_sales_total : 0}
              money
              loading={isLoading}
            />
          </Col>{" "}
          <Col xs={{ span: 24 }} md={{ span: 8 }}>
            <BigNumber
              icon={<TicketIcon width={20} />}
              title="Reimpressões"
              value={data ? data[0]?.totalizers?.reprints_total : 0}
              loading={isLoading}
            />
          </Col>{" "}
          <Col xs={{ span: 24 }} md={{ span: 8 }}>
            <BigNumber
              icon={<UserMinusIcon width={20} />}
              title="Receita garçom"
              value={data ? data[0]?.totalizers?.waiter_sales_total : 0}
              money
              loading={isLoading}
            />
          </Col>{" "}
          <Col xs={{ span: 24 }} md={{ span: 8 }}>
            <BigNumber
              icon={<DocumentPlusIcon width={20} />}
              title="Aportes"
              value={data ? data[0]?.totalizers?.contributions_in_total : 0}
              money
              loading={isLoading}
            />
          </Col>{" "}
          <Col xs={{ span: 24 }} md={{ span: 8 }}>
            <BigNumber
              icon={<DocumentMinusIcon width={20} />}
              title="Sangrias"
              value={data ? data[0]?.totalizers?.contributions_out_total : 0}
              money
              loading={isLoading}
            />
          </Col>{" "}
          <Col xs={{ span: 24 }} md={{ span: 8 }}>
            <BigNumber
              icon={<ReceiptPercentIcon width={20} />}
              title="Comissão fixa"
              value={data ? data[0]?.totalizers?.waiter_fee_total : 0}
              money
              loading={isLoading}
            />
          </Col>
        </Row>
      </Col>
      <Col xs={{ span: 24 }} md={{ span: 24 }}>
        <Card>
          <ReactECharts
            style={{ minHeight: 400 }}
            option={{
              tooltip: {
                trigger: "axis",
                axisPointer: {
                  type: "shadow",
                },
                formatter: (params: any) => {
                  const { value, name } = params[0];
                  console.log(params);

                  return `${name}<br/><br/>Total: ${formatCurrency(value)}`;
                },
              },
              grid: {
                left: "3%",
                right: "4%",
                bottom: "3%",
                containLabel: true,
              },
              xAxis: [
                {
                  type: "category",
                  data:
                    data &&
                    data[3]?.pub_payments?.map(
                      (sale: any) =>
                        `${new Date(sale?.hour).toLocaleDateString()} às ${
                          new Date(sale?.hour)
                            .toLocaleTimeString()
                            .split(":")[0]
                        }h`
                    ),
                  axisTick: {
                    alignWithLabel: true,
                  },
                },
              ],
              yAxis: [
                {
                  type: "value",
                  axisLabel: {
                    formatter: (value: number) => formatCurrency(value),
                  },
                  splitLine: {
                    lineStyle: {
                      color: "#4f4e4e", // Define a cor das linhas horizontais como cinza claro
                    },
                  },
                },
              ],
              series: [
                {
                  name: "Total de vendas",
                  type: "bar",
                  barWidth: "10%",
                  itemStyle: {
                    color: "#4CAF50", // Define a cor das barras como verde
                    borderRadius: [16, 16, 0, 0], // Arredonda as bordas superiores das barras
                  },
                  data:
                    data &&
                    data[3]?.pub_payments?.map(
                      (sale: any) => sale?.total_value
                    ),
                },
              ],
            }}
            opts={{ renderer: "svg" }}
            lazyUpdate
          />
        </Card>
      </Col>
    </Row>
  );
};
