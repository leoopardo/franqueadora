import {
  ProFormDependency,
  ProFormDigit,
  ProFormField,
  ProFormInstance,
  ProFormList,
  ProFormRadio,
  StepsForm,
} from "@ant-design/pro-components";
import TableComponent from "@components/table/tableComponent";
import { Button, Col, Row, Switch, Typography } from "antd";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { CreateSectorModal } from "./createSubSector";

interface SectorFirstStepProps {
  setHaveSubSectors: Dispatch<SetStateAction<boolean>>;
}

export const SectorFirstStep = ({
  setHaveSubSectors,
}: SectorFirstStepProps) => {
  const stepOneRef = useRef<ProFormInstance>();
  const waitTime = (_values: any) => {
    return new Promise<boolean>((resolve) => {
      return resolve(true);
    });
  };
  const [createSectorModalIsOpen, setCreateSectorModalIsOpen] =
    useState<boolean>(false);
  const [tableParams, setTableParams] = useState<any>({
    page: 1,
    size: 20,
    totalItems: stepOneRef?.current?.getFieldValue("sub-sectors")?.length,
  });
  const [data, setData] = useState<any[]>(
    stepOneRef?.current?.getFieldValue("sub-sectors") || []
  );

  useEffect(() => {
    if (data.length >= 1) {
      setHaveSubSectors(true);
    } else {
      setHaveSubSectors(false);
    }
  }, [data]);

  return (
    <StepsForm.StepForm<{
      address: string;
    }>
      name="base"
      title="Detalhes do setor"
      onFinish={async () => {
        await waitTime(2000);
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
      <Row style={{ width: "100%", marginTop: -40 }} gutter={8}>
        <Col span={24}>
          <ProFormField
            rules={[{ required: true }]}
            name={"name"}
            label="Nome do setor"
          />
        </Col>

        <Col xs={{ span: 24 }} md={{ span: 6 }}>
          <ProFormRadio.Group
            name={"delivery_place"}
            label="Possui local de entrega?"
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

        <ProFormDependency name={["delivery_place"]}>
          {({ delivery_place }) => {
            if (delivery_place === false) {
              return null;
            }

            return (
              <Col xs={{ span: 24 }} md={{ span: 11 }}>
                {" "}
                <Row style={{ width: "100%" }} gutter={8}>
                  <Col xs={{ span: 24 }} md={{ span: 12 }}>
                    <ProFormDigit name="start" label="Começo" />
                  </Col>
                  <Col xs={{ span: 24 }} md={{ span: 12 }}>
                    <ProFormDigit name="end" label="Final" />
                  </Col>
                </Row>
              </Col>
            );
          }}
        </ProFormDependency>

        <Col xs={{ span: 24 }} md={{ span: 6 }}>
          <ProFormRadio.Group
            name={"footer"}
            label="Informações de rodapé"
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
        <ProFormDependency name={["footer"]}>
          {({ footer }) => {
            if (footer === false) {
              return null;
            }

            return (
              <>
                <Col xs={{ span: 24 }} md={{ span: 24 }}>
                  <ProFormField name="first_footer_line" label="Linha 1" />
                </Col>
                <Col xs={{ span: 24 }} md={{ span: 24 }}>
                  <ProFormField name="second_footer_line" label="Linha 2" />
                </Col>
                <Col xs={{ span: 24 }} md={{ span: 24 }}>
                  <ProFormField name="third_footer_line" label="Linha 3" />
                </Col>
              </>
            );
          }}
        </ProFormDependency>

        <ProFormList
          style={{ display: "none" }}
          name={"sub_sectors"}
          initialValue={[]}
        ></ProFormList>

        <Col span={24}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: 8,
              alignItems: "center",
            }}
          >
            <Typography.Title level={5}>Sub-Setores</Typography.Title>
            {data.length >= 1 && (
              <Button
                shape="round"
                onClick={() => {
                  setCreateSectorModalIsOpen(true);
                }}
              >
                Adicionar subsetor
              </Button>
            )}
          </div>
          <TableComponent<{
            key: string;
            active: boolean;
            name: string;
            "sub-sectors": any[];
          }>
            data={{
              items: data,
              page: tableParams.page,
              size: tableParams.size,
              totalItems: data?.length ?? 0,
            }}
            params={tableParams}
            setParams={setTableParams}
            actions={[
              {
                label: "Editar",
                onClick(RowItemI) {
                  console.log("RowItemI", RowItemI);
                },
              },
              {
                label: "Excluir",
                onClick(RowItemI) {
                  stepOneRef?.current?.setFieldValue(
                    "sub-sectors",
                    data.filter((item) => item.key !== RowItemI?.key)
                  );
                  setData((state) =>
                    state.filter((item) => item.key !== RowItemI?.key)
                  );
                },
              },
            ]}
            columns={[
              {
                key: "active",
                head: "Status",
                custom(row) {
                  return <Switch checked={row.active} />;
                },
              },
              { key: "name", head: "Nome do sub-setor" },
            ]}
            emptyAction={() => {
              setCreateSectorModalIsOpen(true);
            }}
          />
        </Col>
      </Row>

      <CreateSectorModal
        open={createSectorModalIsOpen}
        setOpen={setCreateSectorModalIsOpen}
        setDataSource={setData}
        formRef={stepOneRef.current}
      />
    </StepsForm.StepForm>
  );
};
