import { Col, Empty, Row, Tooltip, Typography } from "antd";
import { ColumnsType } from "antd/es/table";
import { Dispatch, SetStateAction, useEffect, useMemo, useState } from "react";
import { useBreakpoints } from "../../hooks/useBreakpoints";
import { ProColumns, ProTable } from "@ant-design/pro-components";

export interface ColumnInterface {
  name: string | any; // (nome da coluna caso não passe head) e chave do objeto a ser acessado nos items
  head?: string; // nome da coluna (opcional) caso não seja passado, será usado o name
  type:
    | "id" // exibe um botão de copiar contendo o id em um tooltip
    | "text"
    | "franchise" // exibe nome da franquia e documento
    | "promoter" // exibe nome do promotor e documento
    | "boolean" // retorna sim para true e não para false
    | "switch" // exibe switch para troca de status
    | "action"
    | "";
  sort?: boolean; // habilita ordenação
  key?: any;
  sort_name?: string; //nome do campo para ordenação
  filters?: { text: string; value: any }[];
}

export interface actionsInterface {
  label?: string; // label da ação
  icon?: any; // ícone da ação
  id?: string; // id da ação
  onClick?: (item?: any) => void; // função a ser executada ao clicar na ação
  disabled?: (item?: any) => boolean; // função que retorna se a ação está desabilitada
}

interface TableProps {
  data: any; // dados da tabela pode conter dados da paginação;
  items: any; // itens da tabela. array contendo somente os itens a ser mapeados
  columns: ColumnInterface[]; // colunas da tabela
  loading: boolean; // define se a tabela está carregando
  updateLoading?: boolean; // define se os botões de atualizar da tabela estão carregando
  query: any; // váriavel contendo os parâmetros de busca para a chamada que mapeia a tabela
  error?: any; // erro da chamada que mapeia a tabela
  removeValue?: boolean; //remove o valor total da tabela caso mobile
  setQuery: Dispatch<SetStateAction<any>>; // função para setar os parâmetros de busca
  label?: string[]; // valores que aparecerão nos accordeons da tabela mobile
  removeTotal?: boolean; // remove a contagem total de registros da tabela
  actions?: (actionsInterface | false | undefined)[]; // array de objetos contendo as ações que aparecerão na tabela
  removePagination?: boolean; // remove a paginação da tabela
  isConfirmOpen?: boolean; // define se o modal de confirmação está aberto
  setIsConfirmOpen?: Dispatch<SetStateAction<boolean>>; // função para setar o modal de confirmação
  isConfirmUpdateOpen?: boolean; // define se o modal de confirmação de atualizçaão está aberto
  setIsConfirmUpdateOpen?: Dispatch<SetStateAction<boolean>>; // função para setar o modal de confirmação de atualização
  itemToAction?: string | null; // item que será afetado pela ação de confirmação
  onConfirmAction?: () => void; // função que será executada ao confirmar a ação
  disableScrollToTop?: boolean; // desabilita o scroll para o topo da página
  checkbox?: boolean; // habilita a seleção de linhas
  setSelectedRows?: Dispatch<SetStateAction<any>>; // função para setar as linhas selecionadas
  selectedKeys?: any; // chaves das linhas selecionadas
  refetch?: () => void; // função para rebuscar dos dados
  update?: () => void; // função para atualizar os dados
  disableActions?: boolean; // desabilita as ações
  rowKey?: string;
  size?: "large" | "middle" | "small"; // tamanho da tabela
}

