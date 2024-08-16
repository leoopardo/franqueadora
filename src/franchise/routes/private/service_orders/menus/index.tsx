import { SearchOutlined } from "@ant-design/icons";
import { PageHeader } from "@components/header/pageHeader";
import TableComponent from "@components/table/tableComponent";
import { Services } from "@franchise/services";
import { MenuType } from "@franchise/services/menus/__interfaces/menu.interface";
import { ProductParams } from "@franchise/services/service_orders/products/_interfaces/products.interface";
import { useActivateProduct } from "@franchise/services/service_orders/products/activateProducts";
import { useDeleteProduct } from "@franchise/services/service_orders/products/deleteProduct";
import { useInactivateProduct } from "@franchise/services/service_orders/products/inactivateProduct";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useBreakpoints } from "@hooks/useBreakpoints";
import useDebounce from "@hooks/useDebounce";
import { formatCpfCnpj } from "@utils/regexFormat";
import {
  Button,
  Col,
  Input,
  Popconfirm,
  Row,
  Switch,
  Tooltip,
  Typography,
} from "antd";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export const Menus = () => {
  const [params, setParams] = useState<ProductParams>({ page: 1, size: 15 });
  const { data, isLoading } = Services.menu.list(params);
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

  return (
    <Row
      style={{ width: "100%", padding: isSm ? 12 : 40 }}
      align="middle"
      gutter={[8, 8]}
    >
      <Col xs={{ span: 24 }} md={{ span: 12 }}>
        <PageHeader
          title="Cardápios"
          subtitle="Visualize e gerencie todos os cardápios cadastrados."
        />
      </Col>
      <Col xs={{ span: 24 }} md={{ span: 7 }}>
        <Input
          size="large"
          allowClear
          onChange={({ target }) => debounceSearch(target.value)}
          placeholder="Pesquisar cardápio"
          style={{ borderRadius: 32 }}
          suffix={<SearchOutlined style={{ width: 16 }} />}
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
              Cadastrar cardápio
            </Button>
          </Tooltip>
        </Link>
      </Col>

      <Col span={24}>
        <TableComponent<MenuType>
          loading={isLoading || deleteProduct.isLoading}
          data={data}
          params={params}
          setParams={setParams}
          actions={[
            {
              label: "Editar",
              onClick: (row) => navigate(`edição/${row?.id}`, { state: row }),
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
              key: "name",
              head: "Nome do cardápio",
              custom: (row) => row.name,
              width: 150,
            },
            {
              key: "promoter_name",
              head: "Promotor",
              custom: (row) => (
                <Row gutter={[4, 4]}>
                  <Col span={24}>
                    <Typography.Text>{row.promoter_name}</Typography.Text>
                  </Col>
                  <Col span={24}>
                    <Typography.Text copyable style={{ color: "#71717A" }}>
                      {formatCpfCnpj(row.promoter_document || "")}
                    </Typography.Text>
                  </Col>
                </Row>
              ),
              width: 180,
            },
            {
              key: "client_name",
              head: "Cliente",
              custom: (row) =>
                row.client_name ? (
                  <Row gutter={[4, 4]}>
                    <Col span={24}>
                      <Typography.Text>{row.client_name}</Typography.Text>
                    </Col>
                    <Col span={24}>
                      <Typography.Text copyable style={{ color: "#71717A" }}>
                        {formatCpfCnpj(row.client_document || "")}
                      </Typography.Text>
                    </Col>
                  </Row>
                ) : (
                  "-"
                ),
              width: 180,
            },
            {
              key: "itens_quantity",
              head: "Quantidade de produtos",
            },
            {
              key: "event_name",
              head: "Evento vinculado",
            },
          ]}
        />
      </Col>
    </Row>
  );
};
