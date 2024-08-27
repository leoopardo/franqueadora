import { ProFormInstance, StepsForm } from "@ant-design/pro-components";
import {
  Cog6ToothIcon,
  MapPinIcon,
  ScaleIcon,
} from "@heroicons/react/24/outline";
import { useBreakpoints } from "@hooks/useBreakpoints";
import { Card, Col, Menu, Row } from "antd";
import { useRef, useState } from "react";
import { Config } from "./config";
import { Localization } from "./localization";
import { Agreements } from "./agreements";

export const StepOne = () => {
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
      "name"
    ],
    localization: ["location"],
    agreements: ["agreement"],
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
                key: "localization",
                label: "Localização",
                icon: <MapPinIcon style={{ height: 16 }} />,
                onClick() {
                  onMenuChange("localization");
                },
              },
              {
                key: "agreements",
                label: "Acordo comercial",
                icon: <ScaleIcon style={{ height: 16 }} />,
                onClick() {
                  onMenuChange("agreements");
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
          name="base"
          title="Detalhes do evento"
          onFinish={async () => {
            await waitTime(500);
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

            console.log(firstErrorField);

            if (menus.config.includes(firstErrorField?.name[0] as any)) {
              setActiveKey("configs");
            }
            if (menus.localization.includes(firstErrorField?.name[0] as any)) {
              setActiveKey("localization");
            }
            if (menus.agreements.includes(firstErrorField?.name[0] as any)) {
              setActiveKey("agreements");
            }
            if (firstErrorField) {
              setTimeout(() => {
                stepOneRef?.current?.scrollToField(
                  firstErrorField.name[0],
                  {
                    behavior: "smooth",
                    block: "center",
                  }
                );
              }, 1000);
            }
          }}
        >
          <Config
            formRef={stepOneRef.current}
            hidden={activeKey !== "configs"}
          />
          <Localization
            formRef={stepOneRef.current}
            hidden={activeKey !== "localization"}
          />
          <Agreements
            formRef={stepOneRef.current}
            hidden={activeKey !== "agreements"}
          />
        </StepsForm.StepForm>
      </Col>
    </Row>
  );
};
