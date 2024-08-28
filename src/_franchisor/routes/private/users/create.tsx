import { Services } from "../../../services";
import { Col, Row } from "antd";
import { MutateUser } from "./components/mutate";

export const CreateUser = () => {
  const { mutate, isLoading, isSuccess, error } = Services.users.create();

  return (
    <Row style={{ width: "100%" }} justify="center">
      <Col xs={{ span: 24 }} md={{ span: 24 }}>
        <MutateUser
          mutate={(data) => {
            mutate({
              ...data,
              document: data?.document?.replace(/\D/g, ""),
              phone: data?.phone?.replace(/\D/g, ""),
              confirm_password: undefined,
            });
          }}
          error={error}
          loading={isLoading}
          success={isSuccess}
          title="Cadastro de usuários"
          subtitle="Preencha todos os campos para adicionar um novo usuário"
        />
      </Col>
    </Row>
  );
};
