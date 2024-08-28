import { LoadingOutlined } from "@ant-design/icons";
import { ClientParams } from "../../_franchisor/services/clients/__interfaces/clients.interface";
import { useListClients } from "../../_franchisor/services/clients/listClients";
import useDebounce from "@hooks/useDebounce";
import { Select, Spin } from "antd";
import { useState } from "react";

interface SelectModelsI {
  value?: any;
  onChange: (value: any) => void;
  size?: "large" | "middle" | "small";
}

export const SelectClients = ({ onChange, value, size }: SelectModelsI) => {
  const [params, setParams] = useState<ClientParams>({ page: 1, size: 200 });
  const { data, isLoading } = useListClients(params);

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
    <Select
      placeholder="Selecione um cliente."
      style={{ width: "100%" }}
      allowClear
      showSearch
      onChange={onChange}
      onSearch={(value) => debounceSearch(value)}
      filterOption={filterOption}
      value={value}
      options={data?.items.map((client) => ({
        label: client.name,
        value: client.id,
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
