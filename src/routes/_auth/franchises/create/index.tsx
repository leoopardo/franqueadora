import { createFileRoute } from "@tanstack/react-router";
import { Col, Divider, Layout, Row, message } from "antd";
import { PageHeader } from "../../../../components/header/pageHeader";
import {
  ProCard,
  ProForm,
  ProFormCheckbox,
  ProFormDatePicker,
  ProFormDateRangePicker,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
  StepsForm,
} from "@ant-design/pro-components";
import DDDlist from "../../../../utils/DDD";
import { useRef, useState } from "react";
import { useGetDDDs } from "../../../../services/brasilApi/getDDD";

export const Route = createFileRoute("/_auth/franchises/create/")({
  component: CreateFranchise,
});

const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

function CreateFranchise() {
  const [ddd, setDDD] = useState<string[]>([]);
  const { data, error, isLoading } = useGetDDDs(ddd);
  const stepOneRef = useRef<any>(null);

  console.log(stepOneRef);

  return (
    <Row gutter={[8, 8]} style={{ width: "100%" }} justify={"center"}>
      <Row gutter={[8, 8]} style={{ width: "100%" }} align="middle">
        <Col xs={{ span: 24 }} md={{ span: 14 }}>
          <PageHeader
            title="Cadastrar franquia"
            subtitle="Preencha todos os campos para adicionar uma nova franquia"
          />
        </Col>
      </Row>
      <Col md={{ span: 24 }} xs={{ span: 24 }} style={{ marginTop: 16 }}>
        <ProCard>
          <StepsForm<{
            name: string;
          }>
            onFinish={async () => {
              message.success("Franquia criada com sucesso!");
            }}
            formProps={{
              validateMessages: {
                required: "Este campo é obrigatório",
              },
            }}
          >
            <StepsForm.StepForm<{
              name: string;
              cnpj: number;
              legal_name: string;
            }>
              name="base"
              title="Informções da empresa"
              onFinish={async () => {
                await waitTime(2000);
                return true;
              }}
              size="large"
              grid
              formRef={stepOneRef}
            >
              {" "}
              <Row style={{ width: "100%" }} gutter={8}>
                <Col md={{ span: 6 }} xs={{ span: 24 }}>
                  <ProFormText
                    name="name"
                    label="Nome da franquia"
                    placeholder="Digite o nome da franquia"
                    rules={[{ required: true }]}
                  />
                </Col>
                <Col md={{ span: 6 }} xs={{ span: 24 }}>
                  {" "}
                  <ProFormText
                    name="cnpj"
                    label="CNPJ"
                    placeholder="Digite o CNPJ"
                    rules={[{ required: true }]}
                  />
                </Col>
                <Col md={{ span: 6 }} xs={{ span: 24 }}>
                  <ProFormText
                    name="legal_name"
                    label="Razão social"
                    placeholder="Digite a razão social"
                    rules={[{ required: true }]}
                  />
                </Col>
                <Col md={{ span: 6 }} xs={{ span: 24 }}>
                  <ProFormText
                    name="estadual_subscription"
                    label="Inscrição estadual"
                    placeholder="Digite a inscição estadual"
                    rules={[{ required: true }]}
                  />
                </Col>
                <Col md={{ span: 24 }} xs={{ span: 24 }}>
                  <Divider orientation="left">Endereço</Divider>
                </Col>
                <Col md={{ span: 4 }} xs={{ span: 24 }}>
                  <ProFormText
                    name="cep"
                    label="CEP"
                    placeholder="Digite o CEP"
                    rules={[{ required: true }]}
                  />
                </Col>
                <Col md={{ span: 6 }} xs={{ span: 24 }}>
                  <ProFormText
                    name="address"
                    label="Endereço"
                    placeholder="Digite o Endereço"
                    rules={[{ required: true }]}
                  />
                </Col>
                <Col md={{ span: 2 }}>
                  <ProFormText
                    name="number"
                    label="Número"
                    placeholder="000"
                    rules={[{ required: true }]}
                  />
                </Col>
                <Col md={{ span: 4 }} xs={{ span: 24 }}>
                  <ProFormText
                    name="state"
                    label="Estado"
                    placeholder="Digite o estado"
                    rules={[{ required: true }]}
                  />
                </Col>
                <Col md={{ span: 4 }} xs={{ span: 24 }}>
                  <ProFormText
                    name="city"
                    label="Cidade"
                    placeholder="Digite a cidade"
                    rules={[{ required: true }]}
                  />
                </Col>
                <Col md={{ span: 4 }} xs={{ span: 24 }}>
                  <ProFormText
                    name="neightberhood"
                    label="Bairro"
                    placeholder="Digite o bairro"
                    rules={[{ required: true }]}
                  />
                </Col>
                <Col md={{ span: 24 }} xs={{ span: 24 }}>
                  <ProFormText
                    name="complement"
                    label="Complemento"
                    placeholder="Digite algum complemento"
                  />
                </Col>
                <Col md={{ span: 4 }} xs={{ span: 24 }}>
                  <ProFormSelect
                    name="area_code"
                    label="Código de áreal"
                    placeholder="Selecione o DDD"
                    mode="multiple"
                    options={DDDlist}
                    rules={[{ required: true }]}
                    onChange={(value: any) => setDDD(value)}
                  />
                </Col>
                <Col md={{ span: 6 }} xs={{ span: 24 }}>
                  <ProFormSelect
                    name="munic"
                    label="Município"
                    placeholder="Selecione o município"
                    mode="multiple"
                    options={data?.cities}
                    disabled={!data}
                    rules={[{ required: true }]}
                  />
                </Col>
              </Row>
              <ProFormDatePicker name="date" label="日期" />
              <ProFormDateRangePicker name="dateTime" label="时间区间" />
              <ProFormTextArea
                name="remark"
                label="备注"
                placeholder="请输入备注"
              />
            </StepsForm.StepForm>
            <StepsForm.StepForm<{
              checkbox: string;
            }>
              name="checkbox"
              title="设置参数"
              stepProps={{
                description: "这里填入运维参数",
              }}
              onFinish={async () => {
                await waitTime(2000);
                return true;
              }}
            >
              <ProFormCheckbox.Group
                name="checkbox"
                label="迁移类型"
                width="lg"
                options={["结构迁移", "全量迁移", "增量迁移", "全量校验"]}
              />
              <ProForm.Group>
                <ProFormText name="dbname" label="业务 DB 用户名" />
                <ProFormDatePicker
                  name="datetime"
                  label="记录保存时间"
                  width="sm"
                />
                <ProFormCheckbox.Group
                  name="checkbox"
                  label="迁移类型"
                  options={["完整 LOB", "不同步 LOB", "受限制 LOB"]}
                />
              </ProForm.Group>
            </StepsForm.StepForm>
            <StepsForm.StepForm
              name="time"
              title="发布实验"
              stepProps={{
                description: "这里填入发布判断",
              }}
            >
              <ProFormCheckbox.Group
                name="checkbox"
                label="部署单元"
                rules={[
                  {
                    required: true,
                  },
                ]}
                options={["部署单元1", "部署单元2", "部署单元3"]}
              />
              <ProFormSelect
                label="部署分组策略"
                name="remark"
                rules={[
                  {
                    required: true,
                  },
                ]}
                initialValue="1"
                options={[
                  {
                    value: "1",
                    label: "策略一",
                  },
                  { value: "2", label: "策略二" },
                ]}
              />
              <ProFormSelect
                label="Pod 调度策略"
                name="remark2"
                initialValue="2"
                options={[
                  {
                    value: "1",
                    label: "策略一",
                  },
                  { value: "2", label: "策略二" },
                ]}
              />
            </StepsForm.StepForm>
          </StepsForm>
        </ProCard>
      </Col>
    </Row>
  );
}
