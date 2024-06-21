import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import { Dropdown, Table, Typography } from "antd";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import ResponseI from "../../franchisor/services/interfaces/response.interface";
import ParamsI from "../../franchisor/services/interfaces/queryParams.interface";

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
}

function TableComponent<RowItemI>({
  data,
  columns,
  loading,
  actions,
  params,
  setParams,
}: TableComponentI<RowItemI>) {
  const [cols, setCols] = useState<any>([]);

  useEffect(() => {
    if (actions && !cols.find((c: any) => c.key === "actions")) {
      setCols(() => [
        ...(columns?.map((c: any) =>
          c.custom
            ? {
                title: c.head ?? c.key,
                key: c.key,
                dataIndex: c.key,
                render: (_value: any, row: RowItemI) => (
                  <div style={{ color: "#71717A" }}>{c.custom(row)}</div>
                ),
                width: c.width,
              }
            : {
                title: c.head ?? c.key,
                key: c.key,
                dataIndex: c.key,
                width: c.width,
                render: (value) => (
                  <Typography.Text style={{ color: "#71717A" }}>
                    {value}
                  </Typography.Text>
                ),
              }
        ) as any),
        {
          key: "actions",
          title: "Ações",
          width: 80,
          render: (_value: any, row: any) => (
            <Dropdown
              menu={{
                items: actions.map(
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
          ),
        },
      ]);
    }
  }, [actions, columns]);

  return (
    <Table
      sticky
      tableLayout="auto"
      style={{ borderRadius: 8, border: "1px solid rgba(200, 200, 200, 0.3)" }}
      loading={loading}
      columns={cols}
      dataSource={data ? (data.items as any) : []}
      scroll={{ x: 900 }}
      pagination={{
        pageSize: params?.size,
        showSizeChanger: true,
        onShowSizeChange: (_current, size) =>
          setParams && setParams((state) => ({ ...state, size })),
      }}
    />
  );
}

export default TableComponent;
