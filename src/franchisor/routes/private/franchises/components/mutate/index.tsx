import { ProFormInstance, StepsForm } from "@ant-design/pro-components";
import { useListFranchiseAgreements } from "@franchisor/services/franchises/agreements/listAgreements";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import defaultTheme from "@styles/default";
import { Button, Col, Row, Typography } from "antd";
import { motion } from "framer-motion";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createFranchiseI } from "../../../../../services/franchises/__interfaces/create_franchise.interface";
import { StepOne } from "./steps/stepOne";
import { StepThree } from "./steps/stepThree";
import { StepTwo } from "./steps/stepTwo";

interface mutateI {
  mutate: (body: createFranchiseI) => void;
  loading?: boolean;
  success?: boolean;
  error?: any;
}

export const MutateFranchise = ({ mutate }: mutateI) => {
  const formRef = useRef<ProFormInstance>();
  const divRef = useRef(null);
  const [modules, setModules] = useState<string[]>([]);
  const [width, setWidth] = useState<number>((100 / 3) * 1);
  const [step, setStep] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const { data } = useListFranchiseAgreements();

  const waitTime = (values: any) => {
    const agreements: { template_id: string; value: string }[] = [];

    const keysOrganization = [
      "ANTIFRAUD",
      "TRANSACTION",
      "FEE_EMISSION",
      "FEE_PAY365",
      "RESULT_FRANCHISOR",
      "RESULT_CREDIT_ADVANCE",
      "SPREAD_CREDIT_ADVANCE",
    ];
    Object?.keys(values.agreements)?.forEach((section) => {
      console.log(section);

      keysOrganization?.forEach((key) => {
        const ag = data?.items?.find(
          (i) => i.type === section && i.key === key
        );

        if (ag) {
          agreements?.push({
            template_id: ag.id,
            value: values?.agreements[section][key],
          });
        }
      });
    });

    return new Promise<boolean>((resolve) => {
      mutate({
        ...values,
        cnpj: values.cnpj.replace(/\D/g, ""),
        master: {
          ...values?.master,
          cpf: values?.master?.cpf?.replace(/\D/g, ""),
          phone: values?.master?.phone?.replace(/\D/g, ""),
          terminal_password: `${values?.master?.terminal_password}`,
          consfirm_password: undefined,
        },
        state_registration: `${values?.state_registration}`,
        contacts: [],
        agreement: agreements,
        agreements: undefined,
      });
      resolve(true);
    });
  };

  const initialFormValues: createFranchiseI = {
    address: {
      address: "",
      cep: "",
      city: "",
      complement: "",
      district: "",
      number: "",
      state: "",
    },
    agreement: [],
    area_codes: [],
    cnpj: "",
    commercial_name: "",
    company_name: "",
    contacts: [],
    counties: [],
    franchise_name: "",
    state_registration: "",
    master: {
      cpf: "",
      email: "",
      name: "",
      password: "",
      phone: "",
      terminal_password: "",
      username: "",
    },
    module: [],
  };

  return (
    <Row justify="center">
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
          <Col span={10}>
            <Typography.Text style={{ lineHeight: 0 }}>
              Passo {step} de 3
            </Typography.Text>
            <Typography.Title level={3} style={{ margin: 0 }}>
              Cadastro de franquias
            </Typography.Title>
            <Typography.Text style={{ lineHeight: 0 }}>
              Preencha todos os campos para adicionar uma nova franquia
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
      <Col
        span={24}
        style={{
          maxHeight: "70vh",
          overflow: "auto",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div ref={divRef} style={{ width: "calc(60% - 15px)", paddingTop: 16 }}>
          <StepsForm<createFranchiseI>
            formRef={formRef}
            onFinish={waitTime}
            stepsRender={() => null}
            submitter={false}
            current={step - 1}
            onCurrentChange={(current) => {
              setWidth((100 / 3) * (current + 1));
              setStep(current + 1);
            }}
            formProps={{ initialValues: initialFormValues }}
          >
            <StepOne setModules={setModules} />
            <StepTwo />
            <StepThree modules={modules} />
          </StepsForm>
        </div>
      </Col>

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
            formRef.current?.submit();
            setLoading(true);
            setTimeout(() => setLoading(false), 2000);
          }}
          loading={loading}
        >
          Próxima etapa
        </Button>
      </Col>
    </Row>
  );
};
