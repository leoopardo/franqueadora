import {
  ProFormDigit,
  ProFormInstance,
  ProFormList,
  ProFormSelect,
} from "@ant-design/pro-components";
import { useGetPromoterById } from "@franchise/services/promoters/getPromoterById";
import { ScaleIcon } from "@heroicons/react/24/outline";
import { useBreakpoints } from "@hooks/useBreakpoints";
import defaultTheme from "@styles/default";
import { cardBrands } from "@utils/cardBrands";
import { Card, Col, Divider, Row, Typography } from "antd";
import { useEffect, useState } from "react";

interface ConfigI {
  formRef?: ProFormInstance;
  hidden?: boolean;
}

export const Agreements = ({ formRef, hidden }: ConfigI) => {
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const { data } = useGetPromoterById(formRef?.getFieldValue("promoter_id"));
  const { isSm } = useBreakpoints();

  useEffect(() => {
    if (data?.agrupatedAgreements) {
      formRef?.setFieldValue("agreements", data.agrupatedAgreements);
    }
  }, [data]);

  return (
    <Card
      style={{
        width: "100%",
        maxWidth: isSm ? "100vw" : "70vw",
        display: hidden ? "none" : undefined,
      }}
    >
      <Row style={{ width: "100%" }} gutter={[8, 0]}>
        <Col span={24}>
          <Divider orientation="left" style={{ marginTop: 0 }}>
            <ScaleIcon
              height={20}
              style={{ marginRight: 8, marginBottom: -4 }}
              color={defaultTheme.primary}
            />
            Acordo comercial
          </Divider>
        </Col>
        <Col span={24}>
          <Typography.Title level={4}>Bar físico. </Typography.Title>
        </Col>
        <Col span={24}>
          <ProFormSelect
            name={["agreements_type"]}
            label="Tipo de cobrança"
            rules={[{ required: true }]}
            options={[
              { label: "Consumidor", value: "consumidor" },
              { label: "Produtor", value: "produtor" },
            ]}
          />
        </Col>
        <Col span={24}>
          {data?.agrupatedAgreements && (
            <ProFormList
              name={"agreements"}
              alwaysShowItemLabel
              creatorButtonProps={{
                position: "bottom",
                creatorButtonText: "Adicionar taxas por bandeiras",
                type: "primary",
              }}
              deleteIconProps={{ tooltipText: "Remover bandeira" }}
              initialValue={data?.agrupatedAgreements}
            >
              <Row gutter={8}>
                <Col span={24}>
                  <ProFormSelect
                    name="brand"
                    mode="multiple"
                    label="Bandeira(s)"
                    placeholder="Selecione a bandeira do cartão"
                    onChange={() => {
                      const brands = [];
                      for (const brand of formRef?.getFieldValue(
                        "agreements"
                      )) {
                        brands.push(...brand.brand);
                      }
                      setSelectedBrands([...brands]);
                    }}
                    options={cardBrands
                      .filter((brand) => !selectedBrands.includes(brand.value))
                      .map((brand) => ({
                        label: (
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: 8,
                            }}
                          >
                            {brand.Icon}
                            <Typography.Text>{brand.label}</Typography.Text>
                          </div>
                        ),
                        value: brand.value,
                      }))}
                  />
                </Col>
                <Col xs={{ span: 24 }} md={{ span: 12 }} lg={{ span: 8 }}>
                  <ProFormDigit
                    name="debit_transaction_fee"
                    label="Taxa de débito"
                    max={100}
                    rules={[{ required: true }]}
                    fieldProps={{ precision: 2, suffix: "%" }}
                  />
                </Col>
                <Col xs={{ span: 24 }} md={{ span: 12 }} lg={{ span: 8 }}>
                  <ProFormDigit
                    name="credit_transaction_fee"
                    label="Taxa de crédito"
                    max={100}
                    rules={[{ required: true }]}
                    fieldProps={{ precision: 2, suffix: "%" }}
                  />
                </Col>
                <Col xs={{ span: 24 }} md={{ span: 12 }} lg={{ span: 8 }}>
                  <ProFormDigit
                    name="antecipation_fee"
                    label="Taxa de antecipação"
                    max={100}
                    rules={[{ required: true }]}
                    fieldProps={{ precision: 2, suffix: "%" }}
                  />
                </Col>
              </Row>
            </ProFormList>
          )}
        </Col>
      </Row>
    </Card>
  );
};
