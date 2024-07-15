import {
  ProFormInstance,
  ProFormSelect,
  ProFormSwitch,
  ProFormText,
} from "@ant-design/pro-components";
import { useListFranchises } from "@franchisor/services/franchises/listFranchises";
import useDebounce from "@hooks/useDebounce";
import { formatCPF, formatRG } from "@utils/regexFormat";
import { Col } from "antd";
import { useState } from "react";
interface PhysicalPersonI {
  stepOneRef: React.RefObject<ProFormInstance>;
  update?: boolean;
  formRef?: React.RefObject<ProFormInstance>;
}
export const PhysicalPerson = ({ update, formRef }: PhysicalPersonI) => {
  const { data } = useListFranchises({
    page: 1,
    size: 500,
    orderBy: "franchise_name",
    orderDirection: "asc",
  });
  const [, setBodyValidate] = useState({});
  const handleValidate = useDebounce((key, value) => {
    setBodyValidate((state) => ({ ...state, [key]: value }));
  }, 500);

  return (
    <>
      <Col md={{ span: 24 }} xs={{ span: 24 }}>
        <ProFormSwitch name="manage_clients" label="Gerencia clientes?" />
      </Col>
      <Col md={{ span: 8 }} xs={{ span: 24 }}>
        <ProFormSelect
          name="franchise_id"
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
      <Col md={{ span: 8 }} xs={{ span: 24 }}>
        <ProFormText
          name="complete_name"
          label="Nome completo"
          placeholder="Digite o nome completo"
          rules={[{ required: !update }]}
          fieldProps={{}}
        />
      </Col>
      <Col md={{ span: 8 }} xs={{ span: 24 }}>
        <ProFormText
          name="fantasy_name"
          label="Nome fantasia"
          placeholder="Digite o nome fantasia"
          rules={[{ required: !update }]}
          fieldProps={{}}
        />
      </Col>
      <Col md={{ span: 12 }} xs={{ span: 24 }}>
        <ProFormText
          name="cpf"
          label="CPF"
          placeholder="Digite o CPF"
          validateTrigger={["onChange", "onBlur", "onPaste"]}
          rules={[{ required: !update }]}
          fieldProps={{
            onChange(e) {
              handleValidate("cpf", e.target.value);
              formRef?.current?.setFieldValue(
                ["master", "cpf"],
                e.target.value
              );
            },
          }}
          getValueFromEvent={(e) => formatCPF(e.target.value)}
        />
      </Col>
      <Col md={{ span: 12 }} xs={{ span: 24 }}>
        <ProFormText
          name="rg"
          label="RG"
          placeholder="Digite o RG"
          validateTrigger={["onChange", "onBlur", "onPaste"]}
          rules={[{ required: !update, len: 12 }]}
          getValueFromEvent={(e) => formatRG(e.target.value)}
        />
      </Col>
    </>
  );
};
