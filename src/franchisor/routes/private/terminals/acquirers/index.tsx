import { Bars3BottomLeftIcon, PencilIcon, PencilSquareIcon } from "@heroicons/react/24/outline";
import { Button, Col, Input, Row, Switch, Typography } from "antd";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useBreakpoints } from "@hooks/useBreakpoints.ts";
import { Terminal, terminalParams } from "@franchisor/services/terminals/__interfaces/terminals.interface";
import { useListTerminals } from "@franchisor/services/terminals/listTerminals";
import { useActivateTerminal } from "@franchisor/services/terminals/activateTerminals";
import { useInactivateTerminal } from "@franchisor/services/terminals/inactivateTerminals";
import useDebounce from "@hooks/useDebounce";
import { PageHeader } from "@components/header/pageHeader";
import TableComponent from "@components/table/tableComponent";

export const Acquirers = () => {
  const [params, setParams] = useState<terminalParams>({ page: 1, size: 15 });
  const { data, isLoading } = useListTerminals(params);
  const activate = useActivateTerminal();
  const inactivate = useInactivateTerminal();
  const [selectedRows, setSelectedRows] = useState<Terminal[]>([]);
  const { isSm } = useBreakpoints();

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
            Cadastrar franquia
          </Button>
        </Link>
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
              onClick: (row) => console.log(row),
              icon: <PencilIcon style={{ width: 16 }} />,
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
            { key: "serial_number", head: "Número de serial", width: 80 },
          
            { key: "terminal_model", head: "Modelo do terminal", width: 140 },
          ]}
        />
      </Col>
    </Row>
  );
};
