import { useCreatePromoter } from "@franchisor/services/promoters/createPromoter";
import { Col, Row, notification } from "antd";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MutatePromoter } from "../components/mutate";

export const CreatePromoter = () => {
  const { mutate, isLoading, isSuccess, error } = useCreatePromoter();
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
          mutate={mutate}
          error={error}
          loading={isLoading}
          success={isSuccess}
          title="Cadastro de promotor"
          subtitle="Preencha todos os campos para adicionar um novo promotor"
        />
      </Col>
    </Row>
  );
};
