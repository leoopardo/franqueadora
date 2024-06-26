import { ProFormInstance, StepsForm } from "@ant-design/pro-components";
import { Dispatch, SetStateAction, useRef, useState } from "react";
import { createFranchiseI } from "../../../../../services/franchises/interfaces/create_franchise.interface";
import { StepOne } from "./steps/stepOne";
import { StepThree } from "./steps/stepThree";
import { StepTwo } from "./steps/stepTwo";

interface mutateI {
  body: createFranchiseI;
  setBody: Dispatch<SetStateAction<createFranchiseI>>;
  mutate: () => void;
  loading?: boolean;
  success?: boolean;
  error?: any;
}

export const MutateFranchise = ({ mutate, setBody }: mutateI) => {
  const formRef = useRef<ProFormInstance>();
  const [modules, setModules] = useState<string[]>([]);

  const waitTime = (values: any) => {
    return new Promise<boolean>((resolve) => {
      setBody({
        address: {
          address: values.address,
          cep: values.cep,
          city: values.city,
          complement: values.complement,
          district: values.district,
          number: values.number,
          state: values.state,
        },
        agreement: [],
        area_codes: values.area_code,
        cnpj: values.cnpj.replace(/\D/g, ""),
        commercial_name: values.company_name,
        company_name: values.company_name,
        contacts: [],
        counties: values.counties,
        franchise_name: values.franchise_name,
        master: {
          cpf: values.cpf,
          email: values.email,
          name: values.name,
          password: values.password,
          phone: values.phone,
          terminal_password: values.terminal_password,
          username: values.username,
        },
        module: values.module,
        state_registration: `${values.state_registration}`,
      });
      setTimeout(() => {
        mutate();
        resolve(true);
      }, 500);
      resolve(true);
    });
  };

  return (
    <StepsForm<createFranchiseI>
      formRef={formRef}
      onFinish={waitTime}
      onCurrentChange={() => window.scrollTo({ top: 0, behavior: "smooth" })}
    >
      <StepOne setModules={setModules} />
      <StepTwo />
      <StepThree modules={modules} />
    </StepsForm>
  );
};
