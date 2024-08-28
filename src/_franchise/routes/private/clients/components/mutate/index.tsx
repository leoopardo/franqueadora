import { LoadingOutlined } from "@ant-design/icons";
import { ProFormInstance, StepsForm } from "@ant-design/pro-components";
import { AgreementType } from "../../../../../../_franchisor/services/franchises/__interfaces/agremeents.interface";
import { createFranchiseI } from "../../../../../../_franchisor/services/franchises/__interfaces/create_franchise.interface";
import { createPromoterI } from "../../../../../../_franchisor/services/promoters/__interfaces/create_promoter.interface";
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
  Tabs,
  Typography,
} from "antd";
import { motion } from "framer-motion";
import cookies from "js-cookie";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { StepOne } from "./steps/stepOne";
import { StepTwo } from "./steps/stepTwo";

interface mutateI {
  mutate: (body: createPromoterI) => void;
  loading?: boolean;
  success?: boolean;
  error?: any;
  title?: string;
  subtitle?: string;
  initialValues?: createPromoterI;
  update?: boolean;
  agreements?: AgreementType[];
}

export const MutateClient = ({
  mutate,
  loading,
  title,
  subtitle,
  initialValues,
  update,
}: mutateI) => {
  const formRef = useRef<ProFormInstance>(null);
  const [, setModules] = useState<string[]>([]);
  const [width, setWidth] = useState<number>((100 / 2) * 1);
  const [step, setStep] = useState<number>(1);
  const [loadingStep, setLoadingStep] = useState<boolean>(false);
  const navigate = useNavigate();
  const { isSm } = useBreakpoints();
  const [api, contextHolder] = notification.useNotification();
  const [isDrafLoading, setIsDrafLoading] = useState<boolean>(false);
  const [draft, setDraft] = useState<any>(undefined);

  useEffect(() => {
    if (cookies.get("create_client_franchise") && !update) {
      const data = JSON.parse(`${cookies.get("create_client_franchise")}`);
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
                cookies.remove("create_client_franchise");
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
                setTimeout(() => {
                  setIsDrafLoading(false);
                  formRef.current?.setFieldsValue(data);
                  api.destroy();
                }, 500);
                setTimeout(() => {
                  formRef.current?.setFieldsValue(data);
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

  useEffect(() => {
    if (initialValues) {
      formRef.current?.setFieldsValue(initialValues);
    }
  }, [initialValues]);

  const waitTime = async (values: any) => {
    // const agreements: { template_id?: string; value: string }[] = [];

    // const keysOrganization = [
    //   "ANTIFRAUD",
    //   "TRANSACTION",
    //   "FEE_EMISSION",
    //   "FEE_PAY365",
    //   "RESULT_FRANCHISOR",
    //   "RESULT_CREDIT_ADVANCE",
    //   "SPREAD_CREDIT_ADVANCE",
    // ];
    // Object?.keys(values.agreements)?.forEach((section) => {
    //   keysOrganization?.forEach((key) => {
    //     const ag = data?.items?.find(
    //       (i) => i.type === section && i.key === key
    //     );

    //     if (ag) {
    //       agreements?.push({
    //         template_id: ag.id,
    //         value: values?.agreements[section][key],
    //       });
    //     }
    //   });
    // });

    return new Promise<boolean>((resolve) => {
      mutate({
        ...initialValues,
        ...values,
        master: formRef.current?.getFieldValue("master"),
      });
      resolve(false);
    });
  };
  const initialFormValues: createPromoterI = initialValues ?? {
    agreement: [],
    contacts: [],
    master: {
      cpf: "",
      email: "",
      name: "",
      password: "",
      phone: "",
      terminal_password: "",
      username: "",
    },
    physical: {
      address: "",
      address_number: "",
      cep: "",
      city: "",
      client_manager: true,
      commercial_name: "",
      complement: "",
      cpf: "",
      district: "",
      franchise_id: undefined,
      module: [],
      name: "",
      phone: "",
      rg: "",
      state: "",
    },
  };

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
              Passo {step} de 2
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
          }}
        >
          <Col xs={{ span: 24 }} md={{ span: 16 }}>
            {isDrafLoading ? (
              <Spin
                size="large"
                indicator={<LoadingOutlined size={40} spin />}
                tip="Carregando dados..."
              >
                <StepsForm<createFranchiseI>
                  formRef={formRef}
                  onFinish={waitTime}
                  stepsRender={() => null}
                  submitter={false}
                  current={step - 1}
                >
                  <StepOne setModules={setModules} update={update} />
                  <StepTwo update={update} />
                </StepsForm>
              </Spin>
            ) : (
              <StepsForm<createFranchiseI>
                formRef={formRef}
                onFinish={waitTime}
                stepsRender={(steps) =>
                  update ? (
                    <Tabs
                      centered
                      onChange={(key) => {
                        setStep(+key + 1);
                        setWidth((100 / 2) * (+key + 1));
                      }}
                      items={steps.map((step) => ({
                        label: step.title,
                        key: step.key,
                      }))}
                    />
                  ) : null
                }
                submitter={false}
                current={step - 1}
                onCurrentChange={(current) => {
                  setWidth((100 / 2) * (current + 1));
                  setStep(current + 1);
                }}
                formProps={{ initialValues: initialFormValues }}
                onFormChange={(_name, info) => {
                  if (update) return;
                  let form = {};
                  for (const step in info?.forms) {
                    form = { ...form, ...info?.forms[step].getFieldsValue() };
                    cookies.set(
                      "create_client_franchise",
                      JSON.stringify(form),
                      {
                        expires: 1,
                      }
                    );
                  }
                }}
              >
                <StepOne
                  setModules={setModules}
                  update={update}
                  updatePersonType={
                    initialFormValues?.physical ? "physical" : "juridic"
                  }
                />
                <StepTwo
                  update={update}
                  draft={draft}
                  initialValues={initialValues}
                />
              </StepsForm>
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
            setWidth((100 / 2) * (step - 1));
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
            formRef.current?.submit();
            setLoadingStep(true);
            setTimeout(() => setLoadingStep(false), 2000);
          }}
          loading={loadingStep || loading}
        >
          {update ? "Salvar dados" : "Próxima etapa"}
        </Button>
      </Col>
    </Row>
  );
};
