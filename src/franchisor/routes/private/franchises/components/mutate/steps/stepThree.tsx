import {
  CaptFieldRef,
  ProForm,
  ProFormField,
  ProFormInstance,
  ProFormSelect,
  StepsForm,
} from "@ant-design/pro-components";
import {
  AgreementType,
  TFranchiseAgreementType,
} from "@franchisor/services/franchises/__interfaces/agremeents.interface";
import { useListFranchiseAgreements } from "@franchisor/services/franchises/agreements/listAgreements";
import { LockClosedIcon, LockOpenIcon } from "@heroicons/react/24/outline";
import { Button, Col, Divider, Input, InputNumber, Row } from "antd";
import { useEffect, useRef, useState } from "react";
import { CurrencyInput } from "react-currency-mask";
import { useBreakpoints } from "../../../../../../../hooks/useBreakpoints";

interface stepThreeI {
  modules: string[];
  update?: boolean;
  agreements?: AgreementType[];
}
export const StepThree = ({ modules, update, agreements }: stepThreeI) => {
  const stepThreeForm = useRef<ProFormInstance>(null);
  const { isXs } = useBreakpoints();
  const [updateFees, setUpdateFees] = useState<boolean>(false);
  const { data } = useListFranchiseAgreements();
  const [licenses, setLicenses] = useState<any>();
  const licensesRef = useRef<CaptFieldRef>();

  useEffect(() => {
    setLicenses(stepThreeForm.current?.getFieldValue(["licenses", "keys"]));
  }, []);

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

          stepThreeForm?.current?.setFieldValue(
            ["agreements", section, type],
            stepThreeForm?.current?.getFieldValue([
              "agreements",
              section,
              type,
            ]) ?? value
          );

          valueType === "CURRENCY"
            ? components.push(
                <Col
                  lg={{ span: 8 }}
                  md={{ span: 12 }}
                  xs={{ span: 24 }}
                  key={name}
                >
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
                        stepThreeForm?.current?.setFieldValue(
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
                <Col
                  lg={{ span: 8 }}
                  md={{ span: 12 }}
                  xs={{ span: 24 }}
                  key={name}
                >
                  <ProForm.Item
                    name={["agreements", section, type]}
                    label={name}
                    rules={[
                      {
                        required: !update,
                      },
                    ]}
                  >
                    <InputNumber
                      onChange={(value) => {
                        stepThreeForm?.current?.setFieldValue(
                          ["agreements", section, type],
                          value
                        );
                      }}
                      size="large"
                      style={{ width: "100%" }}
                      disabled={!updateFees}
                      placeholder="Digite a taxa da PAY356"
                      addonAfter="%"
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

        stepThreeForm?.current?.setFieldValue(
          ["agreements", section, type],
          value
        );

        valueType === "CURRENCY"
          ? components.push(
              <Col
                lg={{ span: 8 }}
                md={{ span: 12 }}
                xs={{ span: 24 }}
                key={name}
              >
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
                      stepThreeForm?.current?.setFieldValue(
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
              <Col
                lg={{ span: 8 }}
                md={{ span: 12 }}
                xs={{ span: 24 }}
                key={name}
              >
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
                      stepThreeForm?.current?.setFieldValue(
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
      formRef={stepThreeForm}
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
            data-testid="enable_fees"
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
        <Row gutter={[8, 0]} style={{ width: "100%" }}>
          <Col span={24}>
            <Divider orientation="left">Terminais</Divider>
          </Col>
          <Col span={24}>
            <ProFormSelect
              name={["licenses", "keys"]}
              label="Licenças"
              fieldRef={licensesRef}
              placeholder="Selecione as licenças utilizadas"
              mode="multiple"
              options={[
                {
                  label: "Livre",
                  value: "LIVRE",
                },
                {
                  label: "Mensal",
                  value: "MENSAL",
                },
                {
                  label: "Avulso",
                  value: "AVULSO",
                },
              ]}
              rules={[{ required: !update }]}
              onChange={(value) => setLicenses(value)}
              disabled={!updateFees}
              fieldProps={
                {
                  "data-testid": "licenses_input",
                  dropdownRender(menu: any) {
                    return (
                      <div data-testid="licenses_dropdown">
                        {menu}
                        <Divider style={{ margin: "4px 0" }} />
                        <a
                            data-testid="licenses_select_all"
                            onClick={() => {
                              stepThreeForm.current?.setFieldsValue({
                                licenses: {
                                  keys: ["LIVRE", "MENSAL", "AVULSO"],
                                },
                              });
                              setLicenses(["LIVRE", "MENSAL", "AVULSO"]);
                            }}
                          >
                            Selecionar todos
                          </a>
                      </div>
                    );
                  },
                } as any
              }
            />
          </Col>
          {licenses?.map((license: any) => (
            <Col
              lg={{ span: 8 }}
              md={{ span: 12 }}
              xs={{ span: 24 }}
              key={license?.toLowerCase}
            >
              <ProFormField
                name={["licenses", license]}
                label={license?.toLowerCase()}
                disabled={!updateFees}
                rules={[
                  {
                    required: !update,
                  },
                ]}
                fieldProps={{
                  "data-testid": `licenses_${license}`,
                }}
              />
            </Col>
          ))}
        </Row>
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
