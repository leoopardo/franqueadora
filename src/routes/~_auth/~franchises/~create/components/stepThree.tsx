import { ProFormDigit, ProFormMoney, ProFormText, StepsForm } from "@ant-design/pro-components";
import { Button, Col, Divider, Row, Switch, Typography } from "antd";
import { useEffect, useRef, useState } from "react";
import { useBreakpoints } from "../../../../../hooks/useBreakpoints";
import { LockClosedIcon, LockOpenIcon } from "@heroicons/react/24/outline";

export const StepThree = () => {
  const stepOneRef = useRef<any>(null);
  const { isXs } = useBreakpoints();
  const [updateFees, setUpdateFees] = useState<boolean>(false);

  const waitTime = (time: number = 100) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, time);
    });
  };

  useEffect(() => {
    stepOneRef.current.setFieldsValue({
      terminal_password: Math.floor(100000 + Math.random() * 900000),
    });
  }, []);

  return (
    <StepsForm.StepForm<{
      name: string;
      cnpj: number;
      legal_name: string;
    }>
      name="base"
      title="Informações da empresa"
      onFinish={async () => {
        await waitTime(2000);
        return true;
      }}
      size="large"
      grid
      formRef={stepOneRef}
    >
      <Row
        style={{ width: isXs ? "70%" : "100%" }}
        gutter={[8, 8]}
        align="middle"
      >
        <Col
          span={24}
          style={{
            display: "flex",
            gap: 8,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Button
            size="large"
            icon={
              updateFees ? (
                <LockOpenIcon style={{ width: 26 }} />
              ) : (
                <LockClosedIcon style={{ width: 26 }} />
              )
            }
            shape="circle"
            style={{ width: 50, height: 50 }}
            onClick={() => setUpdateFees((prev) => !prev)}
          />
        </Col>
        <Col md={{ span: 24 }} xs={{ span: 24 }}>
          <Divider orientation="left">Ingresso online </Divider>
        </Col>
        <Col md={{ span: 12 }} xs={{ span: 24 }}>
          <ProFormDigit
            name="Antifraude"
            label="Antifraude"
            placeholder="Digite o valor antifraude"
            fieldProps={{ disabled: !updateFees, decimalSeparator: "," }}
          />
        </Col>{" "}
        <Col md={{ span: 12 }} xs={{ span: 24 }}>
          <ProFormText
            name="name"
            label="Nome da franquia"
            placeholder="Digite o nome da franquia"
            rules={[{ required: true }]}
            fieldProps={{ disabled: !updateFees }}
          />
        </Col>{" "}
        <Col md={{ span: 12 }} xs={{ span: 24 }}>
          <ProFormText
            name="name"
            label="Nome da franquia"
            placeholder="Digite o nome da franquia"
            rules={[{ required: true }]}
            fieldProps={{ disabled: !updateFees }}
          />
        </Col>{" "}
        <Col md={{ span: 12 }} xs={{ span: 24 }}>
          <ProFormText
            name="name"
            label="Nome da franquia"
            placeholder="Digite o nome da franquia"
            rules={[{ required: true }]}
            fieldProps={{ disabled: !updateFees }}
          />
        </Col>
      </Row>
    </StepsForm.StepForm>
  );
};
