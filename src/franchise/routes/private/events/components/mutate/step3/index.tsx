import { ProFormInstance, StepsForm } from "@ant-design/pro-components";
import {
  CalculatorIcon,
  Cog6ToothIcon,
  MapPinIcon,
  ScaleIcon,
  Squares2X2Icon,
  UsersIcon,
  ViewColumnsIcon,
} from "@heroicons/react/24/outline";
import { useBreakpoints } from "@hooks/useBreakpoints";
import { Card, Col, Menu, Row } from "antd";
import { useRef, useState } from "react";
import { Config } from "./configs";
import { Sectors } from "./sectors";

export const StepThree = () => {
  const [activeKey, setActiveKey] = useState<string>("configs");
  const stepOneRef = useRef<ProFormInstance>();
  const { isSm } = useBreakpoints();
  const waitTime = (time: number = 100) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, time);
    });
  };
  function onMenuChange(menu: string) {
    setActiveKey(menu);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const menus = {
    config: [
      "promoter_id",
      "client_id",
      "modules",
      "event_name",
      "subject",
      "category",
      "time_stamp",
      "currency",
      "open_gate",
      "start_date",
      "start_hour",
      "end_date",
      "end_hour",
    ],
    localization: ["address"],
  };

  return (
    <Row style={{ width: "100%" }} gutter={[24, 24]}>
      <Col
        xs={{ span: 24 }}
        md={{ span: 8 }}
        xl={{ span: 6 }}
        style={{ marginBottom: isSm ? 16 : 0 }}
      >
        <Card
          style={{
            position: isSm ? undefined : "sticky",
            top: 24,
            width: isSm ? "90vw" : "100%",
          }}
          styles={{ body: { padding: "8px 0 8px 6px" } }}
        >
          <Menu
            items={[
              {
                key: "configs",
                label: "Cofigurações",
                icon: <Cog6ToothIcon style={{ height: 16 }} />,
                onClick() {
                  onMenuChange("configs");
                },
              },
              {
                key: "sectors",
                label: "Setores",
                icon: <Squares2X2Icon style={{ height: 16 }} />,
                onClick() {
                  onMenuChange("sectors");
                },
              },
              {
                key: "menus",
                label: "Cardápios",
                icon: <ViewColumnsIcon style={{ height: 16 }} />,
                onClick() {
                  onMenuChange("menus");
                },
              },
              {
                key: "users",
                label: "Usuários",
                icon: <UsersIcon style={{ height: 16 }} />,
                onClick() {
                  onMenuChange("users");
                },
              },
              {
                key: "terminals",
                label: "Terminais",
                icon: <CalculatorIcon style={{ height: 16 }} />,
                onClick() {
                  onMenuChange("terminals");
                },
              },
            ]}
            selectedKeys={[activeKey]}
          />
        </Card>
      </Col>
      <Col xs={{ span: 22 }} md={{ span: 14 }} xl={{ span: 18 }}>
        <StepsForm.StepForm<{
          address: string;
        }>
          name="Bar"
          title="Modulo bar"
          onFinish={async () => {
            await waitTime(2000);
            return true;
          }}
          size="large"
          grid
          formRef={stepOneRef}
          onFinishFailed={() => {
            const fields = stepOneRef?.current?.getFieldsError();

            const firstErrorField = fields?.find(
              (field: any) => field.errors.length > 0
            );
            if (menus.config.includes(firstErrorField?.name[0] as any)) {
              setActiveKey("configs");
            }
            if (menus.localization.includes(firstErrorField?.name[0] as any)) {
              setActiveKey("localization");
            }
            if (firstErrorField) {
              stepOneRef?.current?.scrollToField(firstErrorField.name[0], {
                behavior: "smooth",
                block: "center",
              });
            }
          }}
        >
          <Config
            formRef={stepOneRef.current}
            hidden={activeKey !== "configs"}
          />
          <Sectors
            formRef={stepOneRef.current}
            hidden={activeKey !== "sectors"}
          />
        </StepsForm.StepForm>
      </Col>
    </Row>
  );
};
