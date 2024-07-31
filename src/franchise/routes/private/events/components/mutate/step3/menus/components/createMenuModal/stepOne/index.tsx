import {
  ProFormField,
  ProFormInstance,
  StepsForm,
} from "@ant-design/pro-components";
import { Col, Row } from "antd";
import { useRef } from "react";

interface MenuStepOneProps {
  updateData?: any;
  formRef?: ProFormInstance;
  stepperRef?: ProFormInstance;
}

export const MenuStepOne = ({ updateData }: MenuStepOneProps) => {
  const stepOneRef = useRef<ProFormInstance>();
  const waitTime = (_values: any) => {
    return new Promise<boolean>((resolve) => {
      return resolve(true);
    });
  };

  return (
    <StepsForm.StepForm
      name="menu"
      title="Detalhes do cardápio"
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
      initialValues={updateData}
    >
      <Row
        style={{ width: "100%", marginTop: -20, marginBottom: -20 }}
        gutter={8}
      >
        <Col span={24} style={{ display: "none" }}>
          <ProFormField rules={[{ required: true }]} name="promoter_id" />
        </Col>
        <Col span={24} style={{ display: "none" }}>
          <ProFormField rules={[{ required: true }]} name="client_id" />
        </Col>
        <Col span={24}>
          <ProFormField
            rules={[{ required: true }]}
            placeholder="Por favor insira o nome do cardápio"
            name="name"
            label="Nome do cardápio"
          />
        </Col>
      </Row>
    </StepsForm.StepForm>
  );
};
