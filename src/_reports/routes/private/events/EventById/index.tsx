import { PageHeader } from "@components/header/pageHeader";
import { useReportsPage } from "@reports/contexts/ReportPageContext";
import { Services } from "@reports/services";
import { Button, Card, Col, Row, Typography } from "antd";
import ReactECharts from "echarts-for-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export const EventById = () => {
  const { setDebounceBreadcrumbs } = useReportsPage();
  const [params, setParams] = useState({ page: 1, size: 15 });
  const { event_id } = useParams();
  const { data, isLoading } = Services.event.getById(`${event_id}`);
  const navigate = useNavigate();

  const methodLegends: any = {
    pix_value: "PIX",
    money_value: "Dinheiro",
    credit_card_value: "Cartão de crédito",
    debit_card_value: "Cartão de débito",
    others_value: "Outros",
    total_value: "Total",
  };

  useEffect(() => {
    setDebounceBreadcrumbs([
      {
        title: "Eventos",
        path: "/eventos",
      },
      {
        title: "nome do evento",
      },
    ]);
  }, []);

  return (
    <Row style={{ padding: 24, maxWidth: "100%" }} align="top" gutter={[8, 8]}>
      <Col xs={{ span: 24 }} md={{ span: 18 }}>
        <PageHeader
          title="Módulo bar"
          subtitle="Visualize as informações gerais do módulo bar."
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
      <Col sm={{ span: 24 }} md={{ span: 11 }}>
        <Card>
          <Typography.Title level={4} italic>
            Terminais por situação
          </Typography.Title>
          <ReactECharts
            style={{ marginTop: -20, marginLeft: "-50%" }}
            option={{
              tooltip: {
                trigger: "item",
                backgroundColor: "#000",
                textStyle: {
                  color: "#fff",
                },
                formatter: (params: any) => {
                  const { name, value } = params;
                  return `${methodLegends[name]}: ${value}`;
                },
              },
              legend: {
                top: "center",
                left: "70%",
                orient: "vertical",
                itemGap: 20,
                textStyle: {
                  color: "#fff",
                  fontSize: 16,
                },
                formatter: (name: any) => {
                  const value = data[1][name];
                  return `${methodLegends[name]}: ${value}`;
                },
              },
              series: [
                {
                  name: "Access From",
                  type: "pie",
                  radius: ["55%", "80%"],
                  avoidLabelOverlap: false,

                  label: {
                    show: false,
                    position: "center",
                  },
                  labelLine: {
                    show: false,
                  },
                  left: "0%",
                  data:
                    data &&
                    !isLoading &&
                    Object.keys(data[1])
                      .filter((i) => !i.includes("percentage"))
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
      <Col sm={{ span: 24 }} md={{ span: 13 }}>
        <Row style={{ width: "100%" }} align={"top"} gutter={[8, 8]}>
          <Col sm={{ span: 24 }} md={{ span: 8 }}>
            <Card></Card>
          </Col>
          <Col sm={{ span: 24 }} md={{ span: 8 }}>
            <Card></Card>
          </Col>
          <Col sm={{ span: 24 }} md={{ span: 8 }}>
            <Card></Card>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};
