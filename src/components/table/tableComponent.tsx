import { LoadingOutlined } from "@ant-design/icons";
import { EllipsisVerticalIcon, PlusIcon } from "@heroicons/react/24/outline";
import { Button, Dropdown, Empty, Modal, Spin, Table, Typography } from "antd";
import { TableRowSelection } from "antd/es/table/interface";
import { Dispatch, SetStateAction } from "react";
import ParamsI from "../../_franchisor/services/__interfaces/queryParams.interface";
import ResponseI from "../../_franchisor/services/__interfaces/response.interface";

interface ActionsI<RowItemI> {
  label?: string;
  icon?: any;
  id?: string;
  onClick: (RowItemI?: RowItemI) => void;
  disabled?: (RowItemI?: RowItemI) => boolean;
  confimation?: (RowItemI?: RowItemI) => {
    title: string;
    description: string;
  };
}
type NestedKeyOf<ObjectType> = {
  [Key in keyof ObjectType & (string | number)]: NonNullable<
    ObjectType[Key]
  > extends Array<any>
    ? `${Key}`
    : NonNullable<ObjectType[Key]> extends object
      ? `${Key}` | `${Key}.${NestedKeyOf<NonNullable<ObjectType[Key]>>}`
      : `${Key}`;
}[keyof ObjectType & (string | number)];

interface columnI<RowItemI> {
  key: NestedKeyOf<RowItemI>;
  head?: string;
  sortKey?: string;
  custom?: (row: RowItemI, index?: number) => any;
  width?: number;
  responsive?: "md"[] | "lg"[];
  notSortable?: boolean;
}

interface TableComponentI<RowItemI> {
  data?: ResponseI<any> | null;
  columns?: columnI<RowItemI>[];
  loading?: boolean;
  error?: any;
  actions?: ActionsI<RowItemI>[];
  params?: ParamsI;
  setParams?: Dispatch<SetStateAction<ParamsI>>;
  total?: number;
  rowSelection?: TableRowSelection<RowItemI>;
  emptyAction?: () => void;
}

