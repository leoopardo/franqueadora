import { Col, Row, notification } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createFranchiseI } from "../../../../services/franchises/__interfaces/create_franchise.interface";
import { useCreateFranchise } from "../../../../services/franchises/createFranchise";
import { MutatePromoter } from "../components/mutate";

export const CreatePromoter = () => {
  const [body, setBody] = useState<createFranchiseI>({});
  const { mutate, isLoading, isSuccess, error } = useCreateFranchise(body);
  const navigate = useNavigate();

  useEffect(() => {
    if (isSuccess) {
      notification.success({ message: "Promotor cadastrado com sucesso!" });
      navigate(-1);
    }
    if (error) {
      notification.error({
        message: "Erro ao cadastrar promotor.",
        description: (error as any)?.response?.data?.message,
      });
    }
  }, [error, isSuccess]);
  return (
    <Row style={{ width: "100%" }} justify="center">
      <Col xs={{ span: 24 }} md={{ span: 24 }}>
        <MutatePromoter
          body={body}
          setBody={setBody}
          mutate={mutate}
          error={error}
          loading={isLoading}
          success={isSuccess}
        />
      </Col>
    </Row>
  );
};
