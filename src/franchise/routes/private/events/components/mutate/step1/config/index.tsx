import {
  ProFormDateTimePicker,
  ProFormField,
  ProFormInstance,
  ProFormList,
  ProFormSelect,
} from "@ant-design/pro-components";
import { ProFormSelectClient } from "@franchise/components/proFormSelects/SelectClients";
import { ProFormSelectPromoters } from "@franchise/components/proFormSelects/SelectPromoters";
import { getMeI } from "@franchise/services/auth/useGetMe";
import { ClientParams } from "@franchise/services/clients/__interfaces/clients.interface";
import { getSelectsData } from "@franchise/services/events/getSelectsData";
import { QueryKeys } from "@franchise/services/queryKeys";
import { useGetPosModules } from "@franchise/services/utils/getPosModules";
import { CalendarDaysIcon, Cog6ToothIcon } from "@heroicons/react/24/outline";
import defaultTheme from "@styles/default";
import { Card, Col, Divider, Row, Typography } from "antd";
import moment from "moment";
import { useEffect, useState } from "react";
import { queryClient } from "../../../../../../../../services/queryClient";

interface ConfigI {
  formRef?: ProFormInstance;
  hidden?: boolean;
}

export const Config = ({ formRef, hidden }: ConfigI) => {
  const [ClientParams, setClientParams] = useState<ClientParams>({
    page: 0,
    size: 500,
  });
  const [modulesParams, setModulesParams] = useState<any>({
    promoter_id: formRef?.getFieldValue("promoter_id"),
  });
  const listPOSModules = useGetPosModules(modulesParams);
  const selects = getSelectsData();

  const user = queryClient.getQueryData(QueryKeys.GET_ME) as getMeI;

  useEffect(() => {
    if (user?.Promoter?.id) {
      formRef?.setFieldValue("promoter_id", user?.Promoter?.id);
      setModulesParams({ promoter_id: user?.Promoter?.id });
    }
    if (user?.Client?.id) {
      formRef?.setFieldValue("client_id", user?.Client?.id);
      setModulesParams({ client_id: user?.Client?.id });
    }
  }, [user]);

  useEffect(() => {
    if (selects.data) {
      formRef?.setFieldValue(
        "timezone_id",
        selects.data.timezones?.find((tz) => tz.label === "Brasília (GMT -3)")
          ?.id
      );

      formRef?.setFieldValue(
        "currency_type",
        selects.data.currency_types?.[0]?.id
      );
    }
  }, [selects]);

  return (
    <Row
      gutter={[8, 8]}
      style={{ width: "100%", display: hidden ? "none" : undefined }}
    >
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
          <Col
            xs={{ span: 24 }}
            md={{ span: 12 }}
            lg={{ span: 8 }}
            style={{
              display: !user?.Client && !user?.Promoter ? undefined : "none",
            }}
          >
            <ProFormSelectPromoters
              name="promoter_id"
              label="Promotor"
              rules={[{ required: true }]}
              fieldProps={{
                onChange(value) {
                  if (!value)
                    setClientParams((state) => ({
                      ...state,
                      promoter_id: undefined,
                    }));

                  setClientParams((state) => ({
                    ...state,
                    promoter_id: value,
                  }));
                },
              }}
            />
          </Col>
          <Col
            xs={{ span: 24 }}
            md={{ span: 12 }}
            lg={{ span: 8 }}
            style={{ display: !user?.Client ? undefined : "none" }}
          >
            <ProFormSelectClient
              name="client_id"
              label="Cliente"
              query={ClientParams}
              fieldProps={{ disabled: !(ClientParams as any)?.promoter_id }}
            />
          </Col>
          <Col xs={{ span: 24 }} md={{ span: 12 }} lg={{ span: 8 }}>
            <ProFormSelect
              name="Modules"
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
              name="name"
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
          <Col xs={{ span: 24 }} md={{ span: 12 }} lg={{ span: 12 }}>
            <ProFormSelect
              name="timezone_id"
              label="Fuso horário"
              rules={[{ required: true }]}
              style={{ width: "100%" }}
              showSearch
              options={selects.data?.timezones?.map((tz) => ({
                label: tz.label,
                value: tz.id,
              }))}
            />
          </Col>
          <Col xs={{ span: 24 }} md={{ span: 12 }} lg={{ span: 12 }}>
            <ProFormSelect
              name="currency_type"
              label="Tipo de moeda"
              rules={[{ required: true }]}
              style={{ width: "100%" }}
              showSearch
              options={selects.data?.currency_types?.map((tz) => ({
                label: tz.label,
                value: tz.id,
              }))}
            />
          </Col>
        </Row>
      </Card>
      <Card style={{ width: "100%", maxWidth: "70vw", marginTop: 20 }}>
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

          <Col span={24}>
            <ProFormList
              name={"DaysData"}
              alwaysShowItemLabel
              creatorButtonProps={{
                position: "bottom",
                creatorButtonText: "Adicionar data de evento",
                type: "primary",
              }}
              deleteIconProps={{ tooltipText: "Remover data" }}
              copyIconProps={{ tooltipText: "Copiar data" }}
              min={1}
              initialValue={[
                { open_gates_time: null, start_time: null, end_time: null },
              ]}
            >
              {(list) => {
                return (
                  <Row style={{ width: "100%" }} gutter={8}>
                    <Col span={24}>
                      <Typography.Title style={{ paddingLeft: 48 }} level={5}>
                        Data {list.name + 1}
                      </Typography.Title>
                    </Col>
                    <Col span={24} style={{ display: "none" }}>
                      <ProFormField name="id" />
                    </Col>
                    <Col xs={{ span: 24 }} md={{ span: 12 }} lg={{ span: 12 }}>
                      <ProFormDateTimePicker
                        name="open_gates_time"
                        label="Abertura dos portões"
                        rules={[{ required: true }]}
                        fieldProps={{
                          style: { width: "100%" },
                          format: "DD-MM-YYYY HH:mm",
                          changeOnScroll: true,
                          needConfirm: false,
                        }}
                      />
                    </Col>

                    <Col xs={{ span: 24 }} md={{ span: 12 }}>
                      <ProFormDateTimePicker
                        name="start_time"
                        label="Início do evento"
                        dependencies={[
                          ["DaysData", list.key, "open_gates_time"],
                        ]}
                        rules={[
                          { required: true },
                          ({ getFieldValue }) => ({
                            validator(_, value) {
                              if (
                                moment(new Date(value)).toLocaleString() >
                                moment(
                                  new Date(
                                    getFieldValue([
                                      "DaysData",
                                      list.key,
                                      "open_gates_time",
                                    ])
                                  )
                                ).toLocaleString()
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
                          format: "DD-MM-YYYY HH:mm",
                          changeOnScroll: true,
                          needConfirm: false,
                        }}
                      />
                    </Col>

                    <Col xs={{ span: 24 }} md={{ span: 24 }}>
                      <ProFormDateTimePicker
                        name="end_time"
                        label="Hora de término"
                        dependencies={[["DaysData", list.key, "start_time"]]}
                        rules={[
                          { required: true },
                          ({ getFieldValue }) => ({
                            validator(_, value) {
                              if (
                                moment(new Date(value)).toLocaleString() >
                                moment(
                                  new Date(
                                    getFieldValue([
                                      "DaysData",
                                      list.key,
                                      "start_time",
                                    ])
                                  )
                                ).toLocaleString()
                              ) {
                                return Promise.resolve();
                              }
                              return Promise.reject(
                                new Error(
                                  "O horário de término deve ser posterior ao de início do evento"
                                )
                              );
                            },
                          }),
                        ]}
                        fieldProps={{
                          style: { width: "100%" },
                          format: "DD-MM-YYYY HH:mm",
                          changeOnScroll: true,
                          needConfirm: false,
                        }}
                      />
                    </Col>
                  </Row>
                );
              }}
            </ProFormList>
          </Col>
        </Row>
      </Card>
    </Row>
  );
};
