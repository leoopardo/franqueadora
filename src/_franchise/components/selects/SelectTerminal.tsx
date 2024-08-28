import { terminalParams } from "../../services/terminals/__interfaces/terminals.interface";
import { useListTerminals } from "../../services/terminals/listTerminals";
import useDebounce from "@hooks/useDebounce";
import { Rule } from "antd/es/form";
import Select, { DefaultOptionType } from "antd/es/select";
import { SelectProps } from "antd/lib";
import { useState } from "react";

interface SelectModelsI {
  size?: "large" | "middle" | "small";
  query?: any;
  rules?: Rule[];
  fieldProps?: Partial<SelectProps<unknown, DefaultOptionType>>;
  placeholder?: string;
  mode?: "multiple" | "tags" | undefined;
  onSelect?: (value: any, option: any) => void;
  dropdownRender?: (menu: React.ReactElement) => React.ReactElement;
}

export const SelectTerminal = ({
  size,
  placeholder,
  mode,
  dropdownRender,
  onSelect,
}: SelectModelsI) => {
  const [params, setParams] = useState<terminalParams>({ page: 1, size: 200 });
  const { data, isLoading } = useListTerminals(params);

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
      f: "serial_number".split(","),
    }));
  }, 500);

  const filterOption = (inputValue: string, option: any) =>
    option.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1;

  return (
    <Select
      placeholder={placeholder}
      mode={mode}
      options={data?.items.map((terminal) => ({
        label: terminal.serial_number,
        value: terminal.id,
      }))}
      onSearch={(value) => debounceSearch(value)}
      loading={isLoading}
      style={{ width: "100%" }}
      size={size ?? "large"}
      showSearch
      filterOption={filterOption}
      onSelect={onSelect}
      dropdownRender={dropdownRender}
    />
  );
};
