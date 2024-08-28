import {
  CheckCard,
  ProFormInstance,
  ProFormSelect,
  ProFormText,
  StepsForm,
} from "@ant-design/pro-components";
import { BuildingOfficeIcon, UserIcon } from "@heroicons/react/24/outline";
import defaultTheme from "@styles/default";
import { Col, Divider, Row, Typography } from "antd";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import useDebounce from "../../../../../../../hooks/useDebounce";
import { useGetCEP } from "../../../../../../services/brasilApi/getCEP";
import { useGetPosModules } from "../../../../../../services/utils/getPosModules";
import { JuridicPerson } from "./stepOneTypes/juridicPerson";
import { PhysicalPerson } from "./stepOneTypes/physicalPerson";

interface stepOneI {
  setModules: Dispatch<SetStateAction<string[]>>;
  update?: boolean;
  formRef: React.RefObject<ProFormInstance>;
  updatePersonType?: "juridic" | "physical";
}

export const StepOne = ({ setModules, update, formRef, updatePersonType }: stepOneI) => {
  const [cep, setCep] = useState<string>("");
  const stepOneRef = useRef<ProFormInstance>(null);
  const cepRequest = useGetCEP(cep);
  const { PosModulesData } = useGetPosModules();

  const [personType, setPersonType] = useState<"physical" | "juridic">(
    updatePersonType || "physical"
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
      formRef?.current?.setFieldsValue({
        [personType]: {
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
    cepRequest.remove();
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
      onFinish={async (form) => {
        console.log(form);

        await waitTime(500);
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
        <Col md={{ span: 24 }} xs={{ span: 24 }}>
          <CheckCard.Group
            onChange={(value: any) => {
              setPersonType(value);
            }}
            defaultValue="physical"
            value={personType}
            disabled={update && updatePersonType ? true : false}
          >
            <CheckCard
              style={{
                backgroundColor:
                  personType === "physical"
                    ? defaultTheme["primary-300"]
                    : undefined,
              }}
              title={<Typography>Pessoa física</Typography>}
              description={
                <Typography>Tem como documento principal o CPF.</Typography>
              }
              avatar={
                <UserIcon
                  style={{
                    width: "32px",
                  }}
                />
              }
              value="physical"
            />
            <CheckCard
              style={{
                backgroundColor:
                  personType === "juridic"
                    ? defaultTheme["primary-300"]
                    : undefined,
              }}
              title={<Typography>Pessoa jurídica</Typography>}
              description={
                <Typography>Tem como documento principal o CNPJ.</Typography>
              }
              avatar={
                <BuildingOfficeIcon
                  style={{
                    width: "32px",
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
        {personType === "physical" && (
          <PhysicalPerson
            stepOneRef={stepOneRef}
            update={update}
            formRef={formRef}
          />
        )}
        <Col md={{ span: 24 }} xs={{ span: 24 }}>
          <Divider orientation="left">Endereço</Divider>
        </Col>
        <Col md={{ span: 8 }} xs={{ span: 24 }}>
          <ProFormText
            name={[personType, "cep"]}
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
            name={[personType, "address"]}
            label="Endereço"
            placeholder="Digite o Endereço"
            rules={[{ required: !update }]}
          />
        </Col>
        <Col md={{ span: 8 }}>
          <ProFormText
            name={[personType, "address_number"]}
            label="Número"
            placeholder="000"
            rules={[{ required: !update }]}
          />
        </Col>
        <Col md={{ span: 8 }} xs={{ span: 24 }}>
          <ProFormText
            name={[personType, "state"]}
            label="Estado"
            placeholder="Digite o estado"
            rules={[{ required: !update }]}
          />
        </Col>
        <Col md={{ span: 8 }} xs={{ span: 24 }}>
          <ProFormText
            name={[personType, "city"]}
            label="Cidade"
            placeholder="Digite a cidade"
            rules={[{ required: !update }]}
          />
        </Col>
        <Col md={{ span: 8 }} xs={{ span: 24 }}>
          <ProFormText
            name={[personType, "district"]}
            label="Bairro"
            placeholder="Digite o bairro"
            rules={[{ required: !update }]}
          />
        </Col>
        <Col md={{ span: 24 }} xs={{ span: 24 }}>
          <ProFormText
            name={[personType, "complement"]}
            label="Complemento"
            placeholder="Digite algum complemento"
          />
        </Col>
        <Col md={{ span: 24 }} xs={{ span: 24 }}>
          <Divider orientation="left">Configurações</Divider>
        </Col>

        <Col md={{ span: 8 }} xs={{ span: 24 }}>
          <ProFormSelect
            name={[personType, "module"]}
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
