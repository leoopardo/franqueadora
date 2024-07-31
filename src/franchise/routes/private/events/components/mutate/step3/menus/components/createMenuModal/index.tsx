import { ProFormInstance, StepsForm } from "@ant-design/pro-components";
import defaultTheme from "@styles/default";
import { Col, Modal, Row, Typography } from "antd";
import { motion } from "framer-motion";
import { Dispatch, SetStateAction, useRef, useState } from "react";
import { MenuStepOne } from "./stepOne";

interface CreateMenuModalProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  formRef?: ProFormInstance;
  setDataSource: Dispatch<SetStateAction<any[]>>;
  updateData?: any;
  setUpdateData?: Dispatch<SetStateAction<any>>;
  stepperRef?: ProFormInstance;
}

export const CreateMenuModal = ({
  open,
  setOpen,
  formRef,
  // setDataSource,
  updateData,
  setUpdateData,
  stepperRef,
}: CreateMenuModalProps) => {
  const [step, setStep] = useState<number>(1);
  const [width, setWidth] = useState<number>((100 / 3) * 1);
  const sectorFormRef = useRef<ProFormInstance>();

  const waitTime = (_values: any) => {
    // console.log("values", values);

    // const menus = Array.isArray(formRef?.getFieldValue(["pub", "menus"]))
    //   ? formRef?.getFieldValue(["pub", "menus"])
    //   : [];

    // if (updateData) {
    //   menus.splice(updateData.key - 1, 1, {
    //     ...values,
    //     active: true,
    //     terminal_user_ids: [],
    //     terminals: [],
    //   });
    //   setDataSource(menus);
    //   formRef?.setFieldValue(["pub", "menus"], menus);
    //   return new Promise<boolean>((resolve) => {
    //     setUpdateData && setUpdateData(undefined);
    //     setOpen(false);
    //     return resolve(true);
    //   });
    // }

    // setDataSource((state) => {
    //   menus.push({
    //     ...values,
    //     active: true,
    //     terminal_user_ids: [],
    //     terminals: [],
    //     key: state.length + 1,
    //   });
    //   return [...state, { ...values, active: true, key: state.length + 1 }];
    // });

    // formRef?.setFieldValue(["pub", "menus"], menus);

    return new Promise<boolean>((resolve) => {
      setUpdateData && setUpdateData(undefined);
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
                Passo {step} de 3
              </Typography.Text>
              <Typography.Title level={4} style={{ margin: 0 }}>
                {updateData ? "Editar" : "Cadastrar"} cardápio
                {updateData && `: ${updateData?.name}`}
              </Typography.Title>
              <Typography.Text style={{ lineHeight: 0, fontWeight: 400 }}>
                Insira as informações para{" "}
                {updateData
                  ? "editar o cardápio"
                  : "cadastrar um novo cardápio"}
                .
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
        setUpdateData && setUpdateData(undefined);
      }}
      okButtonProps={{ shape: "round" }}
      okText={step === 3 ? "Cadastrar" : "Próximo"}
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
      style={{ padding: 0 }}
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
        <MenuStepOne
          updateData={updateData}
          formRef={formRef}
          stepperRef={stepperRef}
        />
      </StepsForm>
    </Modal>
  );
};
