import { LoadingOutlined } from "@ant-design/icons";
import { ProFormSelect } from "@ant-design/pro-components";
import { PromotersParams } from "@franchisor/services/promoters/__interfaces/promoters.interface";
import { useListPromoters } from "@franchisor/services/promoters/listPromoters";
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

export const ProFormSelectPromoters = ({
  size,
  query,
  rules,
  fieldProps,
  name,
  label,
  placeholder,
  mode,
}: SelectModelsI) => {
  const [params, setParams] = useState<PromotersParams>({
    size: 1000,
    page: 1,
    orderBy: undefined,
    orderDirection: undefined,
  });
  const { data, isLoading } = useListPromoters(params);

  useEffect(() => {
    if (query?.franchise_id) {
      setParams((state) => ({
        ...state,
        w: `franchise_id=[${query.franchise_id}]`,
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
      f: `ref_id,PromoterPerson.name,PromoterJuridic.company_name,PromoterPerson.cpf,PromoterJuridic.cnpj,Master.username,PromoterAddress.city,PromoterAddress.state,PromoterPOSModule.POSModule.name,Franchise.franchise_name,Franchise.cnpj`.split(
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
        label: promoter.promoter_name,
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
