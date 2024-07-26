import {
  ProFormDependency,
  ProFormDigit,
  ProFormField,
  ProFormInstance,
  ProFormRadio,
  StepsForm
} from "@ant-design/pro-components";
import { Col, Row } from "antd";
import { useRef } from "react";

export const SubSectorFirstStep = () => {
  const stepOneRef = useRef<ProFormInstance>();
  const waitTime = (_values: any) => {
    return new Promise<boolean>((resolve) => {
      return resolve(true);
    });
  };
  
  return (
    <StepsForm.StepForm<{
      address: string;
    }>
      name="base"
      title="Detalhes do setor"
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
      <Row style={{ width: "100%", marginTop: -40 }} gutter={8}>
        <Col span={24}>
          <ProFormField
            rules={[{ required: true }]}
            name={"name"}
            label="Nome do setor"
          />
        </Col>

        <Col xs={{ span: 24 }} md={{ span: 6 }}>
          <ProFormRadio.Group
            name={"delivery_place"}
            label="Possui local de entrega?"
            initialValue={false}
            options={[
              {
                label: "Não",
                value: false,
              },
              {
                label: "Sim",
                value: true,
              },
            ]}
          />
        </Col>

        <ProFormDependency name={["delivery_place"]}>
          {({ delivery_place }) => {
            if (delivery_place === false) {
              return null;
            }

            return (
              <Col xs={{ span: 24 }} md={{ span: 11 }}>
                {" "}
                <Row style={{ width: "100%" }} gutter={8}>
                  <Col xs={{ span: 24 }} md={{ span: 12 }}>
                    <ProFormDigit name="start" label="Começo" />
                  </Col>
                  <Col xs={{ span: 24 }} md={{ span: 12 }}>
                    <ProFormDigit name="end" label="Final" />
                  </Col>
                </Row>
              </Col>
            );
          }}
        </ProFormDependency>

        <Col xs={{ span: 24 }} md={{ span: 6 }}>
          <ProFormRadio.Group
            name={"footer"}
            label="Informações de rodapé"
            initialValue={false}
            options={[
              {
                label: "Não",
                value: false,
              },
              {
                label: "Sim",
                value: true,
              },
            ]}
          />
        </Col>
        <ProFormDependency name={["footer"]}>
          {({ footer }) => {
            if (footer === false) {
              return null;
            }

            return (
              <>
                <Col xs={{ span: 24 }} md={{ span: 24 }}>
                  <ProFormField name="first_footer_line" label="Linha 1" />
                </Col>
                <Col xs={{ span: 24 }} md={{ span: 24 }}>
                  <ProFormField name="second_footer_line" label="Linha 2" />
                </Col>
                <Col xs={{ span: 24 }} md={{ span: 24 }}>
                  <ProFormField name="third_footer_line" label="Linha 3" />
                </Col>
              </>
            );
          }}
        </ProFormDependency>
      </Row>
    </StepsForm.StepForm>
  );
};
