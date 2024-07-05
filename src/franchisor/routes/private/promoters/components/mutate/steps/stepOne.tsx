import {
  CheckCard,
  ProFormInstance,
  ProFormSelect,
  ProFormText,
  StepsForm,
} from "@ant-design/pro-components";
import { BuildingOfficeIcon, UserIcon } from "@heroicons/react/24/outline";
import { Col, Divider, Row, Typography } from "antd";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { useTheme } from "../../../../../../../contexts/themeContext";
import useDebounce from "../../../../../../../hooks/useDebounce";
import { useGetCEP } from "../../../../../../services/brasilApi/getCEP";
import { useGetDDDs } from "../../../../../../services/brasilApi/getDDD";
import { useGetAreaCode } from "../../../../../../services/utils/getAreaCode";
import { useGetCityCode } from "../../../../../../services/utils/getCity";
import { useGetPosModules } from "../../../../../../services/utils/getPosModules";
import { JuridicPerson } from "./stepOneTypes/juridicPerson";

interface stepOneI {
  setModules: Dispatch<SetStateAction<string[]>>;
  update?: boolean;
}

export const StepOne = ({ setModules, update }: stepOneI) => {
  const { theme } = useTheme();
  const [ddd, setDDD] = useState<string[]>([]);
  const [cep, setCep] = useState<string>("");
  const { data } = useGetDDDs(ddd);
  const stepOneRef = useRef<ProFormInstance>(null);
  const cepRequest = useGetCEP(cep);
  const { AreaCodeData } = useGetAreaCode();
  const { CityCodeData } = useGetCityCode(ddd);
  const { PosModulesData } = useGetPosModules();

  const [personType, setPersonType] = useState<"physical" | "juridic">(
    "physical"
  );

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

  const formatCEP = (value: string) => {
    if (!value) return value;
    value = value.replace(/\D/g, ""); // Remove todos os caracteres não numéricos
    value = value.substring(0, 8); // Garante que só há no máximo 8 dígitos
    if (value.length === 8) {
      return value.replace(/^(\d{5})(\d{3})$/, "$1-$2"); // Formata o CEP no formato #####-###
    }
    return value;
  };

  const handleChangeCEP = useDebounce((value) => {
    setCep(value);
  }, 500);

  useEffect(() => {
    setModules(
      stepOneRef?.current
        ?.getFieldValue("module")
        .map(
          (id: string) =>
            (PosModulesData?.items as any)?.find(
              (module: any) => module.id === id
            ).name
        )
    );
  }, [stepOneRef?.current?.getFieldValue("module")]);

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
      <Row style={{ width: "100%", maxWidth: "100vw" }} gutter={8}>
        <Col md={{ span: 24 }} xs={{ span: 24 }}>
          <CheckCard.Group
            onChange={(value: any) => {
              setPersonType(value);
            }}
            defaultValue="physical"
            value={personType}
          >
            <CheckCard
              title={
                <Typography
                  style={{
                    color:
                      theme === "light"
                        ? "#000"
                        : personType === "juridic"
                          ? "#fff"
                          : "#000",
                  }}
                >
                  Pessoa física
                </Typography>
              }
              description={
                <Typography
                  style={{
                    color:
                      theme === "light"
                        ? "#000"
                        : personType === "juridic"
                          ? "#fff"
                          : "#000",
                  }}
                >
                  Tem como documento principal o CPF.
                </Typography>
              }
              avatar={
                <UserIcon
                  style={{
                    width: "32px",
                    color:
                      theme === "light"
                        ? "#000"
                        : personType === "juridic"
                          ? "#fff"
                          : "#000",
                  }}
                />
              }
              value="physical"
            />
            <CheckCard
              title={
                <Typography
                  style={{
                    color:
                      theme === "light"
                        ? "#000"
                        : personType === "physical"
                          ? "#fff"
                          : "#000",
                  }}
                >
                  Pessoa jurídica
                </Typography>
              }
              description={
                <Typography
                  style={{
                    color:
                      theme === "light"
                        ? "#000"
                        : personType === "physical"
                          ? "#fff"
                          : "#000",
                  }}
                >
                  Tem como documento principal o CNPJ.
                </Typography>
              }
              avatar={
                <BuildingOfficeIcon
                  style={{
                    width: "32px",
                    color:
                      theme === "light"
                        ? "#000"
                        : personType === "physical"
                          ? "#fff"
                          : "#000",
                  }}
                />
              }
              value="juridic"
            />
          </CheckCard.Group>
        </Col>
        {personType === "juridic" && (
          <JuridicPerson stepOneRef={stepOneRef} update={update} />
        )}
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
            rules={[{ required: !update }]}
          />
        </Col>
        <Col md={{ span: 8 }} xs={{ span: 24 }}>
          <ProFormText
            name={["address", "address"]}
            label="Endereço"
            placeholder="Digite o Endereço"
            rules={[{ required: !update }]}
          />
        </Col>
        <Col md={{ span: 8 }}>
          <ProFormText
            name={["address", "number"]}
            label="Número"
            placeholder="000"
            rules={[{ required: !update }]}
          />
        </Col>
        <Col md={{ span: 8 }} xs={{ span: 24 }}>
          <ProFormText
            name={["address", "state"]}
            label="Estado"
            placeholder="Digite o estado"
            rules={[{ required: !update }]}
          />
        </Col>
        <Col md={{ span: 8 }} xs={{ span: 24 }}>
          <ProFormText
            name={["address", "city"]}
            label="Cidade"
            placeholder="Digite a cidade"
            rules={[{ required: !update }]}
          />
        </Col>
        <Col md={{ span: 8 }} xs={{ span: 24 }}>
          <ProFormText
            name={["address", "district"]}
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
              key: a.code,
              label: `${a.code}`,
              value: a.id,
            }))}
            rules={[{ required: !update }]}
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
            options={CityCodeData?.map((c) => ({
              key: c.id,
              label: c.name,
              value: c.id,
            }))}
            disabled={!data}
            rules={[{ required: !update }]}
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
              kay: value.id,
              label: value.name,
              value: value.id,
            }))}
            rules={[{ required: !update }]}
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
