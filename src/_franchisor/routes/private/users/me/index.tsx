import { CheckCircleFilled, CloseCircleFilled } from "@ant-design/icons";
import { ProCard, ProFormText, StepsForm } from "@ant-design/pro-components";
import { PageHeader } from "@components/header/pageHeader";
import { QueryKeys } from "../../../../services/queryKeys";
import { ArrowPathIcon } from "@heroicons/react/24/outline";
import { useBreakpoints } from "@hooks/useBreakpoints";
import defaultTheme from "@styles/default";
import { formatCellPhoneBR } from "@utils/regexFormat";
import regexList from "@utils/regexList";
import { Button, Col, Divider, Popconfirm, Row, Tabs, Typography } from "antd";
import { useRef, useState } from "react";
import { queryClient } from "../../../../../services/queryClient";

export const Me = () => {
  const { isSm } = useBreakpoints();
  const Me = queryClient?.getQueryData(QueryKeys.GET_ME) as any;
  const formRef = useRef<any>();
  // const { data } = Services.users.byId(Me.id);
  const [, setStep] = useState<number>(1);
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

  return (
    <Row
      style={{ width: "100%", padding: isSm ? 12 : "20px 40px 20px 40px" }}
      align="middle"
      gutter={[8, 16]}
    >
      <Col xs={{ span: 24 }} md={{ span: 24 }}>
        <PageHeader
          title={`Olá, ${Me?.name}`}
          subtitle="Visualize e edite os dados da sua conta."
        />
      </Col>
      <Col xs={{ span: 24 }}>
        <ProCard bordered>
          <StepsForm
            stepsRender={(steps) => (
              <Tabs
                onChange={(key) => {
                  setStep(+key + 1);
                }}
                items={steps.map((step) => ({
                  label: step.title,
                  key: step.key,
                }))}
              />
            )}
            containerStyle={{
              width: "100%",
              paddingBottom: 24,
              marginTop: -30,
            }}
            submitter={false}
          >
            <StepsForm.StepForm
              name="base"
              title="Dados do usuário"
              onFinish={async (form) => {
                console.log(form);
                return true;
              }}
              size="large"
              grid
              formRef={formRef}
              
            >
              <Row style={{ width: "100%" }} gutter={[8, 8]}>
                <Col sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 8 }}>
                  <ProFormText
                    fieldProps={{ size: "large" }}
                    name="name"
                    label="Nome"
                    initialValue={Me?.name}
                  />
                </Col>
                <Col sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 8 }}>
                  <ProFormText
                    fieldProps={{ size: "large" }}
                    name="email"
                    label="Email"
                    initialValue={Me?.email}
                  />
                </Col>
                <Col sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 8 }}>
                  <ProFormText
                    fieldProps={{ size: "large" }}
                    name="phone"
                    label="Telefone"
                    initialValue={formatCellPhoneBR(Me?.phone)}
                    getValueFromEvent={(e) => formatCellPhoneBR(e.target.value)}
                  />
                </Col>
                <Col md={{ span: 24 }} xs={{ span: 24 }}>
                  <Divider orientation="left">Senhas</Divider>
                </Col>
                <Col md={{ span: 24 }} xs={{ span: 24 }}>
                  <Popconfirm
                    title="Gerar nova senha de terminal."
                    description="Tem certeza que deseja trocar a sua senha antiga?"
                    onConfirm={() => {
                      console.log("Confirmado");
                    }}
                    okText="Sim"
                    cancelText="Não"
                  >
                    <Button
                      shape="round"
                      type="primary"
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: 8,
                      }}
                      icon={<ArrowPathIcon height={20} />}
                    >
                      Gerar nova senha de terminal
                    </Button>
                  </Popconfirm>
                </Col>

                <Col md={{ span: 12 }} xs={{ span: 24 }}>
                  <ProFormText.Password
                    name={["master", "password"]}
                    label="Senha"
                    placeholder="Digite a senha"
                    rules={[
                      ({}) => ({
                        validator(_, value) {
                          if (!value || value.match(regexList.password)) {
                            return Promise.resolve();
                          }
                          return Promise.reject(
                            new Error(
                              "A senha deve atender os critérios abaixo"
                            )
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
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (
                            !value ||
                            getFieldValue(["master", "password"]) === value
                          ) {
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
                            new Error(
                              "A senha deve atender os critérios abaixo"
                            )
                          );
                        },
                      }),
                    ]}
                    fieldProps={{
                      onChange: (e) => setConfirmPassWord(e.target.value),
                    }}
                  />
                </Col>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    width: "100%",
                  }}
                >
                  <Row style={{ width: "70%" }}>
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
                                  style={{
                                    fontSize: 24,
                                    color: defaultTheme.primary,
                                  }}
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
                                  style={{
                                    fontSize: 24,
                                    color: defaultTheme.primary,
                                  }}
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
                                  style={{
                                    fontSize: 24,
                                    color: defaultTheme.primary,
                                  }}
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
                  </Row>
                  
                </div><Col
          style={{
            width: "100%",
            height: "10vh",
            borderTop: "2px solid rgb(207, 207, 207, 0.4)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: 34,
          }}
          span={24}
        >
          
          <Button
            shape="round"
            size="large"
            type="primary"
            onClick={() => {
              formRef.current?.submit();
            }}
          >
            Salvar dados
          </Button>
        </Col>
              </Row>
            </StepsForm.StepForm>
          </StepsForm>
        </ProCard>
        
      </Col>
    </Row>
  );
};
