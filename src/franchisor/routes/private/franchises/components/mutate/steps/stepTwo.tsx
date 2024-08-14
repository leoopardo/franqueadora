import {
  CheckCircleFilled,
  CloseCircleFilled,
  ReloadOutlined,
} from "@ant-design/icons";
import { ProFormText, StepsForm } from "@ant-design/pro-components";
import { Col, Divider, Row, Typography, message } from "antd";
import { useEffect, useRef, useState } from "react";
import { useBreakpoints } from "../../../../../../../hooks/useBreakpoints";
import useDebounce from "../../../../../../../hooks/useDebounce";
import defaultTheme from "../../../../../../../styles/default";
import {
  formatCPF,
  formatCellPhoneBR
} from "../../../../../../../utils/regexFormat";
import regexList from "../../../../../../../utils/regexList";

export const StepTwo = ({update}: {update?: boolean}) => {
  const stepTwoRef = useRef<any>(null);
  const { isXs } = useBreakpoints();
  const [password, setPassWord] = useState<string>("");
  const [confirmPassword, setConfirmPassWord] = useState<string>("");
  const [, setBodyValidate] = useState({});
  // const validateStepOne = useValidateStepTwo({ body: bodyValidate });

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
    stepTwoRef.current.setFieldsValue({
      terminal_password: Math.floor(100000 + Math.random() * 900000),
    });
  }, []);

  const handleValidate = useDebounce((key, value) => {
    setBodyValidate((state) => ({ ...state, [key]: value }));
  }, 500);

  return (
    <StepsForm.StepForm<{
      name: string;
      cnpj: number;
      legal_name: string;
    }>
      name="master"
      title="Perfil principal"
      onFinish={async () => {
        await waitTime(500);
        return true;
      }}
      size="large"
      grid
      formRef={stepTwoRef}
      onFinishFailed={() => {
        const fields = stepTwoRef.current.getFieldsError();
        const firstErrorField = fields.find(
          (field: any) => field.errors.length > 0
        );
        if (firstErrorField) {
          stepTwoRef.current.scrollToField(firstErrorField.name[0], {
            behavior: "smooth",
            block: "center",
          });
        }
      }}
    >
      <Row
        style={{ width: isXs ? "70%" : "100%", justifyContent: "center" }}
        gutter={[8, 8]}
      >
        {" "}
        <Col md={{ span: 12 }} xs={{ span: 24 }}>
          <ProFormText
            name={["master", "cpf"]}
            label="CPF"
            placeholder="Digite o CPF"
            validateTrigger={["onChange", "onBlur", "onPaste"]}
            rules={[
              { required: !update },
              ({}) => ({
                validator(_, value) {
                  if (!value || value.match(regexList.cpf)) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("Este não é um CPF válido"));
                },
              }),
              // ({}) => ({
              //   validator(_, value) {
              //     if (
              //       !(validateStepOne.error as any)?.response?.data?.message
              //         .split("\n")
              //         .includes(
              //           "Esse cpf já está em uso em outra conta. Por favor, insira um cpf diferente e tente novamente."
              //         )
              //     ) {
              //       return Promise.resolve();
              //     }
              //     return Promise.reject(new Error("CPF ja está em uso"));
              //   },
              // }),
            ]}
            fieldProps={{
              maxLength: 14,
              onChange(e) {
                handleValidate("cpf", e.target.value);
              },
            }}
            getValueFromEvent={(e) => formatCPF(e.target.value)}
          />
        </Col>
        <Col md={{ span: 12 }} xs={{ span: 24 }}>
          <ProFormText
            name={["master", "name"]}
            label="Nome completo"
            placeholder="Digite o nome completo"
            rules={[{ required: !update }]}
          />
        </Col>
        <Col md={{ span: 8 }} xs={{ span: 24 }}>
          <ProFormText
            name={["master", "email"]}
            label="Email"
            placeholder="Digite o email"
            validateTrigger={["onChange", "onBlur", "onPaste"]}
            rules={[
              { required: !update },
              { type: "email", message: "Este não é um email válido" },
              // ({}) => ({
              //   validator() {
              //     if (
              //       !(validateStepOne.error as any)?.response?.data?.message
              //         .split("\n")
              //         .includes(
              //           "Esse email já está em uso em outra conta. Por favor, insira um email diferente e tente novamente."
              //         )
              //     ) {
              //       return Promise.resolve();
              //     }
              //     return Promise.reject(new Error("CPF ja está em uso"));
              //   },
              // }),
            ]}
            fieldProps={{
              onChange(e) {
                handleValidate("email", e.target.value);
              },
            }}
          />
        </Col>
        <Col md={{ span: 8 }} xs={{ span: 24 }}>
          <ProFormText
            name={["master", "phone"]}
            label="Celular"
            placeholder="Digite número de celular"
            validateTrigger={["onChange", "onBlur", "onPaste"]}
            rules={[
              { required: !update },
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
              // ({}) => ({
              //   validator() {
              //     if (
              //       !(validateStepOne.error as any)?.response?.data?.message
              //         .split("\n")
              //         .includes(
              //           "Esse celular já está em uso em outra conta. Por favor, utilize um celular diferente e tente novamente."
              //         )
              //     ) {
              //       return Promise.resolve();
              //     }
              //     return Promise.reject(new Error("Celular ja está em uso"));
              //   },
              // }),
            ]}
            fieldProps={{
              onChange(e) {
                handleValidate("phone", e.target.value.replace(/\D/g, ""));
              },
            }}
            getValueFromEvent={(e) => formatCellPhoneBR(e.target.value)}
          />
        </Col>
        <Col md={{ span: 8 }} xs={{ span: 24 }}>
          <ProFormText
            name={["master", "username"]}
            label="Nome de usuário"
            placeholder="Digite o nome de usuário"
            rules={[{ required: !update }]}
          />
        </Col>
        <Col md={{ span: 24 }} xs={{ span: 24 }}>
          <Divider orientation="left">Senha do backoffice</Divider>
        </Col>
        <Col md={{ span: 12 }} xs={{ span: 24 }}>
          <ProFormText.Password
            name={["master", "password"]}
            label="Senha"
            placeholder="Digite a senha"
            rules={[
              { required: !update },
              ({}) => ({
                validator(_, value) {
                  if (!value || value.match(regexList.password)) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("A senha deve atender os critérios abaixo")
                  );
                },
              }),
            ]}
            fieldProps={{
              onChange: (e) => setPassWord(e.target.value),
            }}
          />
        </Col>
        <Col md={{ span: 12 }} xs={{ span: 24 }}>
          <ProFormText.Password
            name={["master", "confirm_password"]}
            label="Confirmar senha"
            placeholder="Confirme a senha"
            rules={[
              { required: !update },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue(["master", "password"]) === value) {
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
                  return Promise.reject(
                    new Error("A senha deve atender os critérios abaixo")
                  );
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
                  key={rule.title}
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
                  key={rule.title}
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
                  key={rule.title}
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
            name={["master", "terminal_password"]}
            label="Senha do terminal"
            rules={[{ required: !update }]}
            fieldProps={{
              addonAfter: (
                <ReloadOutlined
                  style={{ cursor: "pointer" }}
                  onClick={() =>
                    stepTwoRef.current.setFieldsValue({master: {
                      terminal_password: Math.floor(
                        100000 + Math.random() * 900000
                      ),
                    }})
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
