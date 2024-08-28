import { PlusOutlined } from "@ant-design/icons";
import { ProFormInstance } from "@ant-design/pro-components";
import TableComponent from "@components/table/tableComponent";
import { SelectTerminal } from "../../../../../../../components/selects/SelectTerminal";
import { CreateMenuModal } from "../../../../../service_orders/menus/components/mutate/CreateMenuModal";
import { useListMenus } from "../../../../../../../services/menus/listMenus";
import { CalculatorIcon } from "@heroicons/react/24/outline";
import defaultTheme from "@styles/default";
import { Button, Card, Col, Divider, Form, Modal, Row, Select } from "antd";
import { useEffect, useState } from "react";
interface ConfigI {
  formRef?: ProFormInstance;
  hidden?: boolean;
  stepperRef?: ProFormInstance;
}

export const Terminals = ({ formRef, hidden }: ConfigI) => {
  const [createMenuModalIsOpen, setCreateMenuModalIsOpen] =
    useState<boolean>(false);
  const [tableParams, setTableParams] = useState<any>({
    page: 1,
    size: 20,
    totalItems: formRef?.getFieldValue(["pub", "terminals"])?.length,
  });
  const [data, setData] = useState<any[]>(
    formRef?.getFieldValue(["pub", "terminals"]) || []
  );

  const menus = useListMenus({ page: 0, size: 500 });
  const [updateData, setUpdateData] = useState<any>();
  const [isAddTerminalModalOpen, setIsAddTerminalModalOpen] =
    useState<boolean>(false);
  const [selectedTerminal, setSelectedTerminal] = useState<any>();
  const [selectedMenu, setSelectedMenu] = useState<any>();
  const [selectedSector, setSelectedSector] = useState<any>();

  useEffect(() => {
    setData(formRef?.getFieldValue(["pub", "terminals"]));
    console.log(formRef?.getFieldValue(["pub", "terminals"]));
  }, [formRef?.getFieldsValue()]);

  useEffect(() => {
    if (updateData) {
      setCreateMenuModalIsOpen(true);
    }
  }, [updateData]);

  return (
    <Card style={{ width: "100%", display: hidden ? "none" : undefined }}>
      <Row style={{ width: "100%" }} gutter={[8, 8]}>
        <Col span={24}>
          <Divider orientation="left" style={{ marginTop: 0 }}>
            <CalculatorIcon
              height={20}
              style={{ marginRight: 8, marginBottom: -4 }}
              color={defaultTheme.primary}
            />
            Terminais do evento
          </Divider>
        </Col>

        {/* <ProFormList
          // style={{ display: "none" }}
          name={["pub", "terminals"]}
        ></ProFormList> */}

        <Col span={24}>
          <TableComponent<{
            key: string;
            serial: string;
            terminal_id: string;
            menu_name: string;
            menu_id: string;
            id: string;
            sector_id: string;
            sector_name: string;
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
                },
              },
              {
                label: "Excluir",
                onClick(RowItemI) {
                  formRef?.setFieldValue(
                    ["pub", "terminals"],
                    formRef
                      ?.getFieldValue(["pub", "terminals"])
                      ?.filter((item: any) => item.id !== RowItemI?.id)
                  );
                  setData(
                    data?.filter((item: any) => item?.id !== RowItemI?.id)
                  );
                },
              },
            ]}
            columns={[
              { key: "serial", head: "Número de série" },
              {
                key: "menu_name",
                head: "Cardápio",
                custom: (row: any) => row.menu_name || row?.menu?.name,
              },
              {
                key: "sector_name",
                head: "Setor",
                custom: (row: any) => row.sector_name || row?.sector?.name,
              },
            ]}
            emptyAction={() => {
              setIsAddTerminalModalOpen(true);
            }}
          />
        </Col>
      </Row>
      {createMenuModalIsOpen && (
        <CreateMenuModal
          open={createMenuModalIsOpen}
          setOpen={setCreateMenuModalIsOpen}
        />
      )}

      <Modal
        title="Vincular terminal ao evento"
        open={isAddTerminalModalOpen}
        onCancel={() => setIsAddTerminalModalOpen(false)}
        okButtonProps={{ disabled: !selectedTerminal || !selectedMenu }}
        onOk={() => {
          const menus = formRef?.getFieldValue(["pub", "terminals"]) || [];
          formRef?.setFieldValue(
            ["pub", "terminals"],
            [
              ...menus,
              {
                serial: selectedTerminal.serial,
                terminal_id: selectedTerminal.id,
                menu_name: selectedMenu.name,
                menu_id: selectedMenu.id,
                sector_id: selectedSector.sector_id,
                sector_name: selectedSector.sector_name,
              },
            ]
          );
          setData([...menus, selectedTerminal]);
        }}
      >
        <Form layout="vertical">
          <Row gutter={[8, 8]}>
            <Col span={24}>
              <Form.Item label="Terminal">
                <SelectTerminal
                  placeholder="Selecione um terminal para vincular"
                  onSelect={(_value, option) => {
                    setSelectedTerminal({
                      serial: option?.label,
                      id: option?.value,
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
                        Cadastrar um terminal
                      </Button>
                    </>
                  )}
                />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label="Cardápio">
                <Select
                  placeholder="Selecione um cardápio para vincular"
                  style={{ width: "100%" }}
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
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label="Cardápio">
                <Select
                  placeholder="Selecione um cardápio para vincular"
                  style={{ width: "100%" }}
                  options={formRef
                    ?.getFieldValue(["pub", "sectors"])
                    // .filter((m) => !data?.find((d) => d.id === m.id))
                    ?.map(
                      (s: {
                        key: string;
                        active: boolean;
                        name: string;
                        sub_sectors: any[];
                        id?: string;
                      }) => ({
                        label: s?.name,
                        value: s?.id || s?.name,
                      })
                    )}
                  showSearch
                  onSelect={(_value, option) => {
                    setSelectedSector({
                      sector_id: option?.value,
                      sector_name: option?.label,
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
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </Card>
  );
};
