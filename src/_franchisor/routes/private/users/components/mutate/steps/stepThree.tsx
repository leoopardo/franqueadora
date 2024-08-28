import { CheckCircleFilled, CloseCircleFilled } from "@ant-design/icons";
import {
  ProFormInstance,
  ProFormText,
  StepsForm,
} from "@ant-design/pro-components";
import { Col, Divider, Row, Typography } from "antd";
import { useEffect, useRef, useState } from "react";
import { useBreakpoints } from "../../../../../../../hooks/useBreakpoints";
import defaultTheme from "../../../../../../../styles/default";
import regexList from "../../../../../../../utils/regexList";

export const StepThree = ({
  update,
  draft,
}: {
  update?: boolean;
  draft?: any;
}) => {
  const stepTwoRef = useRef<ProFormInstance>(null);
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
    if (draft) {
      stepTwoRef?.current?.setFieldsValue(draft);
    }
  }, [draft]);

  return (
    <StepsForm.StepForm<any>
      name="master"
      title="Perfil principal"
      onFinish={async (form) => {
        console.log(form);

        await waitTime(500);
        return true;
      }}
      size="large"
      grid
      formRef={stepTwoRef}
      onFinishFailed={() => {
        const fields = stepTwoRef?.current?.getFieldsError();
        const firstErrorField = fields?.find(
          (field: any) => field.errors.length > 0
        );
        if (firstErrorField) {
          stepTwoRef?.current?.scrollToField(firstErrorField.name[0], {
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
        <Col md={{ span: 24 }} xs={{ span: 24 }}>
          <Divider orientation="left">Senha do backoffice</Divider>
        </Col>
        <Col md={{ span: 12 }} xs={{ span: 24 }}>
          <ProFormText.Password
            name={["password"]}
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
            name={["confirm_password"]}
            label="Confirmar senha"
            placeholder="Confirme a senha"
            rules={[
              { required: !update },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue(["password"]) === value) {
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
      </Row>
    </StepsForm.StepForm>
  );
};
