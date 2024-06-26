import { ProCard } from "@ant-design/pro-components";
import { MutateFranchise } from "../components/mutate";
import { Col, Row } from "antd";
import { PageHeader } from "../../../../../components/header/pageHeader";
import { useState } from "react";
import { useCreateFranchise } from "../../../../services/franchises/createFranchise";
import { createFranchiseI } from "../../../../services/franchises/interfaces/create_franchise.interface";

export const CreateFranchise = () => {
  const [body, setBody] = useState<createFranchiseI>({});
  const { mutate, isLoading, isSuccess, error } = useCreateFranchise(body);
  return (
    <Row style={{ width: "100%" }} justify="center">
      <Col xs={{span: 24}} md={{span: 16}}>
        <PageHeader
          title="Cadastro de franquia"
          subtitle="Preencha todos os campos para adicionar uma nova franquia"
        />
      </Col>
      <Col xs={{span: 24}} md={{span: 16}}>
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
