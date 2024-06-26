import {
  CheckCircleFilled,
  CloseCircleFilled,
  ReloadOutlined,
} from "@ant-design/icons";
import { ProFormText, StepsForm } from "@ant-design/pro-components";
import { Col, Divider, Row, Typography, message } from "antd";
import { useEffect, useRef, useState } from "react";
import { useBreakpoints } from "../../../../../../../hooks/useBreakpoints";
import regexList from "../../../../../../../utils/regexList";
import { formatCPF, formatCellPhoneBR } from "../../../../../../../utils/regexFormat";
import defaultTheme from "../../../../../../../styles/default";

export const StepTwo = () => {
  const stepOneRef = useRef<any>(null);
  const { isXs } = useBreakpoints();
  const [password, setPassWord] = useState<string>("");
  const [confirmPassword, setConfirmPassWord] = useState<string>("");

  const passwordRules = [
    { rule: regexList.lowercarse, title: "Letra minúscula" },
    { rule: regexList.uppercase, title: "Letra maiúscula" },
    { rule: regexList.number, title: "Ao menos um número" },
    { rule: regexList.especial, title: "Caractere especial" },
    { rule: "minLength", title: "No mínimo 8 caracteres" },
    { rule: "confirm", title: "As senhas coincidem" },
  ];

  const waitTime = (time: number = 100) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, time);
    });
  };

  useEffect(() => {
    stepOneRef.current.setFieldsValue({
      terminal_password: Math.floor(100000 + Math.random() * 900000),
    });
  }, []);

  return (
    <StepsForm.StepForm<{
      name: string;
      cnpj: number;
      legal_name: string;
    }>
      name="master"
      title="Perfil principal"
      onFinish={async () => {
        await waitTime(2000);
        return true;
      }}
      size="large"
      grid
      formRef={stepOneRef}
    >
      <Row
        style={{ width: isXs ? "70%" : "100%", justifyContent: "center" }}
        gutter={[8, 8]}
      >
        {" "}
        <Col md={{ span: 12 }} xs={{ span: 24 }}>
          <ProFormText
            name="cpf"
            label="CPF"
            placeholder="Digite o CPF"
            rules={[
              { required: true },
              ({}) => ({
                validator(_, value) {
                  if (!value || value.match(regexList.cpf)) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("Este não é um CPF válido"));
                },
              }),
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
            rules={[
              { required: true },
              ({}) => ({
                validator(_, value) {
                  if (!value || value.match(regexList.cellphone)) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("Este não é um número válido")
                  );
                },
              }),
            ]}
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
          <ProFormText.Password
            name="password"
            label="Senha"
            placeholder="Digite a senha"
            rules={[
              { required: true },
              ({}) => ({
                validator(_, value) {
                  if (!value || value.match(regexList.password)) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("A senha deve atender os critérios abaixo"));
                },
              }),
            ]}
            fieldProps={{
              onChange: (e) => setPassWord(e.target.value),
            }}
          />
        </Col>
        <Col md={{ span: 12 }}  xs={{ span: 24 }}>
          <ProFormText.Password
            name="confirm_password"
            label="Confirmar senha"
            placeholder="Confirme a senha"
            rules={[
              { required: true },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error(""));
                },
              }),
              ({}) => ({
                validator(_, value) {
                  if (!value || value.match(regexList.password)) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("A senha deve atender os critérios abaixo"));
                },
              }),
            ]}
            fieldProps={{
              onChange: (e) => setConfirmPassWord(e.target.value),
            }}
          />
        </Col>
        <>
          {passwordRules.map((rule) => {
            switch (rule.rule) {
              case "confirm":
                return (
                  <Col
                    md={{ span: 8 }}
                    style={{
                      display: "flex",
                      gap: 8,
                      justifyContent: "center",
                    }}
                  >
                    {password === confirmPassword ? (
                      <CheckCircleFilled
                        style={{ fontSize: 24, color: defaultTheme.primary }}
                      />
                    ) : (
                      <CloseCircleFilled
                        style={{ fontSize: 24, color: "red" }}
                      />
                    )}
                    <Typography.Text style={{ fontSize: 18 }}>
                      {rule.title}
                    </Typography.Text>
                  </Col>
                );

              case "minLength":
                return (
                  <Col
                    md={{ span: 8 }}
                    style={{
                      display: "flex",
                      gap: 8,
                      justifyContent: "center",
                    }}
                  >
                    {password.length >= 8 ? (
                      <CheckCircleFilled
                        style={{ fontSize: 24, color: defaultTheme.primary }}
                      />
                    ) : (
                      <CloseCircleFilled
                        style={{ fontSize: 24, color: "red" }}
                      />
                    )}
                    <Typography.Text style={{ fontSize: 18 }}>
                      {rule.title}
                    </Typography.Text>
                  </Col>
                );

              default:
                return (
                  <Col
                    md={{ span: 8 }}
                    style={{
                      display: "flex",
                      gap: 8,
                      justifyContent: "center",
                    }}
                  >
                    {password.match(rule.rule) ? (
                      <CheckCircleFilled
                        style={{ fontSize: 24, color: defaultTheme.primary }}
                      />
                    ) : (
                      <CloseCircleFilled
                        style={{ fontSize: 24, color: "red" }}
                      />
                    )}
                    <Typography.Text style={{ fontSize: 18 }}>
                      {rule.title}
                    </Typography.Text>
                  </Col>
                );
            }
          })}
        </>
        <Col md={{ span: 24 }} xs={{ span: 24 }}>
          <Divider orientation="left">Senha do terminal</Divider>
        </Col>
        <Col md={{ span: 24 }} xs={{ span: 24 }}>
          <ProFormText.Password
            name="terminal_password"
            label="Senha do terminal"
            rules={[{ required: true }]}
            fieldProps={{
              addonAfter: (
                <ReloadOutlined
                  style={{ cursor: "pointer" }}
                  onClick={() =>
                    stepOneRef.current.setFieldsValue({
                      terminal_password: Math.floor(
                        100000 + Math.random() * 900000
                      ),
                    })
                  }
                />
              ),
              readOnly: true,
              onClick: () => {
                message.success("Senha copiada para a área de transferência");
              },
            }}
          />
        </Col>
      </Row>
    </StepsForm.StepForm>
  );
};
