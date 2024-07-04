import { Col, Row } from "antd";
import { useCreateFranchise } from "../../../../services/franchises/createFranchise";
import { MutateFranchise } from "../components/mutate";

export const UpdateFranchise = () => {
  const { mutate, isLoading, isSuccess, error } = useCreateFranchise();

  return (
    <Row style={{ width: "100%" }} justify="center">
      <Col xs={{ span: 24 }} md={{ span: 24 }}>
        <MutateFranchise
          mutate={mutate}
          error={error}
          loading={isLoading}
          success={isSuccess}
        />
      </Col>
    </Row>
  );
};
