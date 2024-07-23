import { ProFormInstance, ProFormSelect } from "@ant-design/pro-components";
import TableComponent from "@components/table/tableComponent";
import { Squares2X2Icon } from "@heroicons/react/24/outline";
import defaultTheme from "@styles/default";
import { Card, Col, Divider, Row } from "antd";
import { CreateSectorModal } from "./components/createSectorModal";
import { useState } from "react";
import { set } from "zod";
interface ConfigI {
  formRef?: ProFormInstance;
  hidden?: boolean;
}

export const Sectors = ({ formRef, hidden }: ConfigI) => {
  const [createSectorModalIsOpen, setCreateSectorModalIsOpen] =
    useState<boolean>(false);
  return (
    <Card style={{ width: "100%", display: hidden ? "none" : undefined }}>
      <Row style={{ width: "100%" }} gutter={[8, 0]}>
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
        <Col span={24}>
          <TableComponent
            data={{ items: formRef?.getFieldValue("sectors") }}
            columns={[
              { key: "active", head: "Status" },
              { key: "name", head: "Setor" },
              { key: "subsectors", head: "Sub-setores" },
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
        formRef={formRef}
      />
    </Card>
  );
};
