import { LoadingOutlined } from "@ant-design/icons";
import { ProFormSelect } from "@ant-design/pro-components";
import { ClientParams } from "../../services/clients/__interfaces/clients.interface";
import { useListClients } from "../../services/clients/listClients";
import useDebounce from "@hooks/useDebounce";
import { Spin } from "antd";
import { Rule } from "antd/es/form";
import { DefaultOptionType } from "antd/es/select";
import { SelectProps } from "antd/lib";
import { useEffect, useState } from "react";

interface SelectModelsI {
  size?: "large" | "middle" | "small";
  query?: any;
  rules?: Rule[];
  fieldProps?: Partial<SelectProps<unknown, DefaultOptionType>>;
  name: string | (string | number)[];
  label: string;
  placeholder?: string;
  mode?: "multiple" | "tags" | "single" | undefined;
}

export const ProFormSelectClient = ({
  size,
  query,
  rules,
  fieldProps,
  name,
  label,
  placeholder,
  mode,
}: SelectModelsI) => {
  const [params, setParams] = useState<ClientParams>({ page: 1, size: 200 });
  const { data, isLoading } = useListClients(params);

  useEffect(() => {
    if (query?.promoter_id) {
      setParams((state) => ({
        ...state,
        w: `promoter_id=[${query.promoter_id}]`,
      }));
    } else {
      setParams((state) => ({
        ...state,
        w: undefined,
      }));
    }
  }, [query]);

  const debounceSearch = useDebounce((value) => {
    if (!value) {
      setParams((state) => ({
        ...state,
        s: undefined,
        f: undefined,
      }));
      return;
    }
    setParams((state) => ({
      ...state,
      s: value,
      f: "ref_id,ClientPerson.name,ClientJuridic.company_name,ClientPerson.cpf,ClientJuridic.cnpj,ClientAddress.state,ClientAddress.city,Master.username,ClientPOSModule.POSModule.name,Franchise.franchise_name,Franchise.cnpj,Promoter.promoter_name,Promoter.PromoterPerson.cpf,Promoter.PromoterJuridic.cnpj".split(
        ","
      ),
    }));
  }, 500);

  const filterOption = (inputValue: string, option: any) =>
    option.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1;

  return (
    <ProFormSelect
      name={name}
      label={label}
      placeholder={placeholder}
      mode={mode}
      options={data?.items.map((promoter) => ({
        label: promoter.name,
        value: promoter.id,
      }))}
      rules={rules}
      fieldProps={{
        onSearch: (value) => debounceSearch(value),
        suffixIcon: isLoading ? (
          <Spin size="small" indicator={<LoadingOutlined size={40} spin />} />
        ) : undefined,
        size: size ?? "large",
        style: { width: "100%" },
        showSearch: true,
        filterOption,
        ...fieldProps,
      }}
    />
  );
};
