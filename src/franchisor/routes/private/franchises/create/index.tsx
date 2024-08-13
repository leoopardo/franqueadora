import { Services } from "@franchisor/services";
import { Col, Row } from "antd";
import { MutateFranchise } from "../components/mutate";

export const CreateFranchise = () => {
  const { mutate, isLoading, isSuccess, error } = Services.franchise.create();

  return (
    <Row style={{ width: "100%" }} justify="center">
      <Col xs={{ span: 24 }} md={{ span: 24 }}>
        <MutateFranchise
          mutate={mutate}
          error={error}
          loading={isLoading}
          success={isSuccess}
          title="Cadastro de franquias"
          subtitle="Preencha todos os campos para adicionar uma nova franquia"
        />
      </Col>
    </Row>
  );
};
