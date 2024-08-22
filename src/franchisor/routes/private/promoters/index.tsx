import { Services } from "@franchisor/services";
import {
  CreditCardIcon,
  DocumentTextIcon,
  PencilIcon,
  TicketIcon,
} from "@heroicons/react/24/outline";
import { useBreakpoints } from "@hooks/useBreakpoints";
import { Button, Col, Input, Row, Switch, Tooltip, Typography } from "antd";
import { motion } from "framer-motion";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { PageHeader } from "../../../../components/header/pageHeader";
import TableComponent from "../../../../components/table/tableComponent";
import useDebounce from "../../../../hooks/useDebounce";
import defaultTheme from "../../../../styles/default";
import { formatCNPJ, formatCpfCnpj } from "../../../../utils/regexFormat";
import {
  Promoter,
  PromotersParams,
} from "../../../services/promoters/__interfaces/promoters.interface";
import { SearchOutlined } from "@ant-design/icons";

export const Promoters = () => {
  const [params, setParams] = useState<PromotersParams>({ page: 1, size: 15 });
  const { list, enable, disable } = Services.promoter;
  const inactivate = disable();
  const activate = enable();
  const { data, isLoading } = list(params);
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
      f: `ref_id,PromoterPerson.name,PromoterJuridic.company_name,PromoterPerson.cpf,PromoterJuridic.cnpj,Master.username,PromoterAddress.city,PromoterAddress.state,PromoterPOSModule.POSModule.name,Franchise.franchise_name,Franchise.cnpj`.split(
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
          title="Promotores"
          subtitle="Visualize e gerencie todas os promotores cadastrados."
        />
      </Col>
      <Col xs={{ span: 24 }} md={{ span: 7 }}>
        <Input
          size="large"
          allowClear
          onChange={({ target }) => debounceSearch(target.value)}
          placeholder="Pesquisar promotor"
          style={{ borderRadius: 32 }}
          suffix={<SearchOutlined style={{ width: 16 }} />}
        />
      </Col>
      <Col xs={{ span: 24 }} md={{ span: 5 }}>
        <Link to={"cadastro"}>
          <Button
            style={{ width: "100%", boxShadow: "none" }}
            size="large"
            type="primary"
            shape="round"
          >
            Cadastrar promotor
          </Button>
        </Link>
      </Col>
      <Col span={24}>
        <TableComponent<Promoter>
          loading={isLoading}
          data={data}
          params={params}
          setParams={setParams}
          total={data?.totalItems}
          actions={[
            {
              label: "Editar",
              onClick: (row) => navigate(`/promotores/edição/${row?.id}`),
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
            { key: "ref_id", head: "ID", width: 80 },
            {
              key: "franchise_name",
              head: "Franquia",
              custom: (row) => (
                <Row gutter={[4, 4]}>
                  <Col span={24}>
                    <Typography.Text>{row.franchise_name}</Typography.Text>
                  </Col>
                  <Col span={24}>
                    <Typography.Text copyable style={{ color: "#71717A" }}>
                      {formatCNPJ(row.franchise_cnpj || "")}
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
                    <Typography.Text>{row.promoter_name}</Typography.Text>
                  </Col>
                  <Col span={24}>
                    <Typography.Text copyable style={{ color: "#71717A" }}>
                      {formatCpfCnpj(row.promoter_document || "")}
                    </Typography.Text>
                  </Col>
                </Row>
              ),
              width: 180,
            },
            { key: "username", head: "Usuário" },
            {
              key: "city",
              head: "Cidade",
            },
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
            {
              key: "client_manage",
              head: "Gerencia clientes",
              custom: (row) => (row.client_manage ? "Sim" : "Não"),
              width: 100,
            },
          ]}
        />
      </Col>
    </Row>
  );
};
