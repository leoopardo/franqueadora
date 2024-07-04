import {
  ProFormSelect,
  ProFormText,
  StepsForm,
} from "@ant-design/pro-components";
import { Col, Divider, Row } from "antd";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { useBreakpoints } from "../../../../../../../hooks/useBreakpoints";
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
}

export const StepOne = ({ setModules }: stepOneI) => {
  const [ddd, setDDD] = useState<string[]>([]);
  const [cep, setCep] = useState<string>("");
  const [cnpj, setCnpj] = useState<string>("");
  const { data } = useGetDDDs(ddd);
  const cnpjRequest = useGetCNPJ(cnpj);
  const stepOneRef = useRef<any>(null);
  const cepRequest = useGetCEP(cep);
  const { isXs } = useBreakpoints();
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
      stepOneRef.current.setFieldsValue({
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

  const formatCNPJ = (value: string) => {
    if (!value) return value;
    value = value.replace(/\D/g, "");
    value = value.substring(0, 14); // Garante que só há no máximo 14 dígitos
    if (value.length <= 14) {
      return value
        .replace(/^(\d{2})(\d)/, "$1.$2")
        .replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
        .replace(/\.(\d{3})(\d)/, ".$1/$2")
        .replace(/(\d{4})(\d)/, "$1-$2");
    }
    return value;
  };

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
    if (cnpj && cnpjRequest.error) stepOneRef.current.validateFields(["cnpj"]);
  }, [cnpjRequest]);

  return (
    <StepsForm.StepForm<{
      cnpj: number;
      franchise_name: string;
      company_name: string;
      commercial_name: string;
      state_registration: string;
      address: {
        address: string;
        cep: string;
        city: string;
        complement: string;
        district: string;
        number: string;
        state: string;
      };
      modules: string[];
      area_codes: string[];
      contacts: any[];
    }>
      name="base"
      title="Informações da empresa"
      onFinish={async () => {
        await waitTime(2000);
        return true;
      }}
      size="large"
      grid
      formRef={stepOneRef}
      onFinishFailed={() => {
        const fields = stepOneRef.current.getFieldsError();
        const firstErrorField = fields.find(
          (field: any) => field.errors.length > 0
        );
        if (firstErrorField) {
          stepOneRef.current.scrollToField(firstErrorField.name[0], {
            behavior: "smooth",
            block: "center",
          });
        }
      }}
    >
      <Row style={{ width: isXs ? "70%" : "100%" }} gutter={8}>
        <Col md={{ span: 12 }} xs={{ span: 24 }}>
          <ProFormText
            name="cnpj"
            label="CNPJ"
            placeholder="Digite o CNPJ"
            validateTrigger={["onChange", "onBlur", "onPaste"]}
            rules={[
              { required: true, len: 18 },
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
              { required: true },
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
            }}
          />
        </Col>
        <Col md={{ span: 8 }} xs={{ span: 24 }}>
          <ProFormText
            name="company_name"
            label="Razão social"
            placeholder="Digite a razão social"
            rules={[{ required: true }]}
          />
        </Col>
        <Col md={{ span: 8 }} xs={{ span: 24 }}>
          <ProFormText
            name="commercial_name"
            label="Nome fantasia"
            placeholder="Digite o nome fantasia"
            rules={[{ required: true }]}
          />
        </Col>
        <Col md={{ span: 8 }} xs={{ span: 24 }}>
          <ProFormText
            name="state_registration"
            label="Inscrição estadual"
            placeholder="Digite a inscição estadual"
            rules={[{ required: true }]}
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
            }}
            getValueFromEvent={(e) => formatCEP(e.target.value)}
            rules={[{ required: true }]}
          />
        </Col>
        <Col md={{ span: 8 }} xs={{ span: 24 }}>
          <ProFormText
            name={["address", "address"]}
            label="Endereço"
            placeholder="Digite o Endereço"
            rules={[{ required: true }]}
          />
        </Col>
        <Col md={{ span: 8 }}>
          <ProFormText
            name={["address", "number"]}
            label="Número"
            placeholder="000"
            rules={[{ required: true }]}
          />
        </Col>
        <Col md={{ span: 8 }} xs={{ span: 24 }}>
          <ProFormText
            name={["address", "state"]}
            label="Estado"
            placeholder="Digite o estado"
            rules={[{ required: true }]}
          />
        </Col>
        <Col md={{ span: 8 }} xs={{ span: 24 }}>
          <ProFormText
            name={["address", "city"]}
            label="Cidade"
            placeholder="Digite a cidade"
            rules={[{ required: true }]}
          />
        </Col>
        <Col md={{ span: 8 }} xs={{ span: 24 }}>
          <ProFormText
            name={["address", "district"]}
            label="Bairro"
            placeholder="Digite o bairro"
            rules={[{ required: true }]}
          />
        </Col>
        <Col md={{ span: 24 }} xs={{ span: 24 }}>
          <ProFormText
            name={["address", "complement"]}
            label="Complemento"
            placeholder="Digite algum complemento"
          />
        </Col>
        <Col md={{ span: 24 }} xs={{ span: 24 }}>
          <Divider orientation="left">Abrangência</Divider>
        </Col>
        <Col md={{ span: 8 }} xs={{ span: 24 }}>
          <ProFormSelect
            name="area_codes"
            label="Código(s) de área(s)"
            placeholder="Selecione o DDD"
            mode="multiple"
            options={AreaCodeData?.map((a) => ({
              label: `${a.code}`,
              value: a.id,
            }))}
            rules={[{ required: true }]}
            onChange={(value: any) => setDDD(value)}
            fieldProps={{ maxTagCount: 3 }}
          />
        </Col>
        <Col md={{ span: 8 }} xs={{ span: 24 }}>
          <ProFormSelect
            name="counties"
            label="Município(s)"
            placeholder="Selecione o município"
            mode="multiple"
            options={CityCodeData?.map((c) => ({ label: c.name, value: c.id }))}
            disabled={!data}
            rules={[{ required: true }]}
            fieldProps={{ maxTagCount: 1, disabled: !ddd.length }}
          />
        </Col>
        <Col md={{ span: 8 }} xs={{ span: 24 }}>
          <ProFormSelect
            name="module"
            label="Módulos"
            placeholder="Selecione os módulos utilizados"
            mode="multiple"
            options={PosModulesData?.items.map((value) => ({
              label: value.name,
              value: value.id,
            }))}
            rules={[{ required: true }]}
            fieldProps={{ maxTagCount: 1 }}
            onChange={(value) =>
              setModules(
                (value as any)?.map(
                  (v: string) =>
                    PosModulesData?.items.find((i) => i.id === v)?.name
                )
              )
            }
          />
        </Col>
      </Row>
    </StepsForm.StepForm>
  );
};
