import {
  ProForm,
  ProFormDependency,
  ProFormDigit,
  ProFormInstance,
  ProFormRadio,
  ProFormSelect,
} from "@ant-design/pro-components";
import { getSelectsData } from "../../../../../../../services/events/getSelectsData";
import { Cog6ToothIcon } from "@heroicons/react/24/outline";
import defaultTheme from "@styles/default";
import { Card, Col, Divider, Input, Row } from "antd";
import { CurrencyInput } from "react-currency-mask";

interface ConfigI {
  formRef?: ProFormInstance;
  hidden?: boolean;
}

export const Config = ({ formRef, hidden }: ConfigI) => {
  const { data } = getSelectsData();
  return (
    <Row
      gutter={[8, 8]}
      style={{ width: "100%", display: hidden ? "none" : undefined }}
    >
      <Card style={{ width: "100%" }}>
        <Row style={{ width: "100%" }} gutter={[8, 0]}>
          <Col span={24}>
            <Divider orientation="left" style={{ marginTop: 0 }}>
              <Cog6ToothIcon
                height={20}
                style={{ marginRight: 8, marginBottom: -4 }}
                color={defaultTheme.primary}
              />
              Configurações do módulo bar
            </Divider>
          </Col>
          <Col xs={{ span: 24 }} lg={{ span: 13 }}>
            <ProFormRadio.Group
              name={["add_waiter_commission"]}
              label="Soma comissão do garçom?"
              initialValue={false}
              options={[
                {
                  label: "Não",
                  value: false,
                },
                {
                  label: "Taxa do consumidor",
                  value: "consumer",
                },
                {
                  label: "Taxa do promotor",
                  value: "Promoter",
                },
              ]}
            />
          </Col>
          <Col xs={{ span: 24 }} lg={{ span: 11 }}>
            <ProFormDependency name={["add_waiter_commission"]}>
              {({ add_waiter_commission }) => {
                if (add_waiter_commission === false) return null;
                if (add_waiter_commission === "consumer") {
                  return (
                    <ProFormDigit
                      name={["pub", "waiter_consumer_comission"]}
                      label="Taxa do consumidor"
                      placeholder="0.00"
                      max={100}
                      rules={[{ required: true }]}
                      fieldProps={{ precision: 2, suffix: "%" }}
                    />
                  );
                }
                return (
                  <ProFormDigit
                    name="waiter_promoter_comission"
                    label="Taxa do promotor"
                    max={100}
                    placeholder="0.00"
                    rules={[{ required: true }]}
                    fieldProps={{ precision: 2, suffix: "%" }}
                  />
                );
              }}
            </ProFormDependency>
          </Col>
          <Col xs={{ span: 24 }} md={{ span: 12 }} lg={{ span: 8 }}>
            <ProFormRadio.Group
              name={["accept_cashless"]}
              label="Aceita pagamento com cashless?"
              initialValue={false}
              options={[
                {
                  label: "Não",
                  value: false,
                },
                {
                  label: "Sim",
                  value: true,
                },
              ]}
            />
          </Col>
          <ProFormDependency name={["accept_cashless"]}>
            {({ accept_cashless }) => {
              if (accept_cashless === false) return null;

              return (
                <>
                  <Col xs={{ span: 24 }} md={{ span: 12 }} lg={{ span: 7 }}>
                    <ProFormRadio.Group
                      name={["allow_redeem_balance"]}
                      label="Aceita resgate de cashless?"
                      initialValue={false}
                      options={[
                        {
                          label: "Não",
                          value: false,
                        },
                        {
                          label: "Sim",
                          value: true,
                        },
                      ]}
                    />
                  </Col>
                  <ProFormDependency name={["allow_redeem_balance"]}>
                    {({ allow_redeem_balance }) => {
                      if (allow_redeem_balance === false) return null;
                      return (
                        <Col xs={{ span: 24 }} md={{ span: 9 }}>
                          <ProFormDigit
                            name="cashless_chargeback_fee"
                            label="Taxa de resgate do cashless"
                            max={100}
                            placeholder="0.00"
                            rules={[{ required: true }]}
                            fieldProps={{ precision: 2, suffix: "%" }}
                          />
                        </Col>
                      );
                    }}
                  </ProFormDependency>
                  <Col xs={{ span: 24 }} md={{ span: 12 }}>
                    <ProFormSelect
                      mode="multiple"
                      label="Tipo de pagamento cashless"
                      rules={[{ required: true }]}
                      name={["pub", "payment_type"]}
                      options={data?.payment_type?.map((type) => ({
                        label: type.label,
                        value: type.id,
                      }))}
                    />
                  </Col>
                  <Col xs={{ span: 24 }} md={{ span: 12 }}>
                    <ProForm.Item
                      name={["pub", "cashless_card_cost"]}
                      label="Custo do cartão cashless"
                      rules={[
                        {
                          required: true,
                        },
                      ]}
                    >
                      <CurrencyInput
                        onChangeValue={(_event, value) => {
                          formRef?.setFieldValue(
                            ["pub", "cashless_card_cost"],
                            value
                          );
                        }}
                        hideSymbol
                        max={100}
                        currency="BRL"
                        InputElement={
                          <Input
                            size="large"
                            style={{ width: "100%" }}
                            placeholder="R$ 0,00"
                            addonBefore="R$"
                          />
                        }
                      />
                    </ProForm.Item>
                  </Col>
                </>
              );
            }}
          </ProFormDependency>
          <Col xs={{ span: 24 }} md={{ span: 12 }} lg={{ span: 5 }}>
            <ProFormRadio.Group
              name={["pub", "accept_command"]}
              label="Aceita comanda?"
              initialValue={false}
              options={[
                {
                  label: "Não",
                  value: false,
                },
                {
                  label: "Sim",
                  value: true,
                },
              ]}
            />
          </Col>
          <Col xs={{ span: 24 }} md={{ span: 12 }} lg={{ span: 7 }}>
            <ProFormRadio.Group
              name={["pub", "advance_sale_app"]}
              label="Venda antecipada no app?"
              initialValue={false}
              disabled
              options={[
                {
                  label: "Não",
                  value: false,
                },
                {
                  label: "Sim",
                  value: true,
                },
              ]}
            />
          </Col>
          <Col xs={{ span: 24 }} md={{ span: 12 }} lg={{ span: 8 }}>
            <ProFormRadio.Group
              name={["pub", "advance_sale_ecommerce"]}
              label="Venda antecipada no e-commerce?"
              initialValue={false}
              disabled
              options={[
                {
                  label: "Não",
                  value: false,
                },
                {
                  label: "Sim",
                  value: true,
                },
              ]}
            />
          </Col>
          <Col xs={{ span: 24 }} md={{ span: 12 }} lg={{ span: 7 }}>
            <ProFormRadio.Group
              name={["pub", "issue_invoice"]}
              label="Emitir nota fiscal?"
              initialValue={false}
              disabled
              options={[
                {
                  label: "Não",
                  value: false,
                },
                {
                  label: "Sim",
                  value: true,
                },
              ]}
            />
          </Col>
          <Col xs={{ span: 24 }}>
            <ProFormDigit
              name={["pub", "production_password_init"]}
              label="Início da senha de produção"
              placeholder="0"
              initialValue={1}
              rules={[{ required: true }]}
              help="Esse é o número que vai iniciar a impressão das senhas de produção."
            />
          </Col>
        </Row>
      </Card>
    </Row>
  );
};
