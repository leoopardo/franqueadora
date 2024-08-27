import { LoadingOutlined } from "@ant-design/icons";
import { FranchiseParams } from "../../_franchisor/services/franchises/__interfaces/franchises.interface";
import { useListFranchises } from "../../_franchisor/services/franchises/listFranchises";
import useDebounce from "@hooks/useDebounce";
import { Select, Spin } from "antd";
import { useState } from "react";

interface SelectModelsI {
  value?: any;
  onChange: (value: any) => void;
  size?: "large" | "middle" | "small";
}

export const SelectFranchises = ({ onChange, value, size }: SelectModelsI) => {
  const [params, setParams] = useState<FranchiseParams>({ page: 1, size: 200 });
  const { data, isLoading } = useListFranchises(params);

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
      f: ["franchise_name", "cnpj", "ref_id", "username"].join(","),
    }));
  }, 500);

  const filterOption = (inputValue: string, option: any) =>
    option.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1;

  return (
    <Select
      placeholder="Selecione uma franquia."
      style={{ width: "100%" }}
      allowClear
      showSearch
      onChange={onChange}
      onSearch={(value) => debounceSearch(value)}
      filterOption={filterOption}
      value={value}
      options={data?.items.map((franchise) => ({
        label: franchise.franchise_name,
        value: franchise.id,
      }))}
      suffixIcon={isLoading ? <Spin size="small" indicator={<LoadingOutlined size={40} spin />} /> : undefined}
      size={size ?? "large"}
    />
  );
};
