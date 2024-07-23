import {
  ProCard,
  ProFormInstance,
  StepsForm,
} from "@ant-design/pro-components";
import { AgreementType } from "@franchisor/services/franchises/__interfaces/agremeents.interface";
import { useListFranchiseAgreements } from "@franchisor/services/franchises/agreements/listAgreements";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import { useBreakpoints } from "@hooks/useBreakpoints";
import defaultTheme from "@styles/default";
import { Button, Col, Row, Tabs, Typography } from "antd";
import { motion } from "framer-motion";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  createFranchiseI,
  franchiseAgreementsRoute,
} from "../../../../../services/franchises/__interfaces/create_franchise.interface";
import { StepOne } from "./steps/stepOne";
import { StepThree } from "./steps/stepThree";
import { StepTwo } from "./steps/stepTwo";
import { TokenModal } from "@components/token";

interface mutateI {
  mutate: (body: createFranchiseI) => void;
  mutateAgreements?: (body: franchiseAgreementsRoute) => void;
  loading?: boolean;
  success?: boolean;
  error?: any;
  title?: string;
  subtitle?: string;
  initialValues?: createFranchiseI;
  update?: boolean;
  agreements?: AgreementType[];
}

export const MutateFranchise = ({
  mutate,
  mutateAgreements,
  loading,
  title,
  subtitle,
  initialValues,
  update,
  agreements,
}: mutateI) => {
  const formRef = useRef<ProFormInstance>();
  const [modules, setModules] = useState<string[]>([]);
  const [width, setWidth] = useState<number>((100 / 3) * 1);
  const [step, setStep] = useState<number>(1);
  const [loadingStep, setLoadingStep] = useState<boolean>(false);
  const navigate = useNavigate();
  const { data } = useListFranchiseAgreements();
  const { isSm } = useBreakpoints();
  const [isTokenModalOpen, setIsTokenModalOpen] = useState<boolean>(false);

  const waitTime = (values: any) => {
    const agreements: { template_id?: string; value: string }[] = [];
    const licenses = values.licenses.keys.map((l: any) => ({
      type: l,
      value: values.licenses[l],
    }));

    const keysOrganization = [
      "ANTIFRAUD",
      "TRANSACTION",
      "FEE_EMISSION",
      "FEE_PAY365",
      "RESULT_FRANCHISOR",
      "RESULT_CREDIT_ADVANCE",
      "SPREAD_CREDIT_ADVANCE",
    ];

    console.log(values.agreements);

    Object?.keys(values.agreements)?.forEach((section) => {
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
      if (update && mutateAgreements) {
        mutate({
          ...initialValues,
          ...values,
          cnpj: values?.cnpj
            ? values?.cnpj?.replace(/\D/g, "")
            : initialValues?.cnpj?.replace(/\D/g, ""),
          master: {
            ...values?.master,
            ...initialValues?.master,
            cpf: values?.master?.cpf
              ? values?.master?.cpf?.replace(/\D/g, "")
              : undefined,
              cellphone: values?.master?.cellphone
              ? values?.master?.cellphone?.replace(/\D/g, "")
              : undefined,
            terminal_password: values?.master?.terminal_password
              ? `${values?.master?.terminal_password}`
              : undefined,
            confirm_password: undefined,
          },
          state_registration: values?.state_registration
            ? `${values?.state_registration}`
            : undefined,
          contacts: [],
          agreements: undefined,
          licenses: undefined,
        });

        mutateAgreements({
          agreements: agreements as any,
          licenses,
        });
        resolve(true);
        return;
      }

      mutate({
        ...initialValues,
        ...values,
        cnpj: values?.cnpj
          ? values?.cnpj?.replace(/\D/g, "")
          : initialValues?.cnpj?.replace(/\D/g, ""),
        master: {
          ...values?.master,
          ...initialValues?.master,
          cpf: values?.master?.cpf
            ? values?.master?.cpf?.replace(/\D/g, "")
            : undefined,
            cellphone: values?.master?.cellphone
            ? values?.master?.cellphone?.replace(/\D/g, "")
            : undefined,
          terminal_password: values?.master?.terminal_password
            ? `${values?.master?.terminal_password}`
            : undefined,
          confirm_password: undefined,
        },
        state_registration: values?.state_registration
          ? `${values?.state_registration}`
          : undefined,
        contacts: [],
        agreement: agreements,
        agreements: undefined, 
        licenses,
      });
      resolve(true);
    });
  };
  const initialFormValues: createFranchiseI = initialValues ?? {
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
      cellphone: "",
      terminal_password: "",
      username: "",
    },
    module: [],
  };

  return (
    <Row justify="center" style={{ width: "100%" }}>
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
      <ProCard
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
            <StepsForm<createFranchiseI>
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
                ) : null
              }
              submitter={false}
              current={step - 1}
              onCurrentChange={(current) => {
                setWidth((100 / 3) * (current + 1));
                setStep(current + 1);
              }}
              formProps={{ initialValues: initialFormValues }}
            >
              <StepOne setModules={setModules} update={update} />
              <StepTwo update={update} />
              <StepThree
                modules={modules}
                update={update}
                agreements={agreements}
              />
            </StepsForm>
          </Col>
        </Row>
      </ProCard>

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
