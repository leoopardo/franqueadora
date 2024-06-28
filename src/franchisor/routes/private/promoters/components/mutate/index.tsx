import { ProFormInstance, StepsForm } from "@ant-design/pro-components";
import { Button, Col, Row, Typography } from "antd";
import { motion } from "framer-motion";
import { Dispatch, SetStateAction, useRef, useState } from "react";
import defaultTheme from "../../../../../../styles/default";
import { createFranchiseI } from "../../../../../services/franchises/__interfaces/create_franchise.interface";
import { StepOne } from "./steps/stepOne";
import { StepThree } from "./steps/stepThree";
import { StepTwo } from "./steps/stepTwo";

interface mutateI {
  body: createFranchiseI;
  setBody: Dispatch<SetStateAction<createFranchiseI>>;
  mutate: () => void;
  loading?: boolean;
  success?: boolean;
  error?: any;
}

export const MutatePromoter = ({ mutate, setBody }: mutateI) => {
  const formRef = useRef<ProFormInstance>();
  const divRef = useRef(null);
  const [modules, setModules] = useState<string[]>([]);
  const [width, setWidth] = useState<number>((100 / 3) * 1);
  const [step, setStep] = useState<number>(1);

  const waitTime = (values: any) => {
    return new Promise<boolean>((resolve) => {
      setBody({
        address: {
          address: values.address,
          cep: values.cep,
          city: values.city,
          complement: values.complement,
          district: values.district,
          number: values.number,
          state: values.state,
        },
        agreement: [],
        area_codes: values.area_code,
        cnpj: values.cnpj.replace(/\D/g, ""),
        commercial_name: values.company_name,
        company_name: values.company_name,
        contacts: [],
        counties: values.counties,
        franchise_name: values.franchise_name,
        master: {
          cpf: values.cpf,
          email: values.email,
          name: values.name,
          password: values.password,
          phone: values.phone,
          terminal_password: values.terminal_password,
          username: values.username,
        },
        module: values.module,
        state_registration: `${values.state_registration}`,
      });
      setTimeout(() => {
        mutate();
        resolve(true);
      }, 500);
      resolve(true);
    });
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
            <Typography.Title level={3} style={{  margin: 0 }}>
              Cadastro de promotores
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
            onCurrentChange={(current) => {
              setWidth((100 / 3) * (current + 1));
              setStep(current + 1);
            }}
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
          flexDirection: "row-reverse",
        }}
        span={24}
      >
        <Button
          shape="round"
          size="large"
          type="primary"
          style={{ boxShadow: "none" }}
        >
          Próxima etapa
        </Button>
      </Col>
    </Row>
  );
};
