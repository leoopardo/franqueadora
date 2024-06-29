import {
  PencilIcon
} from "@heroicons/react/24/outline";
import { Button, Col, Input, Row, Switch, Typography } from "antd";
import { useState } from "react";
import { Link } from "react-router-dom";
import { PageHeader } from "../../../../components/header/pageHeader";
import TableComponent from "../../../../components/table/tableComponent";
import useDebounce from "../../../../hooks/useDebounce";
import { formatCNPJ, formatCpfCnpj } from "../../../../utils/regexFormat";
import { useActivateFranchise } from "../../../services/franchises/activateFranchise.ts";
import { useInactivateFranchise } from "../../../services/franchises/inactivateFranchise";
import {
  Terminal,
  terminalParams,
} from "../../../services/terminals/__interfaces/terminals.interface.ts";
import { useListTerminals } from "../../../services/terminals/listTerminals.ts";

export const Terminals = () => {
  const [params, setParams] = useState<terminalParams>({ page: 1, size: 15 });
  const { data, isLoading } = useListTerminals(params);
  const activate = useActivateFranchise();
  const inactivate = useInactivateFranchise();

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
      f: ["franchise_name", "cnpj", "ref_id", "username"],
    }));
  }, 500);

  return (
    <Row style={{ width: "100%", padding: 40 }} align="middle" gutter={[8, 8]}>
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
          style={{ width: "100%", boxShadow: "none" }}
          size="large"
          shape="round"
        >
          Filtros
        </Button>
      </Col>
      <Col xs={{ span: 24 }} md={{ span: 5 }}>
        <Link to={"cadastro"}>
          <Button
            style={{ width: "100%", boxShadow: "none" }}
            size="large"
            type="primary"
            shape="round"
          >
            Cadastrar franquia
          </Button>
        </Link>
      </Col>
      <Col span={24}>
        <TableComponent<Terminal>
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
            { key: "serial_number", head: "Número de serial" },
            {
              key: "franchise_name",
              head: "Franquia",
              custom: (row) => (
                <Row gutter={[4, 4]}>
                  <Col span={24}>
                    <Typography.Text>{row?.franchise_name}</Typography.Text>
                  </Col>
                  <Col span={24}>
                    <Typography.Text copyable style={{ color: "#71717A" }}>
                      {formatCNPJ(row?.franchise_cnpj)}
                    </Typography.Text>
                  </Col>
                </Row>
              ),
              width: 180,
            },
            {
              key: "promoter_name",
              head: "Promotor",
              custom: (row) => (
                <Row gutter={[4, 4]}>
                  <Col span={24}>
                    <Typography.Text>{row?.promoter_name}</Typography.Text>
                  </Col>
                  <Col span={24}>
                    <Typography.Text copyable style={{ color: "#71717A" }}>
                      {formatCpfCnpj(row?.promoter_document || "")}
                    </Typography.Text>
                  </Col>
                </Row>
              ),
              width: 180,
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
              width: 180,
            },
            { key: "terminal_model", head: "Modelo do terminal", width: 100 },
          ]}
        />
      </Col>
    </Row>
  );
};
