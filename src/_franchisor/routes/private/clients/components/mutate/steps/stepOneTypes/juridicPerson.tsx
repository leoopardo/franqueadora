import {
  ProFormInstance,
  ProFormSelect,
  ProFormText,
} from "@ant-design/pro-components";
import { useGetCNPJ } from "../../../../../../../services/brasilApi/getCNPJ";
import { useListFranchises } from "../../../../../../../services/franchises/listFranchises";
import { useValidateStepOne } from "../../../../../../../services/franchises/validation/validateStepOne";
import useDebounce from "@hooks/useDebounce";
import { formatCNPJ } from "@utils/regexFormat";
import { Col } from "antd";
import { useEffect, useState } from "react";

interface juridicPersonI {
  stepOneRef: React.RefObject<ProFormInstance>;
  update?: boolean;
}

export const JuridicPerson = ({ stepOneRef, update }: juridicPersonI) => {
  const [bodyValidate, setBodyValidate] = useState({
    cnpj: "",
  });
  const validateStepOne = useValidateStepOne({ body: bodyValidate });
  const [cnpj, setCnpj] = useState<string>("");
  const cnpjRequest = useGetCNPJ(cnpj);
  const { data } = useListFranchises({
    page: 1,
    size: 500,
    orderBy: "franchise_name",
    orderDirection: "asc",
  });

  const handleValidate = useDebounce((key, value) => {
    setBodyValidate((state) => ({ ...state, [key]: value }));
  }, 500);

  const handleChangeCnpj = useDebounce((value) => {
    setCnpj(value);
    cnpjRequest.remove();
  }, 500);

  useEffect(() => {
    if (cnpjRequest.data) {
      stepOneRef?.current?.setFieldsValue({
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

  useEffect(() => {
    if (cnpj && cnpjRequest.error)
      stepOneRef?.current?.validateFields(["cnpj"]);
  }, [cnpjRequest]);

  return (
    <>
      <Col md={{ span: 12 }} xs={{ span: 24 }}>
        <ProFormSelect
          name={["physical", "franchise_id"]}
          label="Franquia"
          placeholder="Selecione a franquia"
          mode="single"
          options={data?.items.map((value) => ({
            kay: value.id,
            label: value.franchise_name,
            value: value.id,
          }))}
          rules={[{ required: !update }]}
          fieldProps={{ maxTagCount: 1 }}
        />
      </Col>
      
      <Col md={{ span: 12 }} xs={{ span: 24 }}>
        <ProFormText
          name={["physical", "cnpj"]}
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
          }}
          getValueFromEvent={(e) => formatCNPJ(e.target.value)}
        />
      </Col>
      <Col md={{ span: 8 }} xs={{ span: 24 }}>
        <ProFormText
          name={["physical", "company_name"]}
          label="Razão social"
          placeholder="Digite a razão social"
          rules={[{ required: !update }]}
        />
      </Col>
      <Col md={{ span: 8 }} xs={{ span: 24 }}>
        <ProFormText
          name={["physical", "commercial_name"]}
          label="Nome fantasia"
          placeholder="Digite o nome fantasia"
          rules={[{ required: !update }]}
        />
      </Col>
      <Col md={{ span: 8 }} xs={{ span: 24 }}>
        <ProFormText
          name={["physical", "state_registration"]}
          label="Inscrição estadual"
          placeholder="Digite a inscição estadual"
          rules={[{ required: !update }]}
        />
      </Col>
    </>
  );
};
