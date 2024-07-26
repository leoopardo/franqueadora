import { ProFormInstance, StepsForm } from "@ant-design/pro-components";
import defaultTheme from "@styles/default";
import { Col, Modal, Row, Typography } from "antd";
import { motion } from "framer-motion";
import { Dispatch, SetStateAction, useRef, useState } from "react";
import { SubSectorFirstStep } from "./subSectorFirstStep";

interface CreateSectorModalProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  formRef?: ProFormInstance;
  setDataSource: Dispatch<SetStateAction<any[]>>;
}

export const CreateSectorModal = ({
  open,
  setOpen,
  formRef,
  setDataSource,
}: CreateSectorModalProps) => {
  const [step, setStep] = useState<number>(1);
  const [width, setWidth] = useState<number>((100 / 2) * 1);
  const sectorFormRef = useRef<ProFormInstance>();

  const waitTime = (values: any) => {
    const sectors = Array.isArray(formRef?.getFieldValue("sub-sectors"))
      ? formRef?.getFieldValue("sub-sectors")
      : [];
    sectors.push({ ...values, active: true });

    setDataSource((state) => [
      ...state,
      { ...values, active: true, key: state.length + 1 },
    ]);

    formRef?.setFieldValue("sub-sectors", sectors);

    return new Promise<boolean>((resolve) => {
      setOpen(false);
      return resolve(true);
    });
  };

  return (
    <Modal
      width={800}
      
      title={
        <>
          <Row
            style={{ width: "100%", height: "100%", padding: 22 }}
            justify="center"
            align="middle"
          >
            <Col
              xs={{ span: 24 }}
              style={{ display: "flex", gap: 16, flexDirection: "column" }}
            >
              <Typography.Text
                style={{
                  lineHeight: 0,
                  fontWeight: 400,
                  color: "rgb(150, 150, 150)",
                }}
              >
                Passo {step} de 2
              </Typography.Text>
              <Typography.Title level={4} style={{ margin: 0 }}>
                Cadastrar sub-setor
              </Typography.Title>
              <Typography.Text style={{ lineHeight: 0, fontWeight: 400 }}>
                Insira as informações para cadastrar um novo sub-setor.
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
        body: {
          padding: 0,
          maxHeight: "55vh",
          overflowY: "auto",
          overflowX: "hidden",
        },
        footer: {
          padding: "16px 22px 16px 22px",
          display: "flex",
          justifyContent: "space-between",
          borderTop: "1px solid rgb(240, 240, 240)",
        },
      }}
      style={{ padding: 0, marginTop: 8 }}
      onOk={() => {
        sectorFormRef.current?.submit();
      }}
    >
      <StepsForm
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
          width: "95%",
          paddingBottom: 24,
        }}
      >
        <SubSectorFirstStep />
      </StepsForm>
    </Modal>
  );
};
