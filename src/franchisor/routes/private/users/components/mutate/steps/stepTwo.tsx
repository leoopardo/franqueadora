import {
  ProFormCheckbox,
  ProFormField,
  ProFormInstance,
  ProFormSelect,
  StepsForm,
} from "@ant-design/pro-components";
import { Services } from "@franchisor/services";
import { Col, Divider, Row, Table } from "antd";
import { useEffect, useRef } from "react";
import { useBreakpoints } from "../../../../../../../hooks/useBreakpoints";

export const StepTwo = ({
  draft,
}: {
  update?: boolean;
  formRef?: React.RefObject<ProFormInstance>;
  draft?: any;
}) => {
  const { roles } = Services.users;
  const stepTwoRef = useRef<ProFormInstance>(null);
  const { isXs } = useBreakpoints();
  const { data } = roles();

  const waitTime = (time: number = 100) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, time);
    });
  };

  useEffect(() => {
    if (draft) {
      stepTwoRef?.current?.setFieldsValue(draft);
    }
  }, [draft]);

  return (
    <StepsForm.StepForm<{ permissions: any[] }>
      name="permissions"
      title="Permissões"
      onFinish={async (form) => {
        console.log(form);

        await waitTime(500);
        return true;
      }}
      size="large"
      grid
      formRef={stepTwoRef}
      initialValues={{}}
      onFinishFailed={() => {
        const fields = stepTwoRef?.current?.getFieldsError();
        const firstErrorField = fields?.find(
          (field: any) => field.errors.length > 0
        );
        if (firstErrorField) {
          stepTwoRef?.current?.scrollToField(firstErrorField.name[0], {
            behavior: "smooth",
            block: "center",
          });
        }
      }}
    >
      <Row
        style={{ width: isXs ? "75%" : "100%", justifyContent: "center" }}
        gutter={[8, 8]}
      >
        <Col md={{ span: 24 }} xs={{ span: 24 }}>
          <Divider orientation="left">
            Cadastre as permissões do usuário
          </Divider>
        </Col>
        <Col md={{ span: 24 }} xs={{ span: 24 }}>
          <ProFormSelect
            name="id_role"
            label="Tipo de perfil"
            rules={[{ required: true, message: "Selecione um perfil" }]}
            options={data?.items.map((profile) => ({
              value: profile.id,
              label: profile.name,
              permissions: profile.FeatureRoleTemplate,
            }))}
            fieldProps={{
              onChange: (_value, option) => {
                console.log("Selected Option:", option);
                console.log(
                  "Form Values Before:",
                  stepTwoRef?.current?.getFieldsValue()
                );
                for (const [index, permission] of (
                  option as any
                ).permissions.entries()) {
                  stepTwoRef?.current?.setFieldValue(
                    ["permission", index, "id_feature"],
                    permission.id_feature
                  );
                  stepTwoRef?.current?.setFieldValue(
                    ["permission", index, "view"],
                    permission.view
                  );
                  stepTwoRef?.current?.setFieldValue(
                    ["permission", index, "create"],
                    permission.create
                  );
                  stepTwoRef?.current?.setFieldValue(
                    ["permission", index, "delete"],
                    permission.delete
                  );
                }
              },
            }}
          />
        </Col>
        {data?.items && (
          <Col md={{ span: 24 }} xs={{ span: 24 }}>
            <Table
              size="small"
              dataSource={data?.items[0]?.FeatureRoleTemplate}
              sticky={{ offsetScroll: 500 }}
              pagination={false}
              columns={[
                {
                  key: "name",
                  dataIndex: ["Feature", "name"],
                  title: "Nome",
                  width: isXs ? 150 : 250,
                  render: (value, row, index) => {
                    stepTwoRef?.current?.setFieldValue(
                      ["permission", index, "id"],
                      row.id_feature
                    );
                    return (
                      <>
                        <ProFormField
                          hidden
                          name={["permission", index, "id_feature"]}
                          style={{ display: "none" }}
                          initialValue={row.id_feature}
                        />
                        {value}
                      </>
                    );
                  },
                },
                {
                  key: "view",
                  dataIndex: "view",
                  title: "Visualizar",
                  render: (_value, _row, index) => (
                    <ProFormCheckbox
                      name={["permission", index, "view"]}
                      initialValue={false}
                      noStyle
                    />
                  ),
                  width: 80,
                },
                {
                  key: "create",
                  dataIndex: "create",
                  title: "Criar/Editar",
                  render: (_value, _row, index) => (
                    <ProFormCheckbox
                      name={["permission", index, "create"]}
                      initialValue={false}
                      noStyle
                    />
                  ),
                  width: 80,
                },

                {
                  key: "delete",
                  dataIndex: "delete",
                  title: "Deletar",
                  render: (_value, _row, index) => (
                    <ProFormCheckbox
                      name={["permission", index, "delete"]}
                      initialValue={false}
                      noStyle
                    />
                  ),
                  width: 80,
                },
              ]}
            />
          </Col>
        )}
      </Row>
    </StepsForm.StepForm>
  );
};
