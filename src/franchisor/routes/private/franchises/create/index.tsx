import { ProCard } from "@ant-design/pro-components";
import { MutateFranchise } from "../components/mutate";
import { Col, Row, message, notification } from "antd";
import { PageHeader } from "../../../../../components/header/pageHeader";
import { useEffect, useState } from "react";
import { useCreateFranchise } from "../../../../services/franchises/createFranchise";
import { createFranchiseI } from "../../../../services/franchises/__interfaces/create_franchise.interface";
import { useNavigate } from "react-router-dom";

export const CreateFranchise = () => {
  const [body, setBody] = useState<createFranchiseI>({});
  const { mutate, isLoading, isSuccess, error } = useCreateFranchise(body);
  const navigate = useNavigate();

  useEffect(() => {
    if (isSuccess) {
      notification.success({ message: "Franquia cadastrada com sucesso!" });
      navigate(-1);
    }
    if (error) {
      notification.error({
        message: "Erro ao cadastrar franquia.",
        description: (error as any)?.response?.data?.message,
      });
    }
  }, [error, isSuccess]);
  return (
    <Row style={{ width: "100%" }} justify="center">
      <Col xs={{ span: 24 }} md={{ span: 16 }}>
        <PageHeader
          title="Cadastro de franquia"
          subtitle="Preencha todos os campos para adicionar uma nova franquia"
        />
      </Col>
      <Col xs={{ span: 24 }} md={{ span: 16 }}>
        <ProCard bordered>
          <MutateFranchise
            body={body}
            setBody={setBody}
            mutate={mutate}
            error={error}
            loading={isLoading}
            success={isSuccess}
          />
        </ProCard>
      </Col>
    </Row>
  );
};
