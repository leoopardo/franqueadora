import { PageHeader } from "@components/header/pageHeader";
import { Services } from "@franchisor/services";
import { QueryKeys } from "@franchisor/services/queryKeys";
import { BellIcon, CalculatorIcon } from "@heroicons/react/24/outline";
import { useBreakpoints } from "@hooks/useBreakpoints";
import { Badge, Button, Card, Col, Dropdown, Row, Typography } from "antd";
import ReactECharts from "echarts-for-react";
import { useNavigate } from "react-router-dom";
import { queryClient } from "../../../../services/queryClient";
import RealTimeClock from "./components/clock";

export const Dashboard = () => {
  const { isSm } = useBreakpoints();
  const Me = queryClient?.getQueryData(QueryKeys.GET_ME) as any;
  const Pending = queryClient?.getQueryData(QueryKeys.PENDING_NUMBER) as any;
  const { totals } = Services.terminal;
  const navigate = useNavigate();
  //   const [params, setParams] = useState<terminalParams>({ page: 1, size: 15 });

  const total = totals({
    page: 1,
    size: 50,
  });

  const labels: any = {
    client: "Cliente",
    development: "Desenvolvimento",
    franchise: "Franquia",
    lending: "Comodato",
    sale: "Venda",
    stock: "Estoque",
    total: "Total",
    deleted: "Excluídos",
  };
  const hideTotals = ["free", "monthly", "loose"];
  return (
    <Row
      style={{ width: "100%", padding: isSm ? 12 : "20px 40px 20px 40px" }}
      gutter={[8, 16]}
    >
      <Col
        xs={{ span: 24 }}
        md={{ span: 24 }}
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <PageHeader
          title={`Olá, ${Me?.name}`}
          subtitle="Visualize os principais dados do painel."
        />
        <div
          style={{
            display: "flex",
            gap: 16,
            alignItems: "center",
            marginBottom: 16,
          }}
        >
          <RealTimeClock />
          <Badge color="green" count={Pending}>
            <Dropdown
              menu={{
                items: [
                  {
                    key: "Pending",
                    label: `Você possui ${Pending} terminais pendentes para aprovação`,
                    icon: <CalculatorIcon width={16} />,
                    onClick: () => {
                      navigate("/terminais/pendentes");
                    },
                  },
                ],
              }}
              placement="bottomLeft"
              arrow
              dropdownRender={(menu) => (
                <div style={{ width: 250 }}>{menu}</div>
              )}
            >
              <Button shape="circle" icon={<BellIcon width={24} />} />
            </Dropdown>
          </Badge>
        </div>
      </Col>
      {/* <Col xs={{ span: 24 }} md={{ span: 15 }}>
        <Card><Statistic title=""/></Card>
      </Col> */}

      <Col xs={{ span: 24 }} md={{ span: 9 }}>
        <Card>
          <Typography.Title level={4} italic>
            Terminais por situação
          </Typography.Title>
          <ReactECharts
            style={{ marginTop: -20, width: "120%" }}
            option={{
              tooltip: {
                trigger: "item",
              },
              series: [
                {
                  name: "Situação",
                  type: "pie",
                  radius: ["40%", "60%"],
                  itemStyle: {},
                  data: Object.keys(total?.data?.content || {})
                    .filter((i) => i !== "total")

                    .map((i) => ({
                      value: (total?.data?.content as any)[i],
                      name: labels[i],
                    }))
                    .filter(
                      (i) => i.name && i.value && !hideTotals.includes(i.name)
                    )
                    .sort(() => -1),
                  emphasis: {
                    itemStyle: {
                      shadowBlur: 10,
                      shadowOffsetX: 0,
                      shadowColor: "rgba(0, 0, 0, 0.5)",
                    },
                  },
                },
              ],
            }}
            opts={{ renderer: "svg" }}
            lazyUpdate
          />
        </Card>
      </Col>
      <Col xs={{ span: 24 }} md={{ span: 15 }}>
        <Card>
          <Typography.Title level={4} italic>
            Eventos por franquia
          </Typography.Title>
          <ReactECharts
            option={{
              tooltip: {
                trigger: "axis",
                axisPointer: {
                  type: "shadow",
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
                  data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
                  axisTick: {
                    alignWithLabel: true,
                  },
                },
              ],
              yAxis: [
                {
                  type: "value",
                },
              ],
              series: [
                {
                  name: "Direct",
                  type: "bar",
                  barWidth: "60%",
                  data: [10, 52, 200, 334, 390, 330, 220],
                },
              ],
            }}
          />
        </Card>
      </Col>
    </Row>
  );
};
