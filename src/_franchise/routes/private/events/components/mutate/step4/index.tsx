import {
  ProFormCheckbox,
  ProFormInstance,
  StepsForm,
} from "@ant-design/pro-components";
import { Col, Row, Typography } from "antd";
import { useRef } from "react";

export const StepFour = () => {
  const stepOneRef = useRef<ProFormInstance>();
  const waitTime = (time: number = 100) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, time);
    });
  };

  return (
    <StepsForm.StepForm
      name="base"
      title="Termos e condições"
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
        if (firstErrorField) {
          stepOneRef?.current?.scrollToField(firstErrorField.name[0], {
            behavior: "smooth",
            block: "center",
          });
        }
      }}
    >
      <Row style={{ width: "100%" }} justify="center">
        <Col span={12}>
          <ProFormCheckbox.Group>
            <ProFormCheckbox
              name={["terms", "accepted"]}
              rules={[{ required: true }]}
            >
              Ao publicar este evento estou de acordo com os Termos de uso, com
              as <Typography.Link>Diretrizes da Comunidade</Typography.Link> e
              com o{" "}
              <Typography.Link>
                Acordo de Processamento de Dados
              </Typography.Link>
              , bem como declaro estar ciente da{" "}
              <Typography.Link>Política de Privacidade</Typography.Link>, da{" "}
              <Typography.Link>Política de Cookies</Typography.Link> e das{" "}
              <Typography.Link>Obrigatoriedades Legais</Typography.Link>.
            </ProFormCheckbox>
          </ProFormCheckbox.Group>
        </Col>
      </Row>
    </StepsForm.StepForm>
  );
};