function TableComponent<RowItemI>({
  data,
  columns,
  loading,
  actions,
  params,
  setParams,
  total,
  rowSelection,
  error,
  emptyAction,
}: TableComponentI<RowItemI>) {
  return (
    <Table
      tableLayout="auto"
      rowKey={"id"}
      style={{
        borderRadius: 8,
        border: "1px solid rgba(200, 200, 200, 0.3)",
      }}
      scroll={{ x: "60%" }}
      sticky={true}
      showSorterTooltip
      locale={{
        emptyText: error ? (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Empty
              style={{
                padding: 15,
                paddingBottom: 30,
                maxWidth: "430px",
              }}
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description={<div>{error?.response?.status}</div>}
            />
          </div>
        ) : (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <Empty
              style={{ marginBottom: 16 }}
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description={"Não encontramos nenhum registro."}
            />
            {emptyAction && (
              <Button
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onClick={emptyAction}
                icon={<PlusIcon height={20} />}
                shape="round"
                type="primary"
              >
                Cadastrar
              </Button>
            )}
          </div>
        ),
      }}
      loading={
        loading
          ? {
              indicator: (
                <Spin
                  size="large"
                  indicator={<LoadingOutlined size={40} spin />}
                />
              ),
            }
          : false
      }
      rowSelection={
        rowSelection
          ? {
              type: rowSelection ? "checkbox" : undefined,
              ...rowSelection,
            }
          : undefined
      }
      columns={
        actions
          ? [
              ...(columns?.map((c: any, index: number) =>
                c.custom
                  ? {
                      title: c.head ?? c.key,
                      key: c.key,
                      dataIndex: c?.key?.split("."),
                      render: (_value: any, row: RowItemI) => (
                        <div
                          style={{ color: "#919199", minWidth: c.width || 60 }}
                          data-testid={c.head ?? (c.key as string)}
                        >
                          {c.custom(row, index) || "-"}
                        </div>
                      ),
                      width: c.width,
                      ellipsis: {
                        showTitle: false,
                      },
                      responsive: c.responsive,
                      sorter: c.notSortable
                        ? undefined
                        : () =>
                            setParams &&
                            setParams((state: any) => ({
                              ...state,
                              sort_order:
                                params?.sort_order === "asc" ? "desc" : "asc",
                              sort_by: c.sortKey || c.key,
                              orderDirection:
                                params?.sort_order === "asc" ? "desc" : "asc",
                              orderBy: c.sortKey || c.key,
                            })),
                    }
                  : {
                      title: c.head ?? c.key,
                      key: c.key,
                      dataIndex: c?.key?.split("."),
                      render: (value: any) => (
                        <div
                          style={{ minWidth: c.width || 60 }}
                          data-testid={c.head ?? (c.key as string)}
                        >
                          <Typography.Text style={{ color: "#919199" }}>
                            {value || "-"}
                          </Typography.Text>
                        </div>
                      ),
                      ellipsis: {
                        showTitle: false,
                      },
                      responsive: c.responsive,
                      sorter: c.notSortable
                        ? undefined
                        : () => {
                            setParams &&
                              setParams((state: any) => ({
                                ...state,
                                sort_order:
                                  params?.sort_order === "asc" ? "desc" : "asc",
                                sort_by: c.sortKey || c.key,
                                orderDirection:
                                  params?.sort_order === "asc" ? "desc" : "asc",
                                orderBy: c.sortKey || c.key,
                              }));
                          },
                    }
              ) as any),
              {
                key: "actions",
                title: "Ações",
                render: (_value: any, row: any) => (
                  <div
                    style={{
                      minWidth: 80,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Dropdown
                      menu={{
                        items:
                          actions &&
                          actions.map(
                            (a) =>
                              ({
                                key: a.label,
                                label: a.label,
                                icon: a.icon,
                                onClick: a?.confimation
                                  ? () =>
                                      Modal.confirm({
                                        title:
                                          a?.confimation &&
                                          a?.confimation(row)?.title,
                                        content:
                                          a?.confimation &&
                                          a?.confimation(row)?.description,

                                        onOk: () => a.onClick(row),
                                      })
                                  : () => a.onClick(row),
                              }) as any
                          ),
                      }}
                      align={{ offset: [-6, 8] }}
                      arrow
                      placement="bottomLeft"
                    >
                      <Typography.Link color="green">
                        <EllipsisVerticalIcon style={{ width: 22 }} />
                      </Typography.Link>
                    </Dropdown>
                  </div>
                ),
                width: 80,
                fixed: "right",
              },
            ]
          : [
              ...(columns?.map((c: any) =>
                c.custom
                  ? {
                      title: c.head ?? c.key,
                      key: c.key,
                      dataIndex: c.key,
                      render: (_value: any, row: RowItemI) => (
                        <div
                          style={{ color: "#919199", minWidth: c.width || 60 }}
                        >
                          {c.custom(row)}
                        </div>
                      ),
                      width: c.width,
                      ellipsis: {
                        showTitle: false,
                      },
                      responsive: c.responsive,
                    }
                  : {
                      title: c.head ?? c.key,
                      key: c.key,
                      dataIndex: c.key,
                      render: (value: any) => (
                        <div style={{ minWidth: c.width || 60 }}>
                          <Typography.Text style={{ color: "#919199" }}>
                            {value}
                          </Typography.Text>
                        </div>
                      ),
                      ellipsis: {
                        showTitle: false,
                      },
                      responsive: c.responsive,
                    }
              ) as any),
            ]
      }
      dataSource={data ? (data.items as any) : []}
      pagination={{
        pageSize: params?.size || data?.page,
        showSizeChanger: true,
        total: data?.totalItems ?? total,
        current: params?.page || data?.page,
        style: { paddingRight: 16 },
        onShowSizeChange: (_current, size) =>
          setParams && setParams((state) => ({ ...state, size })),
        onChange(page) {
          setParams && setParams((state) => ({ ...state, page }));
          window.scroll({ top: 0, left: 0, behavior: "smooth" });
        },
        showTotal: (total, range) =>
          `${range[0]} à ${range[1]} de ${total} itens`,
      }}
    />
  );
}

export default TableComponent;
