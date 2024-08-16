import {
  ProFormDatePicker,
  ProFormField,
  ProFormInstance,
  ProFormText,
} from "@ant-design/pro-components";
import useDebounce from "@hooks/useDebounce";
import { formatCellPhoneBR, formatCPF, formatRG } from "@utils/regexFormat";
import { Col } from "antd";
import ptbr from "antd/lib/date-picker/locale/pt_BR";
import { useEffect, useState } from "react";
import { queryClient } from "../../../../../../../../services/queryClient";
import { getMeI } from "@franchise/services/auth/useGetMe";
import { ProFormSelectPromoters } from "@franchise/components/proFormSelects/SelectPromoters";
interface PhysicalPersonI {
  stepOneRef: React.RefObject<ProFormInstance>;
  update?: boolean;
  formRef?: React.RefObject<ProFormInstance>;
}
export const PhysicalPerson = ({ update, formRef }: PhysicalPersonI) => {
  const [, setBodyValidate] = useState<{
    cpf?: string;
    rg?: string;
    phone?: string;
  }>({});

  const user = queryClient.getQueryData("getMeFranchise") as getMeI;
  const [promoterQuery, setPromoterQuery] = useState<any>({
    franchise_id: user?.Franchise ? user?.Franchise[0]?.id : undefined,
  });
  // TODO - implementar o validate do step 1
  // const validate = usePromoterValidateStepOne({ body: bodyValidate });
  // console.log(validate.data);

  const handleValidate = useDebounce((key, value) => {
    setBodyValidate((state) => ({ ...state, [key]: value }));
  }, 500);

  useEffect(() => {
    if (formRef?.current?.getFieldValue(["physical", "franchise_id"])) {
      setPromoterQuery({
        franchise_id: formRef?.current?.getFieldValue([
          "physical",
          "franchise_id",
        ]),
      });
    }
  }, [formRef?.current?.getFieldValue(["physical", "franchise_id"])]);

  useEffect(() => {
    if (user?.Franchise && user?.Franchise[0]?.id)
      formRef?.current?.setFieldValue(
        ["physical", "franchise_id"],
        user?.Franchise ? user?.Franchise[0]?.id : undefined
      );
    if (user?.Promoter && user?.Promoter.id)
      formRef?.current?.setFieldValue(
        ["physical", "promoter_id"],
        user?.Promoter ? user?.Promoter.id : undefined
      );
  }, [user]);

  return (
    <>
      <Col md={{ span: 8 }} xs={{ span: 24 }} style={{ display: "none" }}>
        <ProFormField
          name={["physical", "franchise_id"]}
          label="Franquia"
          placeholder="Selecione a franquia"
        />
      </Col>
      <Col md={{ span: 8 }} xs={{ span: 24 }}>
        <ProFormSelectPromoters
          label="Promotor"
          name={["physical", "promoter_id"]}
          rules={[{ required: !update }]}
          query={promoterQuery}
          fieldProps={{ disabled: !promoterQuery }}
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
