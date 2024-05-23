import {
  ProCard,
  ProForm,
  ProFormCheckbox,
  ProFormDatePicker,
  ProFormSelect,
  ProFormText,
  StepsForm,
} from "@ant-design/pro-components";
import { createLazyFileRoute } from "@tanstack/react-router";
import { Col, Row, message } from "antd";
import { PageHeader } from "../../../../components/header/pageHeader";
import { StepOne } from "./components/stepOne";

export const Route = createLazyFileRoute("/_auth/franchises/create/")({
  component: CreateFranchise,
});

function CreateFranchise() {
  const waitTime = (time: number = 100) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, time);
    });
  };
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
            <StepOne />
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

export default CreateFranchise;
