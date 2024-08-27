import { LoadingOutlined } from "@ant-design/icons";
import { PromotersParams } from "../../_franchisor/services/promoters/__interfaces/promoters.interface";
import { useListPromoters } from "../../_franchisor/services/promoters/listPromoters";
import useDebounce from "@hooks/useDebounce";
import { Select, Spin } from "antd";
import { useEffect, useState } from "react";

interface SelectModelsI {
  value?: any;
  onChange: (value: any) => void;
  size?: "large" | "middle" | "small";
  query?: any;
}

export const SelectPromoters = ({
  onChange,
  value,
  size,
  query,
}: SelectModelsI) => {
  const [params, setParams] = useState<PromotersParams>({ size: 1000, page: 1, orderBy: undefined, orderDirection: undefined });
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
      f: `ref_id,PromoterPerson.name,PromoterJuridic.company_name,PromoterPerson.cpf,PromoterJuridic.cnpj,Master.username,PromoterAddress.city,PromoterAddress.state,PromoterPOSModule.POSModule.name,Franchise.franchise_name,Franchise.cnpj`.split(","),
    }));
  }, 500);

  const filterOption = (inputValue: string, option: any) =>
    option.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1;

  return (
    <Select
      placeholder="Selecione um promotor."
      style={{ width: "100%" }}
      allowClear
      showSearch
      onChange={onChange}
      onSearch={(value) => debounceSearch(value)}
      filterOption={filterOption}
      value={value}
      options={data?.items.map((promoter) => ({
        label: promoter.promoter_name,
        value: promoter.id,
      }))}
      suffixIcon={
        isLoading ? (
          <Spin size="small" indicator={<LoadingOutlined size={40} spin />} />
        ) : undefined
      }
      size={size ?? "large"}
    />
  );
};
