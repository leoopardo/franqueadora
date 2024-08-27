import {
  ProForm,
  ProFormInstance,
  StepsForm,
} from "@ant-design/pro-components";
import { useListFranchiseAgreements } from "../../../../../../services/franchises/agreements/listAgreements";
import { LockClosedIcon, LockOpenIcon } from "@heroicons/react/24/outline";
import { Button, Col, Divider, Input, Row } from "antd";
import { useRef, useState } from "react";
import { useBreakpoints } from "../../../../../../../hooks/useBreakpoints";
import {
  AgreementType,
  TFranchiseAgreementType,
} from "../../../../../../services/franchises/__interfaces/agremeents.interface";
import { CurrencyInput } from "react-currency-mask";

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
  update?: boolean;
  agreements?: AgreementType[];
}
export const StepThree = ({ modules, update, agreements }: stepThreeI) => {
  const stepTrhreeRef = useRef<ProFormInstance>(null);
  const { isXs } = useBreakpoints();
  const [updateFees, setUpdateFees] = useState<boolean>(false);
  const { data } = useListFranchiseAgreements();

  function renderFeeSection(section: TFranchiseAgreementType) {
    const keysOrganization = [
      "ANTIFRAUD",
      "TRANSACTION",
      "FEE_EMISSION",
      "FEE_PAY365",
      "RESULT_FRANCHISOR",
      "RESULT_CREDIT_ADVANCE",
      "SPREAD_CREDIT_ADVANCE",
    ];

    const components: JSX.Element[] = [];

    keysOrganization.forEach((type) => {
      if (agreements) {
        const item = agreements.find(
          (item) => item.type === section && item.key === type
        );
        if (item) {
          const valueType = item.value_type;
          const name = item.name;
          const value = item.value;

          stepTrhreeRef?.current?.setFieldValue(
            ["agreements", section, type],
            value
          );

          valueType === "CURRENCY"
            ? components.push(
                <Col md={{ span: 12 }} xs={{ span: 24 }} key={name}>
                  <ProForm.Item
                    name={["agreements", section, type]}
                    label={name}
                    rules={[
                      {
                        required: !update,
                      },
                    ]}
                  >
                    <CurrencyInput
                      onChangeValue={(event) => {
                        stepTrhreeRef?.current?.setFieldValue(
                          ["agreements", section, type],
                          event.target.value
                        );
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
              )
            : components.push(
                <Col md={{ span: 12 }} xs={{ span: 24 }} key={name}>
                  <ProForm.Item
                    name={["agreements", section, type]}
                    label={name}
                    rules={[
                      {
                        required: !update,
                      },
                    ]}
                  >
                    <CurrencyInput
                      onChangeValue={(event) => {
                        stepTrhreeRef?.current?.setFieldValue(
                          ["agreements", section, type],
                          event.target.value
                        );

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
              );
        }
      }
      const item = data?.items
        .filter((i) => !agreements?.find((a) => a.id === i.id))
        .find((item) => item.type === section && item.key === type);

      if (item) {
        const valueType = item.value_type;
        const name = item.name;
        const value = item.value;

        stepTrhreeRef?.current?.setFieldValue(
          ["agreements", section, type],
          value
        );

        valueType === "CURRENCY"
          ? components.push(
              <Col md={{ span: 12 }} xs={{ span: 24 }} key={name}>
                <ProForm.Item
                  name={["agreements", section, type]}
                  label={name}
                  rules={[
                    {
                      required: !update,
                    },
                  ]}
                >
                  <CurrencyInput
                    onChangeValue={(event) => {
                      stepTrhreeRef?.current?.setFieldValue(
                        ["agreements", section, type],
                        event.target.value
                      );
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
            )
          : components.push(
              <Col md={{ span: 12 }} xs={{ span: 24 }} key={name}>
                <ProForm.Item
                  name={["agreements", section, type]}
                  label={name}
                  rules={[
                    {
                      required: !update,
                    },
                  ]}
                >
                  <CurrencyInput
                    onChangeValue={(event) => {
                      stepTrhreeRef?.current?.setFieldValue(
                        ["agreements", section, type],
                        event.target.value
                      );
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
            );
      }
    });
    return components;
  }

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
      size="large"
      grid
      formRef={stepTrhreeRef}
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
        {modules.includes("Ficha") && (
          <>
            <Row gutter={[8, 0]}>
              <Col span={24}>
                <Divider orientation="left">Bar físico (Consumidor)</Divider>
              </Col>
              {renderFeeSection("PHYSICAL_PUB_CONSUMER").map((x) => x)}
            </Row>{" "}
            <Row gutter={[8, 8]}>
              <Col span={24}>
                <Divider orientation="left">Bar físico (Produtor)</Divider>
              </Col>
              {renderFeeSection("PHYSICAL_PUB_PRODUCER").map((x) => x)}
            </Row>
          </>
        )}
        {modules.includes("Ingresso") && (
          <>
            <Row gutter={[8, 0]}>
              <Col span={24}>
                <Divider orientation="left">
                  Ingresso físico (Consumidor)
                </Divider>
              </Col>
              {renderFeeSection("PHYSICAL_TICKET_CONSUMER").map((x) => x)}
            </Row>{" "}
            <Row gutter={[8, 8]}>
              <Col span={24}>
                <Divider orientation="left">Ingresso físico (Produtor)</Divider>
              </Col>
              {renderFeeSection("PHYSICAL_TICKET_PRODUCER").map((x) => x)}
            </Row>
          </>
        )}
        {modules.includes("Transação direta") && (
          <>
            <Row gutter={[8, 0]}>
              <Col span={24}>
                <Divider orientation="left">Transação</Divider>
              </Col>
              {renderFeeSection("DIRECT_TRANSACTION").map((x) => x)}
            </Row>{" "}
          </>
        )}
      </Row>
    </StepsForm.StepForm>
  );
};
