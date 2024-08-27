import { Services } from "../../../services";
import { ClientParams } from "../../../services/clients/__interfaces/clients.interface";
import { UserType } from "../../../services/users/__interfaces/users.interface";
import { PencilIcon } from "@heroicons/react/24/outline";
import { useBreakpoints } from "@hooks/useBreakpoints.ts";
import { Button, Col, Input, Row, Switch, Typography } from "antd";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { PageHeader } from "../../../../components/header/pageHeader";
import TableComponent from "../../../../components/table/tableComponent";
import useDebounce from "../../../../hooks/useDebounce";
import {
  formatCellPhoneBR,
  formatCpfCnpj,
} from "../../../../utils/regexFormat";
import { SearchOutlined } from "@ant-design/icons";

export const Users = () => {
  const [params, setParams] = useState<ClientParams>({ page: 1, size: 15 });
  const { list, enable, disable } = Services.users;
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
          title="Usuários"
          subtitle="Visualize e gerencie todos os usuários cadastrados na franqueadora."
        />
      </Col>
      <Col xs={{ span: 24 }} md={{ span: 7 }}>
        <Input
          size="large"
          allowClear
          onChange={({ target }) => debounceSearch(target.value)}
          placeholder="Pesquisar usuário"
          style={{ borderRadius: 32 }}
          suffix={<SearchOutlined style={{ width: 16 }} />}
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
            Cadastrar usuário
          </Button>
        </Link>
      </Col>
      <Col span={24}>
        <TableComponent<UserType>
          loading={isLoading}
          data={data}
          params={params}
          setParams={setParams}
          actions={[
            {
              label: "Editar",
              onClick: (row) => navigate(`/usuários/edição/${row?.id}`),
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
            {
              key: "user_id",
              head: "ID",
              responsive: ["lg"],
              custom(row) {
                return <Typography.Text>{row?.user_id}</Typography.Text>;
              },
            },
            {
              key: "name",
              head: "Nome",
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
              width: 250,
            },
            {
              key: "username",
              head: "Usuário",
              custom: (row) => row.username,
            },
            { key: "role", head: "Perfil", responsive: ["lg"] },
            {
              key: "phone",
              head: "Telefone",
              custom(row) {
                return formatCellPhoneBR(row?.phone ?? "");
              },
              responsive: ["lg"],
            },
          ]}
        />
      </Col>
    </Row>
  );
};
