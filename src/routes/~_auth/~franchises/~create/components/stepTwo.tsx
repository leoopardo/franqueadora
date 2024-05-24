import { ReloadOutlined } from "@ant-design/icons";
import { ProFormText, StepsForm } from "@ant-design/pro-components";
import { Col, Divider, Row } from "antd";
import { useEffect, useRef, useState } from "react";
import { useGetCEP } from "../../../../../services/brasilApi/getCEP";
import { useBreakpoints } from "../../../../../hooks/useBreakpoints";

export const StepTwo = () => {
  const [cep] = useState<string>("");
  const stepOneRef = useRef<any>(null);
  const cepRequest = useGetCEP(cep);
  const { isXs } = useBreakpoints();

  const waitTime = (time: number = 100) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, time);
    });
  };

  useEffect(() => {
    if (cepRequest.data)
      stepOneRef.current.setFieldsValue({
        state: cepRequest?.data.state,
        city: cepRequest?.data.city,
        address: cepRequest?.data.street,
        neighborhood: cepRequest?.data.neighborhood,
      });
  }, [cepRequest.data]);

  const formatCPF = (value: string) => {
    if (!value) return value;
    value = value.replace(/\D/g, ""); // Remove qualquer caractere que não seja dígito
    value = value.substring(0, 11); // Garante que só há no máximo 11 dígitos
    if (value.length <= 11) {
      return value
        .replace(/^(\d{3})(\d)/, "$1.$2")
        .replace(/^(\d{3})\.(\d{3})(\d)/, "$1.$2.$3")
        .replace(/\.(\d{3})(\d)/, ".$1-$2");
    }
    return value;
  };

  const formatCellPhoneBR = (value: string) => {
    if (!value) return value;
    value = value.replace(/\D/g, ""); // Remove todos os caracteres não numéricos
    value = value.substring(0, 11); // Garante que só há no máximo 11 dígitos

    if (value.length <= 10) {
      // Formato (XX) XXXX-XXXX
      return value
        .replace(/^(\d{2})(\d)/, "($1) $2")
        .replace(/(\d{4})(\d)/, "$1-$2");
    } else if (value.length === 11) {
      // Formato (XX) XXXXX-XXXX
      return value
        .replace(/^(\d{2})(\d)/, "($1) $2")
        .replace(/(\d{5})(\d)/, "$1-$2");
    }

    return value;
  };

  console.log(stepOneRef.current);
  return (
    <StepsForm.StepForm<{
      name: string;
      cnpj: number;
      legal_name: string;
    }>
      name="master"
      title="Perfil master"
      onFinish={async () => {
        await waitTime(2000);
        return true;
      }}
      size="large"
      grid
      formRef={stepOneRef}
    >
      <Row style={{ width: isXs ? "70%" : "100%" }} gutter={8}>
        {" "}
        <Col md={{ span: 12 }} xs={{ span: 24 }}>
          <ProFormText
            name="cpf"
            label="CPF"
            placeholder="Digite o CPF"
            rules={[
              { required: true },
              { len: 14, message: "CPF deve possuir 11 caracteres" },
            ]}
            fieldProps={{
              maxLength: 14,
            }}
            getValueFromEvent={(e) => formatCPF(e.target.value)}
          />
        </Col>
        <Col md={{ span: 12 }} xs={{ span: 24 }}>
          <ProFormText
            name="person_name"
            label="Nome completo"
            placeholder="Digite o nome completo"
            rules={[{ required: true }]}
          />
        </Col>
        <Col md={{ span: 8 }} xs={{ span: 24 }}>
          <ProFormText
            name="email"
            label="Email"
            placeholder="Digite o email"
            rules={[
              { required: true },
              { type: "email", message: "Este não é um email válido" },
            ]}
          />
        </Col>
        <Col md={{ span: 8 }} xs={{ span: 24 }}>
          <ProFormText
            name="cellphone"
            label="Celular"
            placeholder="Digite número de celular"
            rules={[{ required: true }]}
            getValueFromEvent={(e) => formatCellPhoneBR(e.target.value)}
          />
        </Col>
        <Col md={{ span: 8 }} xs={{ span: 24 }}>
          <ProFormText
            name="username"
            label="Nome de usuário"
            placeholder="Digite o nome de usuário"
            rules={[{ required: true }]}
          />
        </Col>
        <Col md={{ span: 24 }} xs={{ span: 24 }}>
          <Divider orientation="left">Senha do backoffice</Divider>
        </Col>
        <Col md={{ span: 12 }} xs={{ span: 24 }}>
          <ProFormText
            name="password"
            label="Senha"
            placeholder="Digite a senha"
            rules={[{ required: true }]}
          />
        </Col>
        <Col md={{ span: 12 }}>
          <ProFormText
            name="confirm_password"
            label="Confirmar senha"
            placeholder="Confirme a senha"
            rules={[{ required: true }]}
          />
        </Col>
        <Col md={{ span: 24 }} xs={{ span: 24 }}>
          <Divider orientation="left">Senha do terminal</Divider>
        </Col>
        <Col md={{ span: 24 }} xs={{ span: 24 }}>
          <ProFormText
            name="terminal_password"
            label="Senha do terminal"
            rules={[{ required: true }]}
            fieldProps={{
              addonAfter: <ReloadOutlined />,
            }}
          />
        </Col>
      </Row>
    </StepsForm.StepForm>
  );
};
