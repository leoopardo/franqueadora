import { LoadingOutlined } from "@ant-design/icons";
import { ProFormSelect } from "@ant-design/pro-components";
import { Services } from "@franchise/services";
import { ProductParams } from "@franchise/services/service_orders/products/_interfaces/products.interface";
import useDebounce from "@hooks/useDebounce";
import { getRelativeImagePath } from "@utils/gerRelativeImagePath";
import { Avatar, Space, Spin } from "antd";
import { Rule } from "antd/es/form";
import { DefaultOptionType } from "antd/es/select";
import { SelectProps } from "antd/lib";
import { useEffect, useState } from "react";

interface SelectModelsI {
  size?: "large" | "middle" | "small";
  query?: ProductParams;
  rules?: Rule[];
  fieldProps?: Partial<SelectProps<unknown, DefaultOptionType>>;
  name: string | (string | number)[];
  label: string;
  placeholder?: string;
  mode?: "multiple" | "tags" | "single" | undefined;
  isClient?: boolean;
}

export const ProFormSelectProducts = ({
  size,
  rules,
  fieldProps,
  name,
  label,
  placeholder,
  mode,
  query,
}: SelectModelsI) => {
  const [params, setParams] = useState<ProductParams>({
    size: 200,
    page: 1,
    orderBy: undefined,
    orderDirection: undefined,
  });
  const { data, isLoading } = Services.product.list(params);

  useEffect(() => {
    if (query) setParams(query);
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
      f: `name,description`.split(","),
    }));
  }, 500);

  const filterOption = (inputValue: string, option: any) =>
    option?.name?.toLowerCase().indexOf(inputValue.toLowerCase()) > -1;

  return (
    <ProFormSelect
      name={name}
      label={label}
      placeholder={placeholder}
      mode={mode}
      options={data?.items
        .filter((product) => (query?.type ? product.type === query.type : true))
        .map((product) => ({
          label: (
            <Space>
              <Avatar src={getRelativeImagePath(`${product?.image}`)} />
              {product.name}
            </Space>
          ),
          name: product.name,
          value: product.id,
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
