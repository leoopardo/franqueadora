import { ProFormInstance, StepsForm } from "@ant-design/pro-components";
import {
  Cog6ToothIcon,
  MapPinIcon,
  ScaleIcon,
} from "@heroicons/react/24/outline";
import { Card, Col, Menu, Row } from "antd";
import { useRef, useState } from "react";
import { Config } from "./config";
import { useBreakpoints } from "@hooks/useBreakpoints";
import { Localization } from "./localization";

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

  return (
    <Row style={{ width: "100%" }} gutter={[24, 24]}>
      <Col xs={{ span: 24 }} md={{ span: 6 }}>
        <Card
          style={{ position: isSm ? undefined : "fixed", minWidth: 250 }}
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
      <Col xs={{ span: 24 }} md={{ span: 18 }}>
        <StepsForm.StepForm
          name="base"
          title="Detalhes do evento"
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
            if (firstErrorField) {
              stepOneRef?.current?.scrollToField(firstErrorField.name[0], {
                behavior: "smooth",
                block: "center",
              });
            }
          }}
        >
          {activeKey === "configs" && <Config />}
          {activeKey === "localization" && <Localization />}
        </StepsForm.StepForm>
      </Col>
    </Row>
  );
};
