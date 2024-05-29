import { Tiny } from "@ant-design/plots";
import {
  BuildingStorefrontIcon,
  MegaphoneIcon,
  RectangleGroupIcon,
} from "@heroicons/react/24/outline";
import { createFileRoute } from "@tanstack/react-router";
import { Card, Col, Row, Statistic } from "antd";
import { PageHeader } from "../../../components/header/pageHeader";
import defaultTheme from "../../../styles/default";

export const Route = createFileRoute("/_auth/dashboard/")({
  component: Dashboard,
});

function Dashboard() {
  const FranchiseData = [12, 32, 30, 65, 72].map((value, index) => ({
    value,
    index,
  }));
  const PromoterData = [2, 12, 25, 31, 60].map((value, index) => ({
    value,
    index,
  }));
  const config = {
    height: 80,
    width: 160,
    padding: 8,
    shapeField: "smooth",
    xField: "index",
    yField: "value",
  };

  return (
    <Row gutter={[8, 8]} style={{ width: "100%" }}>
      <Row gutter={[8, 8]} style={{ width: "100%" }} align="middle">
        <Col xs={{ span: 24 }} md={{ span: 14 }}>
          <PageHeader
            title="Dashboard"
            subtitle="Visualize os principais dados do backoffice."
          />
        </Col>
      </Row>
      <Col style={{ marginTop: 32 }}>
        <Card>
          <div
            style={{
              display: "flex",
              gap: 16,
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            <div
              style={{
                padding: 6,
                backgroundColor: defaultTheme["primary-500"],
                height: "fit-content",
                display: "flex",
                borderRadius: "4px",
              }}
            >
              <BuildingStorefrontIcon style={{ width: 24 }} />
            </div>
            <Statistic title="Franquias" value={72} />
            <div>
              <Tiny.Area
                {...config}
                style={{
                  fill: defaultTheme["primary-500"],
                  fillOpacity: 0.6,
                }}
                data={FranchiseData}
              />
            </div>
          </div>
        </Card>
      </Col>
      <Col style={{ marginTop: 32 }}>
        <Card>
          <div
            style={{
              display: "flex",
              gap: 16,
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            <div
              style={{
                padding: 6,
                backgroundColor: defaultTheme["danger-500"],
                height: "fit-content",
                display: "flex",
                borderRadius: "4px",
              }}
            >
              <MegaphoneIcon style={{ width: 24 }} />
            </div>
            <Statistic title="Promotores" value={52} />
            <div>
              <Tiny.Area
                {...config}
                data={PromoterData}
                style={{
                  fill: defaultTheme["danger-500"],
                  fillOpacity: 0.6,
                }}
              />
            </div>
          </div>
        </Card>
      </Col>
      <Col style={{ marginTop: 32 }}>
        <Card>
          <div
            style={{
              display: "flex",
              gap: 16,
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            <div
              style={{
                padding: 6,
                backgroundColor: defaultTheme["info-500"],
                height: "fit-content",
                display: "flex",
                borderRadius: "4px",
              }}
            >
              <RectangleGroupIcon style={{ width: 24 }} />
            </div>
            <Statistic title="Clientes" value={52} />
            <div>
              <Tiny.Area
                {...config}
                data={PromoterData}
                style={{
                  fill: defaultTheme["info-500"],
                  fillOpacity: 0.6,
                }}
              />
            </div>
          </div>
        </Card>
      </Col>
    </Row>
  );
}
