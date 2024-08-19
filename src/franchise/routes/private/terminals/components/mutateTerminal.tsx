import { PlusOutlined } from "@ant-design/icons";
import {
  ProCard,
  ProForm,
  ProFormField,
  ProFormInstance,
  ProFormSelect,
} from "@ant-design/pro-components";
import { ProFormSelectClient } from "@franchise/components/proFormSelects/SelectClients";
import { ProFormSelectPromoters } from "@franchise/components/proFormSelects/SelectPromoters";
import { getMeI } from "@franchise/services/auth/useGetMe";
import { QueryKeys } from "@franchise/services/queryKeys";
import { Services } from "@franchise/services";
import { CreateTerminals } from "@franchisor/services/terminals/__interfaces/create_terminals.interface";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import { useBreakpoints } from "@hooks/useBreakpoints";
import defaultTheme from "@styles/default";
import {
  Button,
  Col,
  Divider,
  Input,
  InputRef,
  notification,
  Row,
  Space,
  Typography,
} from "antd";
import { motion } from "framer-motion";
import cookies from "js-cookie";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { queryClient } from "../../../../../services/queryClient";

interface MutateTerminalI {
  mutate: (body: CreateTerminals) => void;
  loading?: boolean;
  success?: boolean;
  error?: any;
  title?: string;
  subtitle?: string;
  initialValues?: any;
  update?: boolean;
}
export const MutateTerminal = ({
  subtitle,
  title,
  update,
  mutate,
  initialValues,
  loading,
}: MutateTerminalI) => {
  const { isSm } = useBreakpoints();
  const user = queryClient.getQueryData(QueryKeys.GET_ME) as getMeI;
  const [width] = useState<number>((100 / 1) * 1);
  const [promoterQuery, setPromoterQuery] = useState<any>({
    franchise_id: user?.Franchise ? user?.Franchise[0].id : undefined,
  });
  const [clientQuery, setClientQuery] = useState<any>({
    promoter_id: user?.Promoter ? user?.Promoter.id : undefined,
  });
  const selects = Services.terminal.selects();
  const formRef = useRef<ProFormInstance>();
  const [serials, setSerials] = useState<string[]>([]);
  const [serial, setSerial] = useState<string>("");
  const inputRef = useRef<InputRef>(null);
  const [api, contextHolder] = notification.useNotification();
  const [isDrafLoading] = useState<boolean>(false);

  useEffect(() => {
    if (cookies.get("create_terminal") && !update) {
      const data = JSON.parse(`${cookies.get("create_terminal")}`);

      api.info({
        message: "Rascunho identificado!",
        description:
          "Você não concluiu o cadastro anteriormente. Deseja recupera-lo?",
        duration: 30000,
        btn: (
          <Space>
            <Button
              type="primary"
              onClick={() => {
                cookies.remove("create_terminal");
                api.destroy();
              }}
              danger
            >
              Não, descartar
            </Button>{" "}
            <Button
              type="primary"
              onClick={() => {
                formRef.current?.setFieldsValue(data);
                if (data?.franchise_id) {
                  setPromoterQuery({
                    franchise_id: data.franchise_id,
                  });
                }
                if (data?.promoter_id) {
                  setClientQuery({
                    promoter_id: data.promoter_id,
                  });
                }
                if (data?.serial_numbers) {
                  setSerials(data.serial_numbers);
                }
                api.destroy();
                cookies.remove("create_terminal");
              }}
            >
              Sim, recuperar.
            </Button>
          </Space>
        ),
      });
    }
  }, []);

  useEffect(() => {
    if (initialValues) {
      formRef.current?.setFieldsValue(initialValues);
    }
    if (initialValues?.franchise_id) {
      setPromoterQuery({
        franchise_id: initialValues.franchise_id,
      });
    }
    if (initialValues?.promoter_id) {
      setClientQuery({
        promoter_id: initialValues.promoter_id,
      });
    }
  }, [initialValues]);

  const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSerial(event.target.value);
  };

  const addItem = (
    e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>
  ) => {
    e.preventDefault();
    setSerials((state) => [...state, serial]);
    setSerial("");
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };
  const navigate = useNavigate();

  useEffect(() => {
    if (!update && selects.data) {
      formRef.current?.setFieldValue(
        "time_zone_id",
        selects.data.time_zones.find(
          (tz) => tz.label.toLocaleLowerCase() === "brasília (gmt -3)"
        )?.id
      );
    }
  }, [selects.data]);

  const situations = {
    CLIENT: "Cliente",
    DELETED: "Deletado",
    DEVELOPMENT: "Desenvolvimento",
    FRANCHISE: "Franquia",
    LENDING: "Emprestado",
    MAINTENANCE: "Manutenção",
    SALE: "Venda",
    STOCK: "Estoque",
  };

  return (
    <Row justify="center" style={{ width: "100%" }}>
      {contextHolder}
      <Col
        style={{
          width: "100%",
          height: "20vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center",
        }}
        span={24}
      >
        <Row
          style={{ width: "100%", height: "100%" }}
          justify="center"
          align="middle"
        >
          <Col xs={{ span: 20 }} md={{ span: 10 }}>
            <Typography.Title level={isSm ? 5 : 3} style={{ margin: 0 }}>
              {title}
            </Typography.Title>
            <Typography.Text style={{ lineHeight: 0 }}>
              {subtitle}
            </Typography.Text>
          </Col>
        </Row>
      </Col>
      <div
        style={{
          backgroundColor: "rgb(207, 207, 207, 0.2)",
          height: 5,
          width: "100%",
        }}
      >
        <motion.div
          style={{
            width: 0,
            minHeight: 5,
            borderRadius: 25,
            backgroundColor: defaultTheme.primary,
          }}
          animate={{
            width: `${width}%`,
            transition: {
              bounce: 0.8,
              bounceDamping: 1,
              stiffness: 30,
              type: "spring",
            },
          }}
        />
      </div>
      <ProCard
        style={{
          height: isSm ? undefined : "70vh",
          overflowY: "auto",
          overflowX: "hidden",
          minWidth: "100%",
          display: "flex",
        }}
      >
        <Row
          style={{
            display: "flex",
            justifyContent: "center",
            minWidth: "100%",
            height: "100%",
          }}
        >
          <Col xs={{ span: 24 }} md={{ span: 16 }}>
            <ProForm
              loading={isDrafLoading || loading}
              layout="vertical"
              formRef={formRef}
              onFinish={(values) => {
                return new Promise<boolean>((resolve) => {
                  mutate({
                    ...initialValues,
                    ...values,
                    master: formRef.current?.getFieldValue("master"),
                  });
                  resolve(false);
                });
              }}
              submitter={false}
              onFieldsChange={(_name, fields) => {
                if (update) return;
                let form: any = {};
                for (const step of fields) {
                  form[step.name[0]] = step.value;
                  cookies.set("create_terminal", JSON.stringify(form), {
                    expires: 1,
                  });
                }
              }}
            >
              <Row style={{ width: "100%" }} gutter={[8, 8]}>
                {!user.Promoter?.id && (
                  <Col xs={{ span: 24 }} md={{ span: 12 }} lg={{ span: 8 }}>
                    <ProFormSelectPromoters
                      name={["promoter_id"]}
                      label="Promotor"
                      placeholder="Selecione um promotor."
                      fieldProps={{
                        disabled: !promoterQuery,
                        onChange(value) {
                          formRef.current?.setFieldValue(["client_id"], null);
                          if (!value) {
                            setClientQuery(undefined);
                            return;
                          }
                          setClientQuery({ promoter_id: value });
                        },
                      }}
                      query={promoterQuery}
                    />
                  </Col>
                )}
                {!user.Client?.id && (
                  <Col xs={{ span: 24 }} md={{ span: 12 }} lg={{ span: 8 }}>
                    <ProFormSelectClient
                      name={["client_id"]}
                      label="Cliente"
                      placeholder="Selecione um cliente."
                      fieldProps={{
                        disabled: !clientQuery,
                      }}
                      query={clientQuery}
                    />
                  </Col>
                )}
                <Col xs={{ span: 24 }} md={{ span: 12 }} lg={{ span: 8 }}>
                  <ProFormSelect
                    label="Modelo"
                    name="model_id"
                    showSearch
                    allowClear
                    placeholder="Selecione um modelo."
                    fieldProps={{ size: "large" }}
                    rules={[{ required: !update }]}
                    options={selects?.data?.models.map((m) => ({
                      label: m.model,
                      value: m.id,
                    }))}
                  />
                </Col>
                <Col xs={{ span: 24 }} md={{ span: 12 }} lg={{ span: 8 }}>
                  <ProFormSelect
                    label="Fuso horário"
                    name="time_zone_id"
                    showSearch
                    allowClear
                    placeholder="Selecione o fuso horário."
                    fieldProps={{ size: "large" }}
                    rules={[{ required: !update }]}
                    options={selects?.data?.time_zones.map((tz) => ({
                      label: tz.label,
                      value: tz.id,
                    }))}
                  />
                </Col>
                <Col xs={{ span: 24 }} md={{ span: 12 }} lg={{ span: 8 }}>
                  <ProFormSelect
                    label="Módulos do POS"
                    name="modules"
                    showSearch
                    allowClear
                    placeholder="Selecione os módulos."
                    mode="multiple"
                    fieldProps={{ size: "large", maxTagCount: 1 }}
                    rules={[{ required: !update }]}
                    options={selects?.data?.modules.map((m) => ({
                      label: m.name,
                      value: m.id,
                    }))}
                  />
                </Col>
                <Col xs={{ span: 24 }} md={{ span: 12 }} lg={{ span: 8 }}>
                  <ProFormSelect
                    label="Situação"
                    fieldProps={{ size: "large" }}
                    rules={[{ required: !update }]}
                    name="situation"
                    showSearch
                    allowClear
                    placeholder="Selecione a situação."
                    options={selects?.data?.situation.map((s) => ({
                      label: situations[s] || s,
                      value: s,
                    }))}
                  />
                </Col>
                <Col xs={{ span: 24 }} md={{ span: 12 }} lg={{ span: 16 }}>
                  {!update ? (
                    <ProFormSelect
                      label="Números de série"
                      mode="multiple"
                      fieldProps={{
                        size: "large",
                        maxTagCount: 2,
                        dropdownRender: (menu) => (
                          <>
                            {menu}
                            <Divider style={{ margin: "8px 0" }} />
                            <Space
                              style={{ padding: "0 8px 4px", width: "100%" }}
                            >
                              <Input
                                placeholder="Digíte o número de série"
                                ref={inputRef}
                                value={serial}
                                onChange={onNameChange}
                                onKeyDown={(e) => e.stopPropagation()}
                                style={{ width: "100%" }}
                              />
                              <Button
                                type="text"
                                icon={<PlusOutlined />}
                                onClick={addItem}
                                disabled={!serial}
                              >
                                Add número de série
                              </Button>
                            </Space>
                          </>
                        ),
                      }}
                      rules={[{ required: !update }]}
                      name="serial_numbers"
                      showSearch
                      allowClear
                      placeholder="Selecione os números de série."
                      options={serials}
                    />
                  ) : (
                    <ProFormField
                      label="Número de série"
                      name={"serial_number"}
                      fieldProps={{ size: "large" }}
                    />
                  )}
                </Col>
                <Col xs={{ span: 24 }} md={{ span: 12 }} lg={{ span: 8 }}>
                  <ProFormSelect
                    label="Adquirente"
                    fieldProps={{ size: "large" }}
                    rules={[{ required: !update }]}
                    name="acquirers"
                    mode="multiple"
                    showSearch
                    allowClear
                    placeholder="Selecione a situação."
                    options={selects?.data?.acquirers.map((s) => ({
                      label: s.acquirer,
                      value: s.id,
                    }))}
                  />
                </Col>
              </Row>
            </ProForm>
          </Col>
        </Row>
      </ProCard>
      <Col
        style={{
          width: "100%",
          height: "10vh",
          borderTop: "2px solid rgb(207, 207, 207, 0.4)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: 34,
        }}
        span={24}
      >
        <Button
          shape="round"
          size="large"
          danger
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          icon={<ChevronLeftIcon style={{ height: 20 }} />}
          onClick={() => {
            navigate(-1);
            return;
          }}
        >
          Voltar
        </Button>
        <Button
          shape="round"
          size="large"
          type="primary"
          onClick={() => {
            formRef.current?.submit();
          }}
        >
          {update ? "Salvar dados" : "Cadastrar terminal"}
        </Button>
      </Col>
    </Row>
  );
};
