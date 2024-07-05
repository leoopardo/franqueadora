import {
  CreditCardIcon,
  DocumentTextIcon,
  PencilIcon,
  TicketIcon,
} from "@heroicons/react/24/outline";
import { Button, Col, Input, Row, Switch, Tooltip, Typography } from "antd";
import { motion } from "framer-motion";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { PageHeader } from "../../../../components/header/pageHeader";
import TableComponent from "../../../../components/table/tableComponent";
import useDebounce from "../../../../hooks/useDebounce";
import defaultTheme from "../../../../styles/default";
import { formatCNPJ } from "../../../../utils/regexFormat";
import {
  Franchise,
  FranchiseParams,
} from "../../../services/franchises/__interfaces/franchises.interface";
import { useListFranchises } from "../../../services/franchises/listFranchises";
import { useActivateFranchise } from "../../../services/franchises/activateFranchise.ts";
import { useInactivateFranchise } from "../../../services/franchises/inactivateFranchise";
import { useBreakpoints } from "@hooks/useBreakpoints.ts";

export const Franchises = () => {
  const [params, setParams] = useState<FranchiseParams>({ page: 1, size: 15 });
  const { data, isLoading } = useListFranchises(params);
  const { isSm } = useBreakpoints();
  const activate = useActivateFranchise();
  const inactivate = useInactivateFranchise();
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
      f: ["franchise_name", "cnpj", "ref_id", "username"],
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
          title="Franquias"
          subtitle="Visualize e gerencie todas as franquias cadastradas."
        />
      </Col>
      <Col xs={{ span: 24 }} md={{ span: 7 }}>
        <Input
          size="large"
          allowClear
          onChange={({ target }) => debounceSearch(target.value)}
          placeholder="Pesquisar franquia"
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
            Cadastrar franquia
          </Button>
        </Link>
      </Col>
      <Col span={24}>
        <TableComponent<Franchise>
          loading={isLoading}
          data={data}
          params={params}
          setParams={setParams}
          actions={[
            {
              label: "Editar",
              onClick: (row) => navigate(`edição/${row?.id}`, { state: row }),
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
                      {formatCNPJ(row?.cnpj)}
                    </Typography.Text>
                  </Col>
                </Row>
              ),
              width: 230,
            },
            { key: "username", head: "Usuário" },
            {
              key: "FranchiseAddress",
              head: "Cidade",
              custom: (row) => row?.FranchiseAddress?.city ?? "-",
            },
            {
              key: "FranchiseAddress",
              head: "Estado",
              custom: (row) => row?.FranchiseAddress?.state ?? "-",
              width: 80,
            },
            {
              key: "FranchisePOSModule",
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
                  {row?.FranchisePOSModule?.map((module) => {
                    switch (module?.POSModule?.name) {
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
