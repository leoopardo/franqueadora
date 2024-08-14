import {
  ProFormInstance,
  ProFormText,
  StepsForm,
} from "@ant-design/pro-components";
import { formatCellPhoneBR, formatCPF } from "@utils/regexFormat";
import { Col, Divider, Row } from "antd";
import { Dispatch, SetStateAction, useRef } from "react";

interface stepOneI {
  setModules: Dispatch<SetStateAction<string[]>>;
  update?: boolean;
  updatePersonType?: "juridic" | "physical";
}

export const StepOne = ({ update }: stepOneI) => {
  const stepOneRef = useRef<ProFormInstance>(null);

  const waitTime = (time: number = 100) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, time);
    });
  };

  return (
    <StepsForm.StepForm<{
      cnpj: number;
      franchise_name: string;
      company_name: string;
      commercial_name: string;
      state_registration: string;
      address: {
        address: string;
        cep: string;
        city: string;
        complement: string;
        district: string;
        number: string;
        state: string;
      };
      modules: string[];
      area_codes: string[];
      contacts: any[];
    }>
      name="base"
      title="Informações da empresa"
      onFinish={async (form) => {
        console.log(form);

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
      <Row style={{ width: "100%", maxWidth: "100vw" }} gutter={8}>
        <Col xs={{ span: 24 }}>
          <Divider orientation="left">1. Informações gerais</Divider>
        </Col>
        <Col md={{ span: 12 }} xs={{ span: 24 }}>
          <ProFormText
            name={"name"}
            label="Nome completo"
            placeholder="Digite o nome completo"
            fieldProps={{
              size: "large",
            }}
            rules={[{ required: !update }]}
          />
        </Col>

        <Col md={{ span: 12 }} xs={{ span: 24 }}>
          <ProFormText
            name={"email"}
            label="Email"
            placeholder="Digite o email"
            fieldProps={{
              size: "large",
            }}
            rules={[{ required: !update }, { type: "email" }]}
          />
        </Col>
        <Col md={{ span: 8 }} xs={{ span: 24 }}>
          <ProFormText
            name={"document"}
            label="CPF"
            placeholder="Digite o cpf"
            fieldProps={{
              size: "large",
            }}
            getValueFromEvent={(e) => formatCPF(e.target.value)}
            rules={[{ required: !update }]}
          />
        </Col>
        <Col md={{ span: 8 }} xs={{ span: 24 }}>
          <ProFormText
            name={"phone"}
            label="Telefone"
            placeholder="Digite o telefone"
            fieldProps={{
              size: "large",
            }}
            getValueFromEvent={(e) => formatCellPhoneBR(e.target.value)}
            rules={[{ required: !update }]}
          />
        </Col>
        <Col md={{ span: 8 }} xs={{ span: 24 }}>
          <ProFormText
            name={"username"}
            label="Nome de usuário"
            placeholder="Digite o nome de usuário"
            fieldProps={{
              size: "large",
            }}
            rules={[{ required: !update }]}
          />
        </Col>
      </Row>
    </StepsForm.StepForm>
  );
};
