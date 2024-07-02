import { ProCard } from "@ant-design/pro-components";
import { Col, Row, notification } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PageHeader } from "../../../../../components/header/pageHeader";
import { createFranchiseI } from "../../../../services/franchises/__interfaces/create_franchise.interface";
import { useCreateFranchise } from "../../../../services/franchises/createFranchise";
import { MutateFranchise } from "../components/mutate";

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
