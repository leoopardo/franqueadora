import { LoadingOutlined } from "@ant-design/icons";
import { ProFormInstance, StepsForm } from "@ant-design/pro-components";
import { TokenModal } from "@franchise/components/token";
import { AgreementType } from "@franchisor/services/franchises/__interfaces/agremeents.interface";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import { useBreakpoints } from "@hooks/useBreakpoints";
import defaultTheme from "@styles/default";
import {
  Button,
  Card,
  Col,
  notification,
  Row,
  Space,
  Spin,
  Steps,
  Tabs,
  Typography,
} from "antd";
import { motion } from "framer-motion";
import cookies from "js-cookie";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { StepOne } from "./step1";
import { StepThree } from "./step3";
import { StepFour } from "./step4";

interface mutateI {
  mutate: (body: any) => void;
  mutateAgreements?: (body: any) => void;
  loading?: boolean;
  getDataLoading?: boolean;
  success?: boolean;
  error?: any;
  title?: string;
  subtitle?: string;
  initialValues?: any;
  update?: boolean;
  agreements?: AgreementType[];
}

export const MutateFranchise = ({
  loading,
  title,
  subtitle,
  initialValues,
  update,
  mutate,
  getDataLoading,
}: mutateI) => {
  const formRef = useRef<ProFormInstance>();
  const [width, setWidth] = useState<number>((100 / 3) * 1);
  const [step, setStep] = useState<number>(1);
  const [loadingStep, setLoadingStep] = useState<boolean>(false);
  const navigate = useNavigate();
  const { isSm, isMd, isLg } = useBreakpoints();
  const [isTokenModalOpen, setIsTokenModalOpen] = useState<boolean>(false);
  const [api, contextHolder] = notification.useNotification();
  const [, setIsDrafLoading] = useState<boolean>(false);
  const [, setDraft] = useState<any>(undefined);

  useEffect(() => {
    if (cookies.get("create_event") && !update) {
      const data = JSON.parse(`${cookies.get("create_event")}`);
      api.info({
        message: "Rascunho identificado!",
        description:
          "Você não concluiu o cadastro anteriormente. Deseja recupera-lo?",
        duration: 30000,
        btn: (
          <Space>
            <Button
              type="primary"
              onClick={() => {
                cookies.remove("create_event");
                api.destroy();
              }}
              danger
            >
              Não, descartar
            </Button>{" "}
            <Button
              type="primary"
              onClick={() => {
                setIsDrafLoading(true);
                setDraft(data);
                // não sei pq ta funcionando, mas tá se tirar um dos dois timeout para
                setTimeout(() => {
                  setIsDrafLoading(false);
                  formRef.current?.setFieldsValue(data);
                  api.destroy();
                  setLoadingStep(false);
                }, 500);
                setTimeout(() => {
                  setDraft(undefined);
                  setIsDrafLoading(false);
                  formRef.current?.setFieldsValue(data);
                  api.destroy();
                  setLoadingStep(false);
                }, 800);
              }}
            >
              Sim, recuperar.
            </Button>
          </Space>
        ),
      });
    }
  }, []);

  const waitTime = (values: any) => {
    mutate(values);
    return new Promise<boolean>((resolve) => {
      return resolve(true);
    });
  };

  const initialFormValues: any = initialValues ?? {};

  useEffect(() => {
    if (initialFormValues) {
      formRef.current?.setFieldsValue(initialFormValues);
    }
  }, [initialFormValues]);

  return (
    <Row justify="center" style={{ width: "100%" }}>
      {contextHolder}
      <Col
        style={{
          width: "100%",
          height: "20vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center",
        }}
        span={24}
      >
        <Row
          style={{ width: "100%", height: "100%" }}
          justify="center"
          align="middle"
        >
          <Col xs={{ span: 20 }} md={{ span: 10 }}>
            <Typography.Text style={{ lineHeight: 0 }}>
              Passo {step} de 3
            </Typography.Text>
            <Typography.Title level={isSm ? 5 : 3} style={{ margin: 0 }}>
              {title}
            </Typography.Title>
            <Typography.Text style={{ lineHeight: 0 }}>
              {subtitle}
            </Typography.Text>
          </Col>
        </Row>
        <div
          style={{
            backgroundColor: "rgb(207, 207, 207, 0.2)",
            height: 5,
            width: "100%",
          }}
        >
          <motion.div
            style={{
              width: 0,
              minHeight: 5,
              borderRadius: 25,
              backgroundColor: defaultTheme.primary,
            }}
            animate={{
              width: `${width}%`,
              transition: {
                bounce: 0.8,
                bounceDamping: 1,
                stiffness: 30,
                type: "spring",
              },
            }}
          />
        </div>
      </Col>
      <Card
        style={{
          maxHeight: isSm ? undefined : "70vh",
          overflowY: "auto",
          overflowX: "hidden",
          minWidth: "100%",
        }}
      >
        <Row
          style={{
            display: "flex",
            justifyContent: "center",
            width: "100%",
            minHeight: "70vh",
          }}
        >
          <Col xs={{ span: 24 }} md={{ span: 24 }}>
            {!getDataLoading && !loading ? (
              <StepsForm<{
                promoter_id: string;
                client_id?: string;
                address: string;
              }>
                formRef={formRef}
                onFinish={waitTime}
                stepsRender={(steps) =>
                  update ? (
                    <Tabs
                      centered
                      onChange={(key) => {
                        setStep(+key + 1);
                        setWidth((100 / 3) * (+key + 1));
                      }}
                      items={steps.map((step) => ({
                        label: step.title,
                        key: step.key,
                      }))}
                      activeKey={`${step - 1}`}
                    />
                  ) : (
                    <div
                      style={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Steps
                        size="small"
                        current={step - 1}
                        items={steps.map((step) => ({
                          title: (
                            <div
                              title={`${step.title}`}
                              style={{ cursor: "pointer" }}
                            >
                              {step.title}
                            </div>
                          ),
                          key: step.key,
                        }))}
                        responsive
                        style={{ width: isSm || isMd || isLg ? "95%" : "60%" }}
                      />
                    </div>
                  )
                }
                submitter={false}
                current={step - 1}
                onCurrentChange={(current) => {
                  setWidth((100 / 3) * (current + 1));
                  setStep(current + 1);
                }}
                formProps={{ initialValues: initialFormValues }}
                containerStyle={{
                  width: isSm || isMd || isLg ? "100%" : "90%",
                  paddingBottom: 24,
                }}
                onFormChange={(_name, info) => {
                  if (update) return;
                  let form = {};
                  for (const step in info?.forms) {
                    form = { ...form, ...info?.forms[step].getFieldsValue() };
                    cookies.set("create_event", JSON.stringify(form), {
                      expires: 1,
                    });
                  }
                }}
              >
                <StepOne />
                {/* <StepTwo /> */}
                <StepThree stepperRef={formRef.current} />
                <StepFour />
              </StepsForm>
            ) : (
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Spin
                  size="large"
                  indicator={<LoadingOutlined size={40} spin />}
                  tip="Carregando dados..."
                >
                  <StepsForm<{
                    promoter_id: string;
                    client_id?: string;
                    address: string;
                  }>
                    formRef={formRef}
                    onFinish={waitTime}
                    stepsRender={(steps) =>
                      update ? (
                        <Tabs
                          centered
                          onChange={(key) => {
                            setStep(+key + 1);
                            setWidth((100 / 3) * (+key + 1));
                          }}
                          items={steps.map((step) => ({
                            label: step.title,
                            key: step.key,
                          }))}
                        />
                      ) : (
                        <div
                          style={{
                            width: "100%",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <Steps
                            size="small"
                            current={step - 1}
                            items={steps.map((step) => ({
                              title: (
                                <div
                                  title={`${step.title}`}
                                  style={{ cursor: "pointer" }}
                                >
                                  {step.title}
                                </div>
                              ),
                              key: step.key,
                            }))}
                            responsive
                            style={{
                              width: isSm || isMd || isLg ? "95%" : "60%",
                            }}
                          />
                        </div>
                      )
                    }
                    submitter={false}
                    current={step - 1}
                    onCurrentChange={(current) => {
                      setWidth((100 / 3) * (current + 1));
                      setStep(current + 1);
                    }}
                    formProps={{ initialValues: initialFormValues }}
                    containerStyle={{
                      width: isSm || isMd || isLg ? "100%" : "90%",
                      paddingBottom: 24,
                    }}
                  >
                    <StepOne />
                    {/* <StepTwo /> */}
                    <StepThree />
                    <StepFour />
                  </StepsForm>
                </Spin>
              </div>
            )}
          </Col>
        </Row>
      </Card>

      <Col
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
          danger
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          icon={<ChevronLeftIcon style={{ height: 20 }} />}
          onClick={() => {
            if (step === 1) {
              navigate(-1);
              return;
            }
            setWidth((100 / 3) * (step - 1));
            setStep((curr) => curr - 1);
          }}
        >
          Voltar
        </Button>
        <Button
          shape="round"
          size="large"
          type="primary"
          onClick={() => {
            if (step !== 3) {
              formRef.current?.submit();
              setLoadingStep(true);
              setTimeout(() => setLoadingStep(false), 2000);
            } else {
              setIsTokenModalOpen(true);
            }
          }}
          loading={loadingStep || loading}
        >
          {update ? "Salvar dados" : "Próxima etapa"}
        </Button>
      </Col>

      {isTokenModalOpen && (
        <TokenModal
          setOpen={setIsTokenModalOpen}
          open={isTokenModalOpen}
          loading={loading}
          onSuccess={() => {
            formRef.current?.submit();
            setLoadingStep(true);
            setTimeout(() => setLoadingStep(false), 2000);
          }}
        />
      )}
    </Row>
  );
};