export const TableComponent = (props: TableProps) => {
  const [columns, setColumns] = useState<ProColumns<ColumnInterface, "text">[]>(
    []
  );
  const { isSm } = useBreakpoints();

  const actions = useMemo(() => {
    const act: any = [];
    if (props.actions && props.actions.length > 0) {
      for (const action of props.actions) {
        if (action)
          act.push({
            id: action?.id,
            key: action?.label,
            label: action?.label,
            icon: action?.icon,
            disabled: action?.disabled,
            onClick: action?.onClick,
          });
      }
    }
    return act;
  }, [isSm]);

  const rowSelection = {
    onChange: (_selectedRowKeys: any, selectedRows: any) => {
      props.setSelectedRows ? props?.setSelectedRows(selectedRows) : undefined;
    },
  };

  useEffect(() => {
    if (
      props.actions &&
      props.actions.length > 0 &&
      !props.columns.find((column) => column?.name === "actions")
    ) {
      props.columns.push({ name: "actions", type: "action" });
    }
  }, [props.columns]);

  useEffect(() => {
    if (!props.disableScrollToTop) {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    }
  }, [props.query.page]);

  useEffect(() => {
    setColumns(
      props?.columns?.map((column) => {
        switch (column.type) {
          default:
            return {
              title: (
                <Typography
                  style={{ width: "100%", textAlign: "center" }}
                  ref={column.key}
                >
                  {column?.head ?? column?.name}
                </Typography>
              ),
              fixed: "left",
              key: column?.sort_name
                ? column.sort_name
                : Array.isArray(column?.name)
                  ? column?.name + `${Math.random()}`
                  : column?.name,
              dataIndex: column?.name,
              render: (_a: any, record: any) => (
                <Typography style={{ textAlign: "center" }}>
                  {record[column?.name] ?? "-"}
                </Typography>
              ),
              sorter: column.sort
                ? () => {
                    props.setQuery((state: any) => ({
                      ...state,
                      sort_field: column?.sort_name
                        ? column.sort_name
                        : Array.isArray(column?.name)
                          ? column?.name[1]
                          : column?.name,
                      sort_order:
                        props.query.sort_order === "DESC" ? "ASC" : "DESC",
                    }));

                    return 0;
                  }
                : undefined,
              filters: column.filters,
            };
        }
      })
    );
  }, [props.columns]);

  return (
    <Row gutter={[8, 8]}>
      <Col span={24}>
        <ProTable
          size={"large"}
          locale={{
            emptyText: props.error ? (
              <div style={{ display: "flex", justifyContent: "center" }}>
                <Empty
                  style={{
                    padding: 15,
                    paddingBottom: 30,
                    maxWidth: "430px",
                  }}
                  image={Empty.PRESENTED_IMAGE_SIMPLE}
                  description={<div>erro</div>}
                />
              </div>
            ) : (
              <Empty
                style={{ padding: 15, paddingBottom: 30 }}
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                description={"Nenhum dado encontrado"}
              />
            ),
          }}
          pagination={{
            current: Number(props?.query?.page ?? 1),
            pageSize: Number(props?.query?.limit ?? 25),
            showTotal: (total, range) => {
              return props.removeTotal
                ? `${range[0]} - ${
                    props?.items?.length < props?.data?.limit
                      ? props?.data?.limit * props?.data?.page
                      : props?.data?.limit * props?.data?.page + 1
                  }`
                : `${range[0]} - ${range[1]} de ${total}`;
            },
            total: props.removeTotal
              ? props?.items?.length < props?.data?.limit
                ? props?.data?.limit * props?.data?.page
                : props?.data?.limit * props?.data?.page + 1
              : props?.data?.total,
            showSizeChanger: true,

            /* onChange: (page) => {
            props.setQuery((state: any) => ({ ...state, page }));
          }, */
            pageSizeOptions: [10, 25, 50, 100],
            defaultPageSize: 25,
            onShowSizeChange: (_current, size) =>
              props.setQuery((state: any) => ({ ...state, limit: size })),
            style: {
              display:
                props.removePagination || props.error ? "none" : undefined,
            },
          }}
          sortDirections={["ascend", "descend"]}
          dataSource={props?.error ? [] : props?.items ? props.items : []}
          rowSelection={
            props?.checkbox
              ? {
                  type: "checkbox",
                  selectedRowKeys: props.selectedKeys?.map(
                    (item: any) => item?.id ?? item?._id ?? Math.random() * 100
                  ),
                  ...rowSelection,
                }
              : undefined
          }
          direction="ltr"
          rowKey={props?.rowKey || "id"}
          columns={columns}
          loading={props.loading}
          showSorterTooltip={false}
          scroll={{ x: "none" }}
          sticky
          bordered
        />
      </Col>

      {/* <Confirmation
      open={props?.isConfirmUpdateOpen as any}
      setOpen={props?.setIsConfirmUpdateOpen || (() => {})}
      submit={props?.update || (() => {})}
      title={t("actions.edit")}
      description={
        props?.currentItem?.validity_status === "EXPIRED"
          ? `${t("messages.license_expired")}`
          : `${t("messages.are_you_sure_status", {
              action: t("actions.edit")?.toLocaleLowerCase(),
              itens: props?.currentItem?.name,
            })}`
      }
      loading={props?.loading}
    /> */}
    </Row>
  );
};
