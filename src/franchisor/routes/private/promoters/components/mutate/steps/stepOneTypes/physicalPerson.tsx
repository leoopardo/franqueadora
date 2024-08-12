import {
  ProFormDatePicker,
  ProFormInstance,
  ProFormSelect,
  ProFormSwitch,
  ProFormText,
} from "@ant-design/pro-components";
import { useListFranchises } from "@franchisor/services/franchises/listFranchises";
import useDebounce from "@hooks/useDebounce";
import { formatCellPhoneBR, formatCPF, formatRG } from "@utils/regexFormat";
import { Col } from "antd";
import { useState } from "react";
import ptbr from "antd/lib/date-picker/locale/pt_BR";
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

  const [, setBodyValidate] = useState<{
    cpf?: string;
    rg?: string;
    phone?: string;
  }>({});
  // TODO - implementar o validate do step 1
  // const validate = usePromoterValidateStepOne({ body: bodyValidate });
  // console.log(validate.data);

  const handleValidate = useDebounce((key, value) => {
    setBodyValidate((state) => ({ ...state, [key]: value }));
  }, 500);

  return (
    <>
      <Col md={{ span: 24 }} xs={{ span: 24 }}>
        <ProFormSwitch
          name={["physical", "client_manager"]}
          label="Gerencia clientes?"
        />
      </Col>
      <Col md={{ span: 8 }} xs={{ span: 24 }}>
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
      <Col md={{ span: 8 }} xs={{ span: 24 }}>
        <ProFormText
          name={["physical", "name"]}
          label="Nome completo"
          placeholder="Digite o nome completo"
          rules={[{ required: !update }]}
          fieldProps={{}}
        />
      </Col>
      <Col md={{ span: 8 }} xs={{ span: 24 }}>
        <ProFormText
          name={["physical", "commercial_name"]}
          label="Nome fantasia"
          placeholder="Digite o nome fantasia"
          rules={[{ required: !update }]}
          fieldProps={{}}
        />
      </Col>
      <Col md={{ span: 8 }} xs={{ span: 24 }}>
        <ProFormText
          name={["physical", "cpf"]}
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
      <Col md={{ span: 8 }} xs={{ span: 24 }}>
        <ProFormText
          name={["physical", "rg"]}
          label="RG"
          placeholder="Digite o RG"
          validateTrigger={["onChange", "onBlur", "onPaste"]}
          rules={[{ required: !update, len: 12 }]}
          getValueFromEvent={(e) => formatRG(e.target.value)}
        />
      </Col>
      <Col md={{ span: 8 }} xs={{ span: 24 }}>
        <ProFormDatePicker
          name={["physical", "birthdate"]}
          label="Data de nascimento"
          placeholder="Digite a data de nascimento"
          rules={[{ required: !update }]}
          fieldProps={{
            style: { width: "100%" },
            locale: ptbr,
          }}
        />
      </Col>
      <Col md={{ span: 8 }} xs={{ span: 24 }}>
        <ProFormText
          name={["physical", "phone"]}
          label="Celular"
          placeholder="Digite o número do celular"
          validateTrigger={["onChange", "onBlur", "onPaste"]}
          rules={[{ required: !update }]}
          getValueFromEvent={(e) => formatCellPhoneBR(e.target.value)}
        />
      </Col>
    </>
  );
};
