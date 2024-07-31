import { ProFormInstance, ProFormList } from "@ant-design/pro-components";
import TableComponent from "@components/table/tableComponent";
import { ViewColumnsIcon } from "@heroicons/react/24/outline";
import defaultTheme from "@styles/default";
import { Button, Card, Col, Divider, Row, Select, Space } from "antd";
import { useEffect, useState } from "react";
import { CreateMenuModal } from "./components/createMenuModal";
import { PlusOutlined } from "@ant-design/icons";
import { useListMenus } from "@franchise/services/menus/listMenus";
interface ConfigI {
  formRef?: ProFormInstance;
  hidden?: boolean;
  stepperRef?: ProFormInstance;
}

export const Menus = ({ formRef, hidden, stepperRef }: ConfigI) => {
  const [createMenuModalIsOpen, setCreateMenuModalIsOpen] =
    useState<boolean>(false);
  const [tableParams, setTableParams] = useState<any>({
    page: 1,
    size: 20,
    totalItems: formRef?.getFieldValue(["pub", "menus"])?.length,
  });
  const [data, setData] = useState<any[]>(
    formRef?.getFieldValue(["pub", "menus"]) || []
  );
  const menus = useListMenus({ page: 0, size: 500 });
  const [updateData, setUpdateData] = useState<any>();
  const [selectedMenu, setSelectedMenu] = useState<any>();

  useEffect(() => {
    setData(formRef?.getFieldValue(["pub", "menus"]));
  }, [formRef?.getFieldsValue()]);

  useEffect(() => {
    if (updateData) {
      setCreateMenuModalIsOpen(true);
    }
  }, [updateData]);

  console.log(formRef?.getFieldValue(["pub", "menus"]));
  
  return (
    <Card style={{ width: "100%", display: hidden ? "none" : undefined }}>
      <Row style={{ width: "100%" }} gutter={[8, 8]}>
        <Col span={24}>
          <Divider orientation="left" style={{ marginTop: 0 }}>
            <ViewColumnsIcon
              height={20}
              style={{ marginRight: 8, marginBottom: -4 }}
              color={defaultTheme.primary}
            />
            Cardápios do evento
          </Divider>
        </Col>

        <ProFormList
          style={{ display: "none" }}
          name={["pub", "menus"]}
          onAfterRemove={(index) => {
            console.log("index", index);
          }}
        ></ProFormList>
        <Col span={24}>
          <Space.Compact style={{ width: "100%" }} size="large">
            <Select
              placeholder="Selecione um cardápio para vincular"
              style={{ width: "80%" }}
              options={menus?.data?.items
                ?.filter((m) => !data?.find((d) => d.id === m.id))
                ?.map((m) => ({
                  key: m.id,
                  label: m.name,
                  value: m.id,
                  quantity: m.itens_quantity,
                }))}
              showSearch
              onSelect={(_value, option) => {
                console.log(option);
                
                setSelectedMenu({
                  name: option?.label,
                  id: option?.value,
                  items_quantity: option?.quantity,
                });
              }}
              dropdownRender={(menu) => (
                <>
                  {menu}

                  <Button
                    style={{ width: "100%" }}
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={() => setCreateMenuModalIsOpen(true)}
                  >
                    Cadastrar um cardápio
                  </Button>
                </>
              )}
            />
            <Button
              size="large"
              onClick={() => {
                const menus = formRef?.getFieldValue(["pub", "menus"]) || []
                formRef?.setFieldValue(
                  ["pub", "menus"],
                  [...menus, selectedMenu]
                );
              }}
              disabled={!selectedMenu}
            >
              Vincular cardápio
            </Button>
          </Space.Compact>
        </Col>

        <Col span={24}>
          <TableComponent<{
            key: string;
            name: string;
            items_quantity: number;
            id: string;
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
                    ["pub", "menus"],
                    formRef
                      ?.getFieldValue(["pub", "menus"])
                      ?.filter(
                        (item: any) =>
                          item.key !== RowItemI?.key && item.id !== RowItemI?.id
                      )
                  );
                  setData(
                    formRef
                      ?.getFieldValue(["pub", "menus"])
                      ?.filter(
                        (item: any) =>
                          item.key !== RowItemI?.key && item.id !== RowItemI?.id
                      )
                  );
                },
              },
            ]}
            columns={[
              { key: "name", head: "Cardápio" },
              { key: "items_quantity", head: "Quantidade de produtos" },
            ]}
            emptyAction={() => {
              setCreateMenuModalIsOpen(true);
            }}
          />
        </Col>
      </Row>
      {createMenuModalIsOpen && (
        <CreateMenuModal
          open={createMenuModalIsOpen}
          setDataSource={setData}
          setOpen={setCreateMenuModalIsOpen}
          formRef={formRef}
          stepperRef={stepperRef}
        />
      )}
    </Card>
  );
};
