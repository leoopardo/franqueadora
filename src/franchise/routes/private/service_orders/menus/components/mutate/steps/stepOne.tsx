import {
  ProFormField,
  ProFormInstance,
  StepsForm,
} from "@ant-design/pro-components";
import { ProFormSelectClient } from "@franchise/components/proFormSelects/SelectClients";
import { ProFormSelectPromoters } from "@franchise/components/proFormSelects/SelectPromoters";
import { getMeI } from "@franchise/services/auth/useGetMe";
import { QueryKeys } from "@franchise/services/queryKeys";
import { Col, Divider, Row } from "antd";
import { useRef, useState } from "react";
import { queryClient } from "../../../../../../../../services/queryClient";

export const StepOne = () => {
  const stepOneRef = useRef<ProFormInstance>(null);
  const user = queryClient.getQueryData(QueryKeys.GET_ME) as getMeI;
  const [promoterQuery] = useState<any>({
    franchise_id: user?.Franchise ? user?.Franchise[0].id : undefined,
  });
  const [clientQuery, setClientQuery] = useState<any>({
    franchise_id: user?.Promoter ? user?.Promoter?.id : undefined,
  });

  const waitTime = (time: number = 100) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, time);
    });
  };

  return (
    <StepsForm.StepForm<any>
      name="base"
      title="Informações da empresa"
      onFinish={async () => {
        await waitTime(500);
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
      <Row style={{ width: "100%", maxWidth: "90vw" }} gutter={8}>
        <Col span={24}>
          <Divider orientation="left">1. Informações gerais</Divider>
        </Col>
        <Col span={24}>
          <ProFormField
            name="name"
            label="Nome do cardápio"
            placeholder="Nome da empresa"
            rules={[
              {
                required: true,
                message: "O nome da empresa é obrigatório",
              },
            ]}
          />
        </Col>
        {!user?.Promoter?.id && (
          <Col xs={{ span: 24 }} md={{ span: 12 }}>
            <ProFormSelectPromoters
              name={"promoter_id"}
              label="Promotor"
              query={promoterQuery}
              rules={[{ required: true }]}
              fieldProps={{
                onChange: (value) => {
                  setClientQuery({
                    promoter_id: value,
                  });
                  stepOneRef?.current?.setFieldValue("client_id", undefined);
                },
              }}
            />
          </Col>
        )}
        {!user?.Client?.id && (
          <Col xs={{ span: 24 }} md={{ span: 12 }}>
            <ProFormSelectClient
              name={"client_id"}
              label="Cliente"
              query={promoterQuery}
              fieldProps={{
                disabled: !clientQuery.promoter_id,
              }}
            />
          </Col>
        )}
      </Row>
    </StepsForm.StepForm>
  );
};
