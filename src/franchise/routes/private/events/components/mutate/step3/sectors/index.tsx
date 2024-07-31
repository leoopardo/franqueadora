import { ProFormInstance, ProFormList } from "@ant-design/pro-components";
import TableComponent from "@components/table/tableComponent";
import { Squares2X2Icon } from "@heroicons/react/24/outline";
import defaultTheme from "@styles/default";
import { Button, Card, Col, Divider, Row, Switch } from "antd";
import { useEffect, useState } from "react";
import { CreateSectorModal } from "./components/createSectorModal";
interface ConfigI {
  formRef?: ProFormInstance;
  hidden?: boolean;
}

export const Sectors = ({ formRef, hidden }: ConfigI) => {
  const [createSectorModalIsOpen, setCreateSectorModalIsOpen] =
    useState<boolean>(false);
  const [tableParams, setTableParams] = useState<any>({
    page: 1,
    size: 20,
    totalItems: formRef?.getFieldValue(["pub", "sectors"])?.length,
  });
  const [data, setData] = useState<any[]>(
    formRef?.getFieldValue(["pub", "sectors"]) || []
  );
  const [updateData, setUpdateData] = useState<any>();

  useEffect(() => {
    setData(formRef?.getFieldValue(["pub", "sectors"]));
  }, [formRef?.getFieldsValue()]);

  useEffect(() => {
    if (updateData) {
      setCreateSectorModalIsOpen(true);
    }
  }, [updateData]);

  return (
    <Card style={{ width: "100%", display: hidden ? "none" : undefined }}>
      <Row style={{ width: "100%" }} gutter={[8, 8]}>
        <Col span={24}>
          <Divider orientation="left" style={{ marginTop: 0 }}>
            <Squares2X2Icon
              height={20}
              style={{ marginRight: 8, marginBottom: -4 }}
              color={defaultTheme.primary}
            />
            Setores do evento
          </Divider>
        </Col>
        {data?.length >= 1 && (
          <Col
            span={24}
            style={{ display: "flex", flexDirection: "row-reverse" }}
          >
            <Button
              shape="round"
              onClick={() => setCreateSectorModalIsOpen(true)}
            >
              Adicionar setor
            </Button>
          </Col>
        )}
        <ProFormList
          style={{ display: "none" }}
          name={["pub", "sectors"]}
          onAfterRemove={(index) => {
            console.log("index", index);
          }}
        ></ProFormList>

        <Col span={24}>
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
                  setUpdateData(RowItemI);
                  console.log("RowItemI", RowItemI);
                },
              },
              {
                label: "Excluir",
                onClick(RowItemI) {
                  formRef?.setFieldValue(
                    ["pub", "sectors"],
                    formRef
                      ?.getFieldValue(["pub", "sectors"])
                      ?.filter((item: any) => item.key !== RowItemI?.key)
                  );
                  setData(
                    formRef
                      ?.getFieldValue(["pub", "sectors"])
                      ?.filter((item: any) => item.key !== RowItemI?.key)
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
              { key: "name", head: "Setor" },
              {
                key: "sub-sectors",
                head: "Sub-setores",
                custom(row) {
                  return row["sub-sectors"]?.length ?? "Não possui";
                },
              },
            ]}
            emptyAction={() => {
              setCreateSectorModalIsOpen(true);
            }}
          />
        </Col>
      </Row>
      {createSectorModalIsOpen && (
        <CreateSectorModal
          open={createSectorModalIsOpen}
          setOpen={setCreateSectorModalIsOpen}
          formRef={formRef}
          setDataSource={setData}
          dataSource={data}
          updateData={updateData}
          setUpdateData={setUpdateData}
        />
      )}
    </Card>
  );
};
