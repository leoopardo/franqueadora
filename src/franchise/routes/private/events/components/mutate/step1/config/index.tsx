import {
  ProFormDatePicker,
  ProFormField,
  ProFormInstance,
  ProFormSelect,
  ProFormTimePicker,
} from "@ant-design/pro-components";
import { getMeI } from "@franchise/services/auth/useGetMe";
import { ClientParams } from "@franchise/services/clients/__interfaces/clients.interface";
import { useListClients } from "@franchise/services/clients/listClients";
import { useListPromoters } from "@franchise/services/promoters/listPromoters";
import { QueryKeys } from "@franchise/services/queryKeys";
import {
  useGetPosModules
} from "@franchise/services/utils/getPosModules";
import { CalendarDaysIcon, Cog6ToothIcon } from "@heroicons/react/24/outline";
import defaultTheme from "@styles/default";
import { Card, Col, Divider, Row } from "antd";
import dayjs from "dayjs";
import { useState } from "react";
import { queryClient } from "../../../../../../../../services/queryClient";

interface ConfigI {
  formRef?: ProFormInstance;
}

export const Config = ({ formRef }: ConfigI) => {
  const [ClientParams, setClientParams] = useState<ClientParams>({
    page: 0,
    size: 500,
  });
  const [modulesParams, setModulesParams] = useState<any>({});
  const listPromoter = useListPromoters({
    page: 0,
    size: 500,
  });
  const listClient = useListClients(ClientParams);
  const listPOSModules = useGetPosModules(modulesParams);

  const user = queryClient.getQueryData(QueryKeys.GET_ME) as getMeI;

  return (
    <Row gutter={[8, 8]} style={{ width: "100%" }}>
      <Card>
        <Row style={{ width: "100%" }} gutter={[8, 0]}>
          <Col span={24}>
            <Divider orientation="left" style={{ marginTop: 0 }}>
              <Cog6ToothIcon
                height={20}
                style={{ marginRight: 8, marginBottom: -4 }}
                color={defaultTheme.primary}
              />
              Configurações do evento
            </Divider>
          </Col>{" "}
          {!user?.Client && !user?.Promoter && (
            <Col xs={{ span: 24 }} md={{ span: 12 }} lg={{ span: 8 }}>
              <ProFormSelect
                name="promoter_id"
                label="Promotor"
                rules={[{ required: true }]}
                options={listPromoter.data?.items.map((i) => ({
                  label: i.promoter_name,
                  value: i.id,
                }))}
                onChange={(value) => {
                  if (!value) {
                    setModulesParams((state: any) => ({
                      ...state,
                      promoter_id: undefined,
                    }));
                    setClientParams((state) => ({
                      ...state,
                      w: undefined,
                    }));
                  } else {
                    setModulesParams((state: any) => ({
                      ...state,
                      promoter_id: value,
                    }));
                    setClientParams((state) => ({
                      ...state,
                      w: `promoter_id=[${value}]`,
                    }));
                  }
                }}
                style={{ width: "100%" }}
              />
            </Col>
          )}
          {!user?.Client && (
            <Col xs={{ span: 24 }} md={{ span: 12 }} lg={{ span: 8 }}>
              <ProFormSelect
                name="client_id"
                label="Cliente"
                disabled={!formRef?.getFieldValue("promoter_id")}
                onChange={(value) => {
                  if (!value) {
                    setModulesParams((state: any) => ({
                      ...state,
                      client_id: undefined,
                    }));
                  } else {
                    setModulesParams((state: any) => ({
                      ...state,
                      client_id: value,
                    }));
                  }
                }}
                options={listClient.data?.items.map((i) => ({
                  label: i.name,
                  value: i.id,
                }))}
                style={{ width: "100%" }}
              />
            </Col>
          )}
          <Col xs={{ span: 24 }} md={{ span: 12 }} lg={{ span: 8 }}>
            <ProFormSelect
              name="modules"
              mode="multiple"
              label="Módulos"
              options={listPOSModules?.PosModulesData?.filter(
                (module) => module.active
              ).map((module) => ({
                label: module.name,
                value: module.id,
              }))}
              rules={[{ required: true }]}
              style={{ width: "100%" }}
            />
          </Col>
          <Col xs={{ span: 24 }} md={{ span: 12 }} lg={{ span: 8 }}>
            <ProFormField
              name="event_name"
              label="Nome do evento"
              rules={[{ required: true }]}
              style={{ width: "100%" }}
            />
          </Col>
          <Col xs={{ span: 24 }} md={{ span: 12 }} lg={{ span: 8 }}>
            <ProFormField
              name="subject"
              label="Assunto"
              rules={[{ required: true }]}
              style={{ width: "100%" }}
            />
          </Col>
          <Col xs={{ span: 24 }} md={{ span: 12 }} lg={{ span: 8 }}>
            <ProFormField
              name="category"
              label="Categoria"
              rules={[{ required: true }]}
              style={{ width: "100%" }}
            />
          </Col>
          <Col xs={{ span: 24 }} md={{ span: 12 }} lg={{ span: 8 }}>
            <ProFormSelect
              name="time_stamp"
              label="Fuso horário"
              rules={[{ required: true }]}
              style={{ width: "100%" }}
            />
          </Col>
          <Col xs={{ span: 24 }} md={{ span: 12 }} lg={{ span: 8 }}>
            <ProFormSelect
              name="currency"
              label="Tipo de moeda"
              rules={[{ required: true }]}
              style={{ width: "100%" }}
            />
          </Col>
        </Row>
      </Card>
      <Card style={{ width: "100%", marginTop: 20 }}>
        <Row style={{ width: "100%" }} gutter={[8, 0]}>
          <Col span={24}>
            <Divider orientation="left" style={{ marginTop: 0 }}>
              <CalendarDaysIcon
                height={20}
                style={{ marginRight: 8, marginBottom: -4 }}
                color={defaultTheme.primary}
              />{" "}
              Data e hora de evento
            </Divider>
          </Col>
          <Col xs={{ span: 24 }} md={{ span: 12 }} lg={{ span: 8 }}>
            <ProFormTimePicker
              name="open_gate"
              label="Abertura dos portões"
              rules={[{ required: true }]}
              fieldProps={{
                style: { width: "100%" },
                format: "HH:mm",
                changeOnScroll: true,
                needConfirm: false,
              }}
            />
          </Col>
          <Col xs={{ span: 24 }} md={{ span: 12 }} />
          <Col xs={{ span: 24 }} md={{ span: 12 }}>
            <ProFormDatePicker
              name="start_date"
              label="Data de início"
              rules={[{ required: true }]}
              fieldProps={{ style: { width: "100%" } }}
            />
          </Col>
          <Col xs={{ span: 24 }} md={{ span: 12 }}>
            <ProFormTimePicker
              name="start_hour"
              label="Hora de início"
              dependencies={["open_gate"]}
              rules={[
                { required: true },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (
                      !value ||
                      getFieldValue("open_gate") <= value ||
                      value > getFieldValue("open_gate")
                    ) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error(
                        "O horário de início deve ser posterior ao de abertura dos portões"
                      )
                    );
                  },
                }),
              ]}
              fieldProps={{
                style: { width: "100%" },
                format: "HH:mm",
                changeOnScroll: true,
                needConfirm: false,
              }}
            />
          </Col>
          <Col xs={{ span: 24 }} md={{ span: 12 }}>
            <ProFormDatePicker
              name="end_date"
              label="Data de término"
              dependencies={["start_date"]}
              rules={[
                { required: true },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("start_date") <= value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error(
                        "O término do evento não pode ser antes do início."
                      )
                    );
                  },
                }),
              ]}
              fieldProps={{ style: { width: "100%" } }}
            />
          </Col>
          <Col xs={{ span: 24 }} md={{ span: 12 }}>
            <ProFormTimePicker
              name="end_hour"
              label="Hora de término"
              dependencies={["start_date", "start_hour"]}
              rules={[
                { required: true },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (
                      dayjs(getFieldValue("start_date")).format(
                        "YYYY-DD-MM"
                      ) ===
                        dayjs(getFieldValue("end_date")).format("YYYY-DD-MM") &&
                      getFieldValue("start_hour") > value
                    ) {
                      return Promise.reject(
                        new Error(
                          "O horário de término do evento deve ser posterior ao de início."
                        )
                      );
                    }
                    if (
                      getFieldValue("start_date") > getFieldValue("end_date")
                    ) {
                      return Promise.reject(
                        new Error(
                          "O horário de término do evento deve ser posterior ao de início."
                        )
                      );
                    }
                    return Promise.resolve();
                  },
                }),
              ]}
              fieldProps={{
                style: { width: "100%" },
                format: "HH:mm",
                changeOnScroll: true,
                needConfirm: false,
              }}
            />
          </Col>
        </Row>
      </Card>
    </Row>
  );
};
