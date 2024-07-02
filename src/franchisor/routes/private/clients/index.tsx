import {
  ClientParams,
  ClientType,
} from "@franchisor/services/clients/__interfaces/clients.interface.ts";
import { useActivateClient } from "@franchisor/services/clients/activateClient";
import { useInactivateClient } from "@franchisor/services/clients/inactivateFranchise";
import { useListClients } from "@franchisor/services/clients/listClients.ts";
import {
  CreditCardIcon,
  DocumentTextIcon,
  PencilIcon,
  TicketIcon,
} from "@heroicons/react/24/outline";
import { useBreakpoints } from "@hooks/useBreakpoints.ts";
import { Button, Col, Input, Row, Switch, Tooltip, Typography } from "antd";
import { motion } from "framer-motion";
import { useState } from "react";
import { Link } from "react-router-dom";
import { PageHeader } from "../../../../components/header/pageHeader";
import TableComponent from "../../../../components/table/tableComponent";
import useDebounce from "../../../../hooks/useDebounce";
import defaultTheme from "../../../../styles/default";
import { formatCNPJ, formatCpfCnpj } from "../../../../utils/regexFormat";

export const Clients = () => {
  const [params, setParams] = useState<ClientParams>({ page: 1, size: 15 });
  const { data, isLoading } = useListClients(params);
  const { isSm } = useBreakpoints();
  const activate = useActivateClient();
  const inactivate = useInactivateClient();

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
      f: "ref_id,ClientPerson.name,ClientJuridic.company_name,ClientPerson.cpf,ClientJuridic.cnpj,ClientAddress.state,ClientAddress.city,Master.username,ClientPOSModule.POSModule.name,Franchise.franchise_name,Franchise.cnpj,Promoter.promoter_name,Promoter.PromoterPerson.cpf,Promoter.PromoterJuridic.cnpj".split(","),
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
          title="Clientes"
          subtitle="Visualize e gerencie todos os clientes cadastrados."
        />
      </Col>
      <Col xs={{ span: 24 }} md={{ span: 7 }}>
        <Input
          size="large"
          allowClear
          onChange={({ target }) => debounceSearch(target.value)}
          placeholder="Pesquisar cliente"
        />
      </Col>
      <Col xs={{ span: 24 }} md={{ span: 5 }}>
        <Link to={"cadastro"}>
          <Button
            style={{ width: "100%" }}
            size="large"
            type="primary"
            shape="round"
          >
            Cadastrar cliente
          </Button>
        </Link>
      </Col>
      <Col span={24}>
        <TableComponent<ClientType>
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
                          id: `${row.id}`,
                        })
                      : activate.mutate({
                          body: { active: checked },
                          id: `${row.id}`,
                        });
                  }}
                />
              ),
            },
            { key: "ref_id", head: "ID" },
            {
              key: "name",
              head: "Cliente",
              custom: (row) => (
                <Row gutter={[4, 4]}>
                  <Col span={24}>
                    <Typography.Text>{row?.name}</Typography.Text>
                  </Col>
                  <Col span={24}>
                    <Typography.Text copyable style={{ color: "#71717A" }}>
                      {formatCpfCnpj(row?.document ?? "")}
                    </Typography.Text>
                  </Col>
                </Row>
              ),
              width: 180,
            },
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
              head: "Franquia",
              custom: (row) => (
                <Row gutter={[4, 4]}>
                  <Col span={24}>
                    <Typography.Text>{row?.promoter_name}</Typography.Text>
                  </Col>
                  <Col span={24}>
                    <Typography.Text copyable style={{ color: "#71717A" }}>
                      {formatCpfCnpj(row?.promoter_document ?? "-")}
                    </Typography.Text>
                  </Col>
                </Row>
              ),
              width: 180,
            },
            { key: "username", head: "Usuário" },
            { key: "city", head: "Cidade" },
            { key: "state", head: "Estado" },
            {
              key: "modules",
              head: "Módulos POS",
              custom: (row) => (
                <div
                  style={{
                    display: "flex",
                    gap: 4,
                    alignItems: "center",
                    justifyContent: "start",
                  }}
                >
                  {row?.modules?.map((module) => {
                    switch (module) {
                      case "Ingressos":
                        return (
                          <Tooltip title="Ingressos">
                            <motion.div
                              whileHover={{ color: defaultTheme.primary }}
                            >
                              <TicketIcon style={{ width: 22 }} />
                            </motion.div>
                          </Tooltip>
                        );
                      case "Transação direta":
                        return (
                          <Tooltip title="Transação direta">
                            <motion.div
                              whileHover={{ color: defaultTheme.primary }}
                            >
                              <CreditCardIcon style={{ width: 22 }} />
                            </motion.div>
                          </Tooltip>
                        );
                      case "Ficha":
                        return (
                          <Tooltip title="Ficha">
                            <motion.div
                              whileHover={{ color: defaultTheme.primary }}
                            >
                              <DocumentTextIcon style={{ width: 22 }} />
                            </motion.div>
                          </Tooltip>
                        );
                      default:
                        break;
                    }
                  })}
                </div>
              ),
            },
          ]}
        />
      </Col>
    </Row>
  );
};
