import {
  ProFormInstance,
  ProFormSelect,
  ProFormText,
  StepsForm,
} from "@ant-design/pro-components";
import { formatCNPJ } from "@utils/regexFormat";
import { Col, Divider, Row } from "antd";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import useDebounce from "../../../../../../../hooks/useDebounce";
import { useGetCEP } from "../../../../../../services/brasilApi/getCEP";
import { useGetCNPJ } from "../../../../../../services/brasilApi/getCNPJ";
import { useGetDDDs } from "../../../../../../services/brasilApi/getDDD";
import { useValidateStepOne } from "../../../../../../services/franchises/validation/validateStepOne";
import { useGetAreaCode } from "../../../../../../services/utils/getAreaCode";
import { useGetCityCode } from "../../../../../../services/utils/getCity";
import { useGetPosModules } from "../../../../../../services/utils/getPosModules";

interface stepOneI {
  setModules: Dispatch<SetStateAction<string[]>>;
  update?: boolean;
}

export const StepOne = ({ setModules, update }: stepOneI) => {
  const [ddd, setDDD] = useState<string[]>([]);
  const [cep, setCep] = useState<string>("");
  const [cnpj, setCnpj] = useState<string>("");
  const { data } = useGetDDDs(ddd);
  const cnpjRequest = useGetCNPJ(cnpj);
  const stepOneRef = useRef<ProFormInstance>(null);
  const cepRequest = useGetCEP(cep);
  const { AreaCodeData } = useGetAreaCode();
  const { CityCodeData } = useGetCityCode(ddd);
  const { PosModulesData } = useGetPosModules();
  const [bodyValidate, setBodyValidate] = useState({
    cnpj: "",
    franchise_name: "",
  });
  const validateStepOne = useValidateStepOne({ body: bodyValidate });

  const waitTime = (time: number = 100) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, time);
    });
  };

  useEffect(() => {
    if (cepRequest.data)
      stepOneRef?.current?.setFieldsValue({
        address: {
          state: cepRequest?.data.state,
          city: cepRequest?.data.city,
          address: cepRequest?.data.street,
          district: cepRequest?.data.neighborhood,
        },
      });
  }, [cepRequest.data]);

  useEffect(() => {
    if (cnpjRequest.data) {
      stepOneRef.current?.setFieldsValue({
        company_name: cnpjRequest?.data.razao_social,
        franchise_name:
          cnpjRequest?.data.nome_fantasia === ""
            ? cnpjRequest?.data.razao_social
            : cnpjRequest?.data.nome_fantasia,
        commercial_name:
          cnpjRequest?.data.nome_fantasia === ""
            ? cnpjRequest?.data.razao_social
            : cnpjRequest?.data.nome_fantasia,
        state_registration: cnpjRequest?.data.cnae_fiscal,
        address: {
          cep: `${cnpjRequest?.data?.cep}`?.replace(
            /^(\d{5})(\d{3})$/,
            "$1-$2"
          ),
          state: cnpjRequest?.data.uf,
          city: cnpjRequest?.data.municipio,
          address: cnpjRequest?.data.logradouro,
          district: cnpjRequest?.data.bairro,
          number: cnpjRequest?.data.numero,
        },
      });
    }
  }, [cnpjRequest.data]);

  const formatCEP = (value: string) => {
    if (!value) return value;
    value = value.replace(/\D/g, ""); // Remove todos os caracteres não numéricos
    value = value.substring(0, 8); // Garante que só há no máximo 8 dígitos
    if (value.length === 8) {
      return value.replace(/^(\d{5})(\d{3})$/, "$1-$2"); // Formata o CEP no formato #####-###
    }
    return value;
  };

  const handleChangeCnpj = useDebounce((value) => {
    setCnpj(value);
    cnpjRequest.remove();
  }, 500);

  const handleChangeCEP = useDebounce((value) => {
    setCep(value);
  }, 500);

  const handleValidate = useDebounce((key, value) => {
    setBodyValidate((state) => ({ ...state, [key]: value }));
  }, 500);

  useEffect(() => {
    if (cnpj && cnpjRequest.error)
      stepOneRef?.current?.validateFields(["cnpj"]);
  }, [cnpjRequest]);

  useEffect(() => {
    setModules(
      stepOneRef?.current
        ?.getFieldValue("module")
        ?.map(
          (id: string) =>
            (PosModulesData?.items as any)?.find(
              (module: any) => module.id === id
            )?.name
        )
    );
  }, [stepOneRef?.current?.getFieldValue("module")]);

  return (
    <StepsForm.StepForm
      name="base"
      title="Informações da empresa"
      onFinish={async () => {
        await waitTime();
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
      <Row style={{ width: "100%", maxWidth: "90vw" }} gutter={8}>
        <Col md={{ span: 12 }} xs={{ span: 24 }}>
          <ProFormText
            name="cnpj"
            label="CNPJ"
            placeholder="Digite o CNPJ"
            validateTrigger={["onChange", "onBlur", "onPaste"]}
            rules={[
              { required: !update, len: 18 },
              {
                validator: () => {
                  if (cnpjRequest.error && !cnpjRequest.data) {
                    return Promise.reject(
                      (cnpjRequest?.error as any)?.response?.data?.message
                    );
                  }
                  return Promise.resolve();
                },
              },
              {
                validator: () => {
                  if (update) {
                    return Promise.resolve();
                  }
                  if (
                    (validateStepOne.error as any)?.response?.data?.message ===
                    "Esse CNPJ já está em uso. Por favor, informe um outro e tente novamente."
                  ) {
                    return Promise.reject(
                      (validateStepOne.error as any)?.response?.data?.message
                    );
                  }
                  return Promise.resolve();
                },
              },
            ]}
            fieldProps={{
              onChange: (e) => {
                if (!e.target.value) {
                  validateStepOne.reset();
                }
                handleChangeCnpj(e.target.value);
                handleValidate("cnpj", e?.target?.value?.replace(/\D/g, ""));
              },
              maxLength: 18,
              "data-testid": "cnpj",
            }}
            getValueFromEvent={(e) => formatCNPJ(e.target.value)}
          />
        </Col>
        <Col md={{ span: 12 }} xs={{ span: 24 }}>
          <ProFormText
            name="franchise_name"
            label="Nome da franquia"
            placeholder="Digite o nome da franquia"
            validateTrigger={["onChange", "onBlur", "onPaste"]}
            rules={[
              { required: !update },
              {
                validator: () => {
                  if (
                    (validateStepOne.error as any)?.response?.data?.message ===
                    "Nome da franquia já existente no sistema."
                  ) {
                    return Promise.reject(
                      (validateStepOne.error as any)?.response?.data?.message
                    );
                  }
                  return Promise.resolve();
                },
              },
            ]}
            fieldProps={{
              onChange: (e) => {
                if (!e.target.value) {
                  validateStepOne.reset();
                  return;
                }
                handleValidate("franchise_name", e?.target?.value);
              },
              "data-testid": "franchise_name",
            }}
          />
        </Col>
        <Col md={{ span: 8 }} xs={{ span: 24 }}>
          <ProFormText
            name="company_name"
            label="Razão social"
            placeholder="Digite a razão social"
            rules={[{ required: !update }]}
            fieldProps={{ "data-testid": "company_name" }}
          />
        </Col>
        <Col md={{ span: 8 }} xs={{ span: 24 }}>
          <ProFormText
            name="commercial_name"
            label="Nome fantasia"
            placeholder="Digite o nome fantasia"
            rules={[{ required: !update }]}
            fieldProps={{ "data-testid": "commercial_name" }}
          />
        </Col>
        <Col md={{ span: 8 }} xs={{ span: 24 }}>
          <ProFormText
            name="state_registration"
            label="Inscrição estadual"
            placeholder="Digite a inscição estadual"
            rules={[{ required: !update }]}
            fieldProps={{ "data-testid": "state_registration" }}
          />
        </Col>
        <Col md={{ span: 24 }} xs={{ span: 24 }}>
          <Divider orientation="left">Endereço</Divider>
        </Col>
        <Col md={{ span: 8 }} xs={{ span: 24 }}>
          <ProFormText
            name={["address", "cep"]}
            label="CEP"
            placeholder="Digite o CEP"
            fieldProps={{
              onChange: (e) => {
                handleChangeCEP(e.target.value);
              },
              "data-testid": "cep",
            }}
            getValueFromEvent={(e) => formatCEP(e.target.value)}
            rules={[{ required: !update }]}
          />
        </Col>
        <Col md={{ span: 8 }} xs={{ span: 24 }}>
          <ProFormText
            name={["address", "address"]}
            label="Endereço"
            placeholder="Digite o Endereço"
            rules={[{ required: !update }]}
            fieldProps={{
              "data-testid": "address",
            }}
          />
        </Col>
        <Col md={{ span: 8 }}>
          <ProFormText
            name={["address", "number"]}
            label="Número"
            placeholder="000"
            rules={[{ required: !update }]}
            fieldProps={{ "data-testid": "number" }}
          />
        </Col>
        <Col md={{ span: 8 }} xs={{ span: 24 }}>
          <ProFormText
            name={["address", "state"]}
            data-testid="state"
            label="Estado"
            placeholder="Digite o estado"
            rules={[{ required: !update }]}
          />
        </Col>
        <Col md={{ span: 8 }} xs={{ span: 24 }}>
          <ProFormText
            name={["address", "city"]}
            data-testid="city"
            label="Cidade"
            placeholder="Digite a cidade"
            rules={[{ required: !update }]}
          />
        </Col>
        <Col md={{ span: 8 }} xs={{ span: 24 }}>
          <ProFormText
            name={["address", "district"]}
            data-testid="district"
            label="Bairro"
            placeholder="Digite o bairro"
            rules={[{ required: !update }]}
          />
        </Col>
        <Col md={{ span: 24 }} xs={{ span: 24 }}>
          <ProFormText
            name={["address", "complement"]}
            label="Complemento"
            placeholder="Digite algum complemento"
            fieldProps={{
              "data-testid": "complement",
            }}
          />
        </Col>
        <Col md={{ span: 24 }} xs={{ span: 24 }}>
          <Divider orientation="left">Abrangência</Divider>
        </Col>
        <Col md={{ span: 8 }} xs={{ span: 24 }}>
          <ProFormSelect
            name="area_codes"
            label="Código(s) de área(s)"
            data-testid="area_codes"
            placeholder="Selecione o DDD"
            mode="multiple"
            options={AreaCodeData?.map((a) => ({
              key: a.code,
              label: `${a?.code}`,
              value: a?.id,
            }))}
            rules={[{ required: !update }]}
            onChange={(value: any) => setDDD(value)}
            fieldProps={
              {
                maxTagCount: 3,
                getPopupContainer: (trigger: any) => trigger.parentElement,
                dropdownRender(menu: any) {
                  return (
                    <div data-testid="area_codes_dropdown">
                      {menu}
                      <Divider style={{ margin: "4px 0" }} />
                      <div style={{ padding: "8px", cursor: "pointer" }}>
                        <a
                          onClick={() => {
                            stepOneRef.current?.setFieldsValue({
                              area_codes: AreaCodeData?.map((a) => a.code),
                            });
                            setDDD(AreaCodeData?.map((a) => a.code) || []);
                          }}
                        >
                          Selecionar todos
                        </a>
                      </div>
                    </div>
                  );
                },
                "data-testid": "area_codes_input",
              } as any
            }
          />
        </Col>
        <Col md={{ span: 8 }} xs={{ span: 24 }}>
          <ProFormSelect
            name="counties"
            data-testid="counties"
            label="Município(s)"
            placeholder="Selecione o município"
            mode="multiple"
            options={CityCodeData?.map((c) => ({
              key: c?.id,
              label: c?.name,
              value: c?.id,
            }))}
            disabled={!data}
            rules={[{ required: !update }]}
            fieldProps={
              {
                maxTagCount: 1,
                disabled: !ddd.length,
                dropdownRender(menu: any) {
                  return <div data-testid="counties_dropdown">{menu}</div>;
                },
                "data-testid": "counties_input",
              } as any
            }
          />
        </Col>
        <Col md={{ span: 8 }} xs={{ span: 24 }}>
          <ProFormSelect
            name="module"
            data-testid="module"
            label="Módulos"
            placeholder="Selecione os módulos utilizados"
            mode="multiple"
            options={PosModulesData?.items.map((value) => ({
              key: value?.id,
              label: value?.name,
              value: value?.id,
            }))}
            rules={[{ required: !update }]}
            fieldProps={
              {
                maxTagCount: 1,
                "data-testid": "module_input",
                dropdownRender(menu: any) {
                  return (
                    <div data-testid="module_dropdown">
                      {menu}
                      <Divider style={{ margin: "4px 0" }} />
                      <div style={{ padding: "8px", cursor: "pointer" }}>
                        <a
                          data-testid="module_select_all"
                          onClick={() => {
                            stepOneRef.current?.setFieldsValue({
                              module: PosModulesData?.items.map((m) => m.id),
                            });
                            setModules(
                              PosModulesData?.items?.map((m) => m.name) || []
                            );
                          }}
                        >
                          Selecionar todos
                        </a>
                      </div>
                    </div>
                  );
                },
              } as any
            }
            onChange={(value) =>
              setModules(
                (value as any)?.map(
                  (v: string) =>
                    PosModulesData?.items?.find((i) => i.id === v)?.name
                )
              )
            }
          />
        </Col>
      </Row>
    </StepsForm.StepForm>
  );
};
