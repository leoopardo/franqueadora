import {
    ProFormField,
    ProFormInstance,
    StepsForm
} from "@ant-design/pro-components";
import { useBreakpoints } from "@hooks/useBreakpoints";
import defaultTheme from "@styles/default";
import { Col, Modal, Row, Typography } from "antd";
import { motion } from "framer-motion";
import { Dispatch, SetStateAction, useRef, useState } from "react";

interface CreateSectorModalProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  formRef?: ProFormInstance;
}

export const CreateSectorModal = ({
  open,
  setOpen,
}: CreateSectorModalProps) => {
  const [step, setStep] = useState<number>(1);
  const [width, setWidth] = useState<number>((100 / 2) * 1);
  const { isSm, isMd, isLg } = useBreakpoints();
  const sectorFormRef = useRef<ProFormInstance>();
  const stepOneRef = useRef<ProFormInstance>();

  const waitTime = (_values: any) => {
    return new Promise<boolean>((resolve) => {
      return resolve(true);
    });
  };

  return (
    <Modal
      width={800}
      title={
        <>
          <Row
            style={{ width: "100%", height: "100%", padding: 16 }}
            justify="center"
            align="middle"
          >
            <Col xs={{ span: 24 }}>
              <Typography.Text style={{ lineHeight: 0 }}>
                Passo {step} de 2
              </Typography.Text>
              <Typography.Title level={4} style={{ margin: 0 }}>
                Cadastrar setor
              </Typography.Title>
              <Typography.Text style={{ lineHeight: 0 }}>
                Insira as informações do setor para cadastrar um novo setor.
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
        </>
      }
      open={open}
      onCancel={() => {
        if (step === 2) {
          setStep(1);
          setWidth((100 / 2) * 1);
          return;
        }
        setOpen(false);
      }}
      okButtonProps={{ shape: "round" }}
      okText={step === 2 ? "Cadastrar" : "Próximo"}
      cancelText={step === 1 ? "Cancelar" : "Voltar"}
      cancelButtonProps={{ shape: "round", type: "default", danger: true }}
      styles={{
        content: { padding: 0 },
        body: { paddingLeft: 16, paddingRight: 16 },
        footer: {
          padding: "4px 8px 8px 8px",
          display: "flex",
          justifyContent: "space-between",
        },
      }}
      style={{ padding: 0 }}
      onOk={() => {
        if (step === 1) {
          setStep(2);
          setWidth((100 / 2) * 2);
          return;
        }

        setOpen(false);
      }}
    >
      <StepsForm<{
        promoter_id: string;
        client_id?: string;
        address: string;
      }>
        formRef={sectorFormRef}
        onFinish={waitTime}
        stepsRender={() => null}
        submitter={false}
        current={step - 1}
        onCurrentChange={(current) => {
          setWidth((100 / 3) * (current + 1));
          setStep(current + 1);
        }}
        formProps={{ initialValues: {} }}
        containerStyle={{
          width: isSm || isMd || isLg ? "100%" : "90%",
          paddingBottom: 24,
        }}
      >
        <StepsForm.StepForm<{
          address: string;
        }>
          name="base"
          title="Detalhes do setor"
          onFinish={async () => {
            await waitTime(2000);
            return true;
          }}
          size="large"
          grid
          formRef={stepOneRef}
          onFinishFailed={() => {
            const fields = stepOneRef?.current?.getFieldsError();

            const firstErrorField = fields?.find(
              (field: any) => field.errors.length > 0
            );

            if (firstErrorField) {
              stepOneRef?.current?.scrollToField(firstErrorField.name[0], {
                behavior: "smooth",
                block: "center",
              });
            }
          }}
        >
          <ProFormField name={"name"} label="Nome do setor" />
        </StepsForm.StepForm>
      </StepsForm>
    </Modal>
  );
};
