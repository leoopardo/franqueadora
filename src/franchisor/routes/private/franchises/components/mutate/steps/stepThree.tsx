import { ProForm, StepsForm } from "@ant-design/pro-components";
import { LockClosedIcon, LockOpenIcon } from "@heroicons/react/24/outline";
import { Button, Col, Divider, Input, Row } from "antd";
import { useEffect, useRef, useState } from "react";
import { CurrencyInput } from "react-currency-mask";
import { useBreakpoints } from "../../../../../../../hooks/useBreakpoints";
import { useGetAgreements } from "../../../../../../services/utils/getAgreements";

// interface moduleType {
//   name: string;
//   label: string;
//   antifraud: boolean;
//   transaction: boolean;
//   pay365fee: boolean;
//   franchisor_result: boolean;
//   credit_result: boolean;
//   credit_spread: boolean;
//   emission_fee: boolean;
// }

interface stepThreeI {
  modules: string[];
}
export const StepThree = ({ modules }: stepThreeI) => {
  const stepOneRef = useRef<any>(null);
  const { isXs } = useBreakpoints();
  const [updateFees, setUpdateFees] = useState<boolean>(false);
  const [activeModules, setActiveModules] = useState<
    {
      label: string;
      name: string;
      antifraud?: boolean;
      pay365_fee?: boolean;
      transaction?: boolean;
      franchisor_result?: boolean;
      credit_result?: boolean;
      emission_fee?: boolean;
    }[]
  >([]);
  const { parsedData } = useGetAgreements();

  useEffect(() => {
    let m: {
      label: string;
      name: string;
      antifraud?: boolean;
      pay365_fee?: boolean;
      transaction?: boolean;
      franchisor_result?: boolean;
      credit_result?: boolean;
      emission_fee?: boolean;
      credid_spread?: boolean;
    }[] = [];
    if (modules.includes("Ingresso")) {
      m.push(
        {
          label: "Ingresso online",
          name: "online_ticket",
          antifraud: true,
          transaction: true,
          pay365_fee: true,
          credit_result: true,
          franchisor_result: true,
        },
        {
          label: "Ingresso físico (produtor)",
          name: "physical_producer_ticket",
          emission_fee: true,
          pay365_fee: true,
          credit_result: true,
          franchisor_result: true,
        },
        {
          label: "Ingresso físico (consumidor)",
          name: "physical_consumer_ticket",
          emission_fee: true,
          pay365_fee: true,
          credit_result: true,
          franchisor_result: true,
        }
      );
    }
    if (modules.includes("Ficha")) {
      m.push(
        {
          label: "Bar online",
          name: "online_bar",
          antifraud: true,
          transaction: true,
          pay365_fee: true,
          franchisor_result: true,
          credit_result: true,
          credid_spread: true,
        },
        {
          label: "Bar físico (produtor)",
          name: "physical_producer_bar",
          pay365_fee: true,
          credit_result: true,
          credid_spread: true,
        },
        {
          label: "Bar físico (consumidor)",
          name: "physical_consumer_bar",
          pay365_fee: true,
          credit_result: true,
          credid_spread: true,
        }
      );
    }
    if (modules.includes("Transação direta")) {
      m.push({
        label: "Transação direta",
        name: "direct_transaction",
        pay365_fee: true,
        credit_result: true,
        credid_spread: true,
      });
    }

    setActiveModules(m);
  }, [modules]);

  console.log(activeModules);

  const waitTime = (time: number = 100) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, time);
    });
  };

  useEffect(() => {
    stepOneRef.current.setFieldsValue(parsedData);
  }, []);

  return (
    <StepsForm.StepForm<{
      antifraude: number;
      transaction: number;
      pay365_fee: number;
      franchisor_result: number;
      credit_result: number;
      credit_spread: number;
    }>
      name="base"
      title="Acordo comercial"
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
        {activeModules.map((module: any) => (
          <>
            <Col md={{ span: 24 }} xs={{ span: 24 }}>
              <Divider orientation="left">{module.label}</Divider>
            </Col>
            {module.antifraud && (
              <Col md={{ span: 12 }} xs={{ span: 24 }}>
                <ProForm.Item
                  name={`${module.name}_antifraude`}
                  label="Antifraude"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <CurrencyInput
                    onChangeValue={(_event) => {
                      return;
                    }}
                    InputElement={
                      <Input
                        size="large"
                        style={{ width: "100%" }}
                        disabled={!updateFees}
                        placeholder="R$ 0,00"
                      />
                    }
                  />
                </ProForm.Item>
              </Col>
            )}
            {module.transaction && (
              <Col md={{ span: 12 }} xs={{ span: 24 }}>
                <ProForm.Item
                  name={`${module.name}_transaction`}
                  label="Transação"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <CurrencyInput
                    onChangeValue={(_event) => {
                      return;
                    }}
                    InputElement={
                      <Input
                        size="large"
                        style={{ width: "100%" }}
                        disabled={!updateFees}
                        placeholder="R$ 0,00"
                      />
                    }
                  />
                </ProForm.Item>
              </Col>
            )}
            {module.emission_fee && (
              <Col md={{ span: 12 }} xs={{ span: 24 }}>
                <ProForm.Item
                  name={`${module.name}_emission`}
                  label="Taxa de emissão"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <CurrencyInput
                    onChangeValue={(_event) => {
                      return;
                    }}
                    InputElement={
                      <Input
                        size="large"
                        style={{ width: "100%" }}
                        disabled={!updateFees}
                        placeholder="R$ 0,00"
                      />
                    }
                  />
                </ProForm.Item>
              </Col>
            )}
            {module.pay365fee && (
              <Col md={{ span: 12 }} xs={{ span: 24 }}>
                <ProForm.Item
                  name={`${module.name}_pay365_fee`}
                  label="Taxa PAY365"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <CurrencyInput
                    onChangeValue={(_event) => {
                      return;
                    }}
                    hideSymbol
                    max={100}
                    InputElement={
                      <Input
                        size="large"
                        style={{ width: "100%" }}
                        disabled={!updateFees}
                        placeholder="Digite a taxa da PAY356"
                        addonAfter="%"
                      />
                    }
                  />
                </ProForm.Item>
              </Col>
            )}
            {module.franchisor_result && (
              <Col md={{ span: 12 }} xs={{ span: 24 }}>
                <ProForm.Item
                  name={`${module.name}_franchisor_result`}
                  label="Resultado franqueadora"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <CurrencyInput
                    onChangeValue={(_event) => {
                      return;
                    }}
                    hideSymbol
                    max={100}
                    InputElement={
                      <Input
                        size="large"
                        style={{ width: "100%" }}
                        disabled={!updateFees}
                        placeholder="Digite o resultado da franqueadora"
                        addonAfter="%"
                      />
                    }
                  />
                </ProForm.Item>
              </Col>
            )}
            {module.credit_result && (
              <Col md={{ span: 12 }} xs={{ span: 24 }}>
                <ProForm.Item
                  name={`${module.name}_credit_result`}
                  label="Resultado antecipação de crédito"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <CurrencyInput
                    onChangeValue={(_event) => {
                      return;
                    }}
                    hideSymbol
                    max={100}
                    InputElement={
                      <Input
                        size="large"
                        style={{ width: "100%" }}
                        disabled={!updateFees}
                        placeholder="Digite o resultado da antecipação de crédito"
                        addonAfter="%"
                      />
                    }
                  />
                </ProForm.Item>
              </Col>
            )}
            {module.credit_spread && (
              <Col md={{ span: 12 }} xs={{ span: 24 }}>
                <ProForm.Item
                  name={`${module.name}_credit_spread`}
                  label="Spread antecipação de crédito"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <CurrencyInput
                    onChangeValue={(_event) => {
                      return;
                    }}
                    hideSymbol
                    max={100}
                    InputElement={
                      <Input
                        size="large"
                        style={{ width: "100%" }}
                        disabled={!updateFees}
                        placeholder="Digite o spread da antecipação de crédito"
                        addonAfter="%"
                      />
                    }
                  />
                </ProForm.Item>
              </Col>
            )}
          </>
        ))}
      </Row>
    </StepsForm.StepForm>
  );
};
