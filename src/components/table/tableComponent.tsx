import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import { Dropdown, Table, Typography } from "antd";
import { TableRowSelection } from "antd/es/table/interface";
import { Dispatch, SetStateAction } from "react";
import ParamsI from "../../franchisor/services/__interfaces/queryParams.interface";
import ResponseI from "../../franchisor/services/__interfaces/response.interface";

interface ActionsI<RowItemI> {
  label?: string;
  icon?: any;
  id?: string;
  onClick: (RowItemI?: RowItemI) => void;
  disabled?: (RowItemI?: RowItemI) => boolean;
}

interface columnI<RowItemI> {
  key: keyof RowItemI;
  head?: string;
  custom?: (row: RowItemI) => any;
  width?: number;
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
}: TableComponentI<RowItemI>) {
  return (
    <Table
      sticky={{ offsetHeader: 64 }}
      tableLayout="auto"
      rowKey={"id" || "ref_id"}
      style={{ borderRadius: 8, border: "1px solid rgba(200, 200, 200, 0.3)" }}
      loading={loading}
      rowSelection={
        rowSelection
          ? {
              type: rowSelection ? "checkbox" : undefined,

              ...rowSelection,
            }
          : undefined
      }
      columns={[
        ...(columns?.map((c: any) =>
          c.custom
            ? {
                title: c.head ?? c.key,
                key: c.key,
                dataIndex: c.key,
                render: (_value: any, row: RowItemI) => (
                  <div style={{ color: "#919199", minWidth: c.width || 60 }}>
                    {c.custom(row)}
                  </div>
                ),
                width: c.width,
                ellipsis: {
                  showTitle: false,
                },
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
              }
        ) as any),
        {
          key: "actions",
          title: "Ações",
          render: (_value: any, row: any) => (
            <div
              style={{
                minWidth: 48,
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
                          onClick: () => a.onClick(row),
                        }) as any
                    ),
                }}
                align={{ offset: [9, 5] }}
                arrow
                placement="bottomLeft"
              >
                <Typography.Link color="green">
                  <EllipsisVerticalIcon style={{ width: 22 }} />
                </Typography.Link>
              </Dropdown>
            </div>
          ),
          fixed: "right",
        },
      ]}
      dataSource={data ? (data.items as any) : []}
      scroll={{ x: 900 }}
      pagination={{
        pageSize: params?.size,
        showSizeChanger: true,
        total: data?.totalItems ?? total,
        current: (data?.page || 0) + 1,
        style: { paddingRight: 16 },
        onShowSizeChange: (_current, size) =>
          setParams && setParams((state) => ({ ...state, size })),
        onChange(page) {
          setParams && setParams((state) => ({ ...state, page }));
        },
        showTotal: (total, range) =>
          `${range[0]} à ${range[1]} de ${total} itens`,
      }}
    />
  );
}

export default TableComponent;
