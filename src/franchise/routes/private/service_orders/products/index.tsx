import { PageHeader } from "@components/header/pageHeader";
import TableComponent from "@components/table/tableComponent";
import {
  ProductParams,
  ProductType,
} from "@franchise/services/service_orders/products/_interfaces/products.interface";
import { useActivateProduct } from "@franchise/services/service_orders/products/activateProducts";
import { useDeleteProduct } from "@franchise/services/service_orders/products/deleteProduct";
import { useInactivateProduct } from "@franchise/services/service_orders/products/inactivateProduct";
import { useListProducts } from "@franchise/services/service_orders/products/listProducts";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useBreakpoints } from "@hooks/useBreakpoints";
import useDebounce from "@hooks/useDebounce";
import defaultTheme from "@styles/default";
import { getRelativeImagePath } from "@utils/gerRelativeImagePath";
import {
  Button,
  Col,
  Image,
  Input,
  Popconfirm,
  Row,
  Switch,
  Tooltip,
} from "antd";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export const Products = () => {
  const [params, setParams] = useState<ProductParams>({ page: 1, size: 15 });
  const { data, isLoading } = useListProducts(params);
  const { isSm } = useBreakpoints();
  const navigate = useNavigate();
  const deleteProduct = useDeleteProduct();
  const inactivate = useInactivateProduct();
  const activate = useActivateProduct();

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
      f: "name,description,brand".split(","),
    }));
  }, 500);

  function getUserType(type: string) {
    switch (type) {
      case "FRANCHISE":
        return "Franquia";
      case "PROMOTER":
        return "Promotor";
      case "CLIENT":
        return "Cliente";
      default:
        return;
    }
  }

  return (
    <Row
      style={{ width: "100%", padding: isSm ? 12 : 40 }}
      align="middle"
      gutter={[8, 8]}
    >
      <Col xs={{ span: 24 }} md={{ span: 12 }}>
        <PageHeader
          title="Produtos"
          subtitle="Visualize e gerencie todos os produtos cadastrados."
        />
      </Col>
      <Col xs={{ span: 24 }} md={{ span: 7 }}>
        <Input
          size="large"
          allowClear
          onChange={({ target }) => debounceSearch(target.value)}
          placeholder="Pesquisar produto"
          style={{borderRadius: 32}}
        />
      </Col>
      <Col xs={{ span: 24 }} md={{ span: 5 }}>
        <Link to={"cadastro"}>
          <Tooltip
            title={
              !localStorage.getItem("tenant") && localStorage.getItem("master")
                ? "Você deve acessar uma franquia para realizar cadastros"
                : undefined
            }
          >
            <Button
              style={{ width: "100%" }}
              size="large"
              type="primary"
              shape="round"
              disabled={
                !localStorage.getItem("tenant") &&
                localStorage.getItem("master")
                  ? true
                  : false
              }
            >
              Cadastrar produto
            </Button>
          </Tooltip>
        </Link>
      </Col>

      <Col span={24}>
        <TableComponent<ProductType>
          loading={isLoading || deleteProduct.isLoading}
          data={data}
          params={params}
          setParams={setParams}
          actions={[
            {
              label: "Editar",
              onClick: (row) => navigate(`edição`, { state: row }),
              icon: <PencilIcon style={{ width: 16 }} />,
            },
            {
              label: "Excluir",
              onClick: (row) => {
                deleteProduct.mutate({ id: row?.id || "" });
              },
              icon: <TrashIcon style={{ width: 16 }} />,
              confimation: (row) => ({
                title: `Excluir o produto: ${row?.name}.`,
                description: "Tem certeza que deseja excluir o produto?",
              }),
            },
          ]}
          columns={[
            {
              key: "active",
              head: "Status",
              custom: (row) => (
                <Popconfirm
                  placement="topLeft"
                  title={`${row.active ? "Inativar" : "Ativar"} produto?`}
                  description={`Tem certeza que deseja ${row.active ? "inativar" : "ativar"} o produto?`}
                  okText={`Sim, ${row.active ? "inativar" : "ativar"}`}
                  cancelText="Não, cancelar."
                  onConfirm={() => {
                    row.active
                      ? inactivate.mutate({
                          body: { active: false },
                          id: row.id ?? "",
                        })
                      : activate.mutate({
                          body: { active: true },
                          id: row.id ?? "",
                        });
                  }}
                >
                  <Switch
                    checked={row?.active || false}
                    loading={inactivate.isLoading || activate.isLoading}
                  />
                </Popconfirm>
              ),
              width: 60,
            },
            {
              key: "image",
              head: "",
              custom: (row) => (
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <Image
                    src={
                      row.image
                        ? getRelativeImagePath(row.image)
                        : "/logoWhiteDef.svg"
                    }
                    alt={row.name || ""}
                    style={{
                      height: 50,
                      maxWidth: 50,
                      borderRadius: 4,
                      backgroundColor: row.image
                        ? "transparent"
                        : defaultTheme.primary,
                    }}
                  />
                </div>
              ),
              width: 80,
            },
            {
              key: "name",
              head: "Nome do produto",
              custom: (row) => row.name,
              width: 150,
            },
            {
              key: "description",
              head: "Descrição",
              custom: (row) => (
                <Tooltip
                  title={
                    row?.description && row?.description?.length > 20
                      ? row.description
                      : undefined
                  }
                  placement="right"
                >
                  {row?.description && row?.description?.length > 20
                    ? `${row.description?.substring(0, 20)}...`
                    : row.description}
                </Tooltip>
              ),
              width: 150,
            },
            {
              key: "unit",
              head: "Unidade de medida",
              custom: (row) => row.unit,
              width: 150,
            },
            {
              key: "is_additional",
              head: "Adicional?",
              custom: (row) => (row.is_additional ? "Sim" : "Não"),
            },
            { key: "brand", head: "Marca", custom: (row) => row.brand || "-" },
            {
              key: "created_by",
              head: "Criado por",
              custom: (row) => (
                <div>
                  <div>{row.created_by || "-"}</div>
                  <div>{getUserType(row.creator_type || "")}</div>
                </div>
              ),
            },
          ]}
        />
      </Col>
    </Row>
  );
};
