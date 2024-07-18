import { CloseOutlined } from "@ant-design/icons";
import { PageHeader } from "@components/header/pageHeader";
import TableComponent from "@components/table/tableComponent";
import {
  PendingType,
  pendingTerminalParams,
} from "@franchisor/services/terminals/__interfaces/pending.interface";
import { useApproveTerminals } from "@franchisor/services/terminals/pending/approveTerminals";
import { useListPending } from "@franchisor/services/terminals/pending/listPending";
import { useReproveTerminals } from "@franchisor/services/terminals/pending/reproveTerminals";
import {
  Bars3BottomLeftIcon,
  CheckIcon,
  PencilIcon,
} from "@heroicons/react/24/outline";
import { useBreakpoints } from "@hooks/useBreakpoints";
import useDebounce from "@hooks/useDebounce";
import { formatCNPJ, formatCpfCnpj } from "@utils/regexFormat";
import { Button, Col, Input, Row, Typography } from "antd";
import { useState } from "react";

export const Pending = () => {
  const [params, setParams] = useState<pendingTerminalParams>({
    page: 1,
    size: 15,
  });
  const { data, isLoading } = useListPending(params);
  const [selectedRows, setSelectedRows] = useState<PendingType[]>([]);
  const { isSm } = useBreakpoints();
  const approveTerminals = useApproveTerminals();
  const reproveTerminals = useReproveTerminals();

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
      f: "ref_id,serial_number,Franchise.franchise_name,Franchise.cnpj,Promoter.promoter_name,Promoter.PromoterPerson.cpf,Promoter.PromoterJuridic.cnpj,Client.client_name,Client.ClientPerson.cpf,Client.ClientJuridic.cnpj,TerminalModel.model".split(
        ","
      ),
    }));
  }, 500);

  return (
    <Row
      style={{ width: "100%", padding: isSm ? 12 : 40 }}
      align="middle"
      gutter={[8, 16]}
    >
      <Col xs={{ span: 24 }} md={{ span: 15 }}>
        <PageHeader
          title="Terminais pendentes"
          subtitle="Visualize e gerencie todos os terminais pendentes de aprovação."
        />
      </Col>
      <Col xs={{ span: 24 }} md={{ span: 6 }}>
        <Input
          size="large"
          allowClear
          onChange={({ target }) => debounceSearch(target.value)}
          placeholder="Pesquisar terminal"
        />
      </Col>
      <Col xs={{ span: 24 }} md={{ span: 3 }}>
        <Button
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          size="large"
          shape="round"
          icon={<Bars3BottomLeftIcon height={22} />}
        >
          Filtros
        </Button>
      </Col>

      {selectedRows.length >= 1 && (
        <Row
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
          <Col span={4}>
            <Typography>
              {selectedRows.length} item{selectedRows.length >= 2 && "s"}{" "}
              selecionado{selectedRows.length >= 2 && "s"}
            </Typography>
          </Col>
          <Col span={9}>
            <Row style={{ width: "100%" }} gutter={8}>
              <Col span={12}>
                <Button
                  size="large"
                  shape="round"
                  type="primary"
                  danger
                  icon={<CloseOutlined style={{ height: 22 }} />}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "100%",
                  }}
                  onClick={() =>
                    selectedRows.length >= 1 &&
                    reproveTerminals.mutate(
                      selectedRows?.map((t) => t.id ?? "")
                    )
                  }
                >
                  Reprovar selecionados
                </Button>
              </Col>
              <Col span={12}>
                <Button
                  size="large"
                  shape="round"
                  type="primary"
                  icon={<CheckIcon style={{ height: 22 }} />}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "100%",
                  }}
                  loading={approveTerminals.isLoading}
                  onClick={() =>
                    selectedRows.length >= 1 &&
                    approveTerminals.mutate(
                      selectedRows?.map((t) => t.id ?? "")
                    )
                  }
                >
                  Aprovar selecionados
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
      )}
      <Col span={24}>
        <TableComponent<PendingType>
          rowSelection={{ onChange: (_rowKeys, rows) => setSelectedRows(rows) }}
          loading={isLoading}
          data={data}
          params={params}
          setParams={setParams}
          actions={[
            {
              label: "Editar",
              onClick: (row) => console.log(row),
              icon: <PencilIcon style={{ width: 16 }} />,
            },
            {
              label: "Aprovar",
              onClick: (row) => approveTerminals.mutate([row?.id ?? ""]),
              icon: <CheckIcon style={{ height: 16 }} />,
            },
            {
              label: "Reprovar",
              onClick: (row) => reproveTerminals.mutate([row?.id ?? ""]),
              icon: <CheckIcon style={{ height: 16 }} />,
            },
          ]}
          columns={[
            { key: "ref_id", head: "ID" },
            {
              key: "serial_number",
              head: "Número de serial",
              custom(row) {
                return (
                  <Typography.Text copyable>
                    {row.serial_number}
                  </Typography.Text>
                );
              },
              width: 80,
            },
            {
              key: "franchise_name",
              head: "Franquia",
              custom: (row) =>
                row.franchise_name ? (
                  <Row gutter={[4, 4]}>
                    <Col span={24}>
                      <Typography.Text>{row?.franchise_name}</Typography.Text>
                    </Col>
                    {row?.franchise_cnpj && (
                      <Col span={24}>
                        <Typography.Text copyable style={{ color: "#71717A" }}>
                          {formatCNPJ(row?.franchise_cnpj)}
                        </Typography.Text>
                      </Col>
                    )}
                  </Row>
                ) : (
                  "-"
                ),
              width: 180,
            },
            {
              key: "promoter_name",
              head: "Promotor",
              custom: (row) =>
                row?.promoter_name ? (
                  <Row gutter={[4, 4]}>
                    <Col span={24}>
                      <Typography.Text>{row?.promoter_name}</Typography.Text>
                    </Col>
                    {row?.promoter_document && (
                      <Col span={24}>
                        <Typography.Text copyable style={{ color: "#71717A" }}>
                          {formatCpfCnpj(row?.promoter_document)}
                        </Typography.Text>
                      </Col>
                    )}
                  </Row>
                ) : (
                  "-"
                ),
            },
            {
              key: "client_name",
              head: "Cliente",
              custom: (row) => (
                <Row gutter={[4, 4]}>
                  <Col span={24}>
                    <Typography.Text>{row?.client_name}</Typography.Text>
                  </Col>
                  <Col span={24}>
                    <Typography.Text
                      copyable={row?.client_document ? true : false}
                      style={{ color: "#71717A" }}
                    >
                      {formatCpfCnpj(row?.client_document || "")}
                    </Typography.Text>
                  </Col>
                </Row>
              ),
            },
            { key: "terminal_model", head: "Modelo do terminal", width: 140 },
          ]}
        />
      </Col>
    </Row>
  );
};
