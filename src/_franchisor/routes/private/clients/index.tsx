import { Services } from "../../../services";
import {
  ClientParams,
  ClientType,
} from "../../../services/clients/__interfaces/clients.interface";
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
import { Link, useNavigate } from "react-router-dom";
import { PageHeader } from "../../../../components/header/pageHeader";
import TableComponent from "../../../../components/table/tableComponent";
import useDebounce from "../../../../hooks/useDebounce";
import defaultTheme from "../../../../styles/default";
import { formatCNPJ, formatCpfCnpj } from "../../../../utils/regexFormat";
import { SearchOutlined } from "@ant-design/icons";

export const Clients = () => {
  const [params, setParams] = useState<ClientParams>({ page: 1, size: 15 });
  const { list, enable, disable } = Services.client;
  const { data, isLoading } = list(params);
  const { isSm } = useBreakpoints();
  const activate = enable();
  const inactivate = disable();
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
      f: "ref_id,ClientPerson.name,ClientJuridic.company_name,ClientPerson.cpf,ClientJuridic.cnpj,ClientAddress.state,ClientAddress.city,Master.username,ClientPOSModule.POSModule.name,Franchise.franchise_name,Franchise.cnpj,Promoter.promoter_name,Promoter.PromoterPerson.cpf,Promoter.PromoterJuridic.cnpj".split(
        ","
      ),
    }));
  }, 500);

  return (
    <Row
      style={{ width: "100%", padding: isSm ? 12 : "20px 40px 20px 40px" }}
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
          style={{borderRadius: 32}}
          suffix={<SearchOutlined style={{width: 16}} />}
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
              onClick: (row) => navigate(`/clientes/edição/${row?.id}`),
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
              width: 40,
            },
            { key: "ref_id", head: "ID", responsive: ["lg"] },
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
              responsive: ["lg"],
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
                      {formatCpfCnpj(row?.promoter_document ?? "-")}
                    </Typography.Text>
                  </Col>
                </Row>
              ),
              width: 180,
              responsive: ["lg"],
            },
            {
              key: "username",
              head: "Usuário",
              custom: (row) => row.username,
              width: 80,
            },
            { key: "city", head: "Cidade", responsive: ["lg"] },
            { key: "state", head: "Estado", responsive: ["lg"] },
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
              width: 40,
            },
          ]}
        />
      </Col>
    </Row>
  );
};
