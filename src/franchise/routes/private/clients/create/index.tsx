import { Services } from "@franchise/services";
import { Col, Row } from "antd";
import { MutateClient } from "../components/mutate";

export const CreateClient = () => {
  const { mutate, isLoading, isSuccess, error } = Services.client.create();

  return (
    <Row style={{ width: "100%" }} justify="center">
      <Col xs={{ span: 24 }} md={{ span: 24 }}>
        <MutateClient
          mutate={(data) => {
            mutate({
              ...data,
              physical: {
                ...data.physical,
                birthdate: `${new Date(data?.physical?.birthdate || "").toISOString()}`,
                phone: data?.physical?.phone?.replace(/\D/g, ""),
                cpf: data?.physical?.cpf?.replace(/\D/g, ""),
                rg: data?.physical?.rg?.replace(/\D/g, ""),
              },
              master: {
                ...data.master,
                phone: data?.master?.phone?.replace(/\D/g, ""),
                cpf: data?.master?.cpf?.replace(/\D/g, ""),
              },
              contacts: [],
              agreement: [],
            });
          }}
          error={error}
          loading={isLoading}
          success={isSuccess}
          title="Cadastro de cliente"
          subtitle="Preencha todos os campos para adicionar um novo cliente"
        />
      </Col>
    </Row>
  );
};
