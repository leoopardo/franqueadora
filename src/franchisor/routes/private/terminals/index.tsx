import { Services } from "@franchisor/services/index.ts";
import {
  Bars3BottomLeftIcon,
  PencilIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { useBreakpoints } from "@hooks/useBreakpoints.ts";
import { Button, Col, Input, Row, Switch, Typography } from "antd";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { PageHeader } from "../../../../components/header/pageHeader";
import TableComponent from "../../../../components/table/tableComponent";
import useDebounce from "../../../../hooks/useDebounce";
import { formatCNPJ, formatCpfCnpj } from "../../../../utils/regexFormat";
import {
  Terminal,
  terminalParams,
} from "../../../services/terminals/__interfaces/terminals.interface.ts";
import { Totalizer } from "./components/Totalizer.tsx";
import { SearchOutlined } from "@ant-design/icons";

export const Terminals = () => {
  const [params, setParams] = useState<terminalParams>({ page: 1, size: 15 });
  const { list, disable, enable, totals, Delete } = Services.terminal;
  const { data, isLoading } = list(params);
  const deleteTerminal = Delete();
  const activate = enable();
  const inactivate = disable();
  const total = totals({
    page: 1,
    size: 50,
    f: params.f,
    s: params.s,
  });
  const [selectedRows, setSelectedRows] = useState<Terminal[]>([]);
  const { isSm } = useBreakpoints();
  const navigate = useNavigate();

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
      <Col xs={{ span: 24 }} md={{ span: 10 }}>
        <PageHeader
          title="Terminais"
          subtitle="Visualize e gerencie todas os terminais cadastrados."
        />
      </Col>
      <Col xs={{ span: 24 }} md={{ span: 6 }}>
        <Input
          size="large"
          allowClear
          onChange={({ target }) => debounceSearch(target.value)}
          placeholder="Pesquisar terminal"
          style={{ borderRadius: 32 }}
          suffix={<SearchOutlined style={{ width: 16 }} />}
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
      <Col xs={{ span: 24 }} md={{ span: 5 }}>
        <Link to={"cadastro"}>
          <Button
            style={{ width: "100%" }}
            size="large"
            type="primary"
            shape="round"
          >
            Cadastrar terminal
          </Button>
        </Link>
      </Col>
      <Col span={24}>
        <Totalizer
          content={total?.data?.content}
          setParams={setParams}
          params={params}
          loading={total.isLoading}
        />
      </Col>
      {selectedRows.length >= 1 && (
        <Col
          span={24}
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
          hidden
        >
          <Typography>
            {selectedRows.length} item{selectedRows.length >= 2 && "s"}{" "}
            selecionado{selectedRows.length >= 2 && "s"}
          </Typography>
          <Button
            size="large"
            shape="round"
            icon={<PencilSquareIcon style={{ width: 16 }} />}
            style={{ display: "flex", alignItems: "center" }}
          >
            Editar em lote
          </Button>
        </Col>
      )}
      <Col span={24}>
        <TableComponent<Terminal>
          rowSelection={{ onChange: (_rowKeys, rows) => setSelectedRows(rows) }}
          loading={isLoading}
          data={data}
          params={params}
          setParams={setParams}
          actions={[
            {
              label: "Editar",
              onClick: (row) => navigate(`edição/${row?.id}`),
              icon: <PencilIcon style={{ width: 16 }} />,
            },
            {
              label: "Excluir",
              onClick: (row) => deleteTerminal.mutate({ id: `${row?.id}` }),
              confimation(RowItemI) {
                return {
                  title: "Excluir terminal.",
                  description: `Deseja realmente excluir o terminal ${RowItemI?.serial_number}?`,
                };
              },
              icon: <TrashIcon style={{ width: 16 }} />,
            },
          ]}
          columns={[
            {
              key: "active",
              head: "Status",
              custom: (row) => (
                <Switch
                  checked={row.active}
                  loading={inactivate.isLoading || activate.isLoading}
                  onChange={(checked) => {
                    !checked
                      ? inactivate.mutate({
                          body: { active: checked },
                          id: row.id ?? "",
                        })
                      : activate.mutate({
                          body: { active: checked },
                          id: row.id ?? "",
                        });
                  }}
                />
              ),
            },
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
