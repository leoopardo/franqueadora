import { FooterToolbar, ProCard, StepsForm } from "@ant-design/pro-components";
import { createLazyFileRoute, useNavigate } from "@tanstack/react-router";
import { Col, Row, message } from "antd";
import { PageHeader } from "../../../../components/header/pageHeader";
import { useBreakpoints } from "../../../../hooks/useBreakpoints";
import { StepOne } from "./components/stepOne";
import { StepThree } from "./components/stepThree";
import { StepTwo } from "./components/stepTwo";
import { useState } from "react";
import { TokenModal } from "../../../../components/token";

export const Route = createLazyFileRoute("/_auth/franchises/create/")({
  component: CreateFranchise,
});

function CreateFranchise() {
  const { isMd } = useBreakpoints();
  const [isTokenOpen, setIsTokenOpen] = useState<boolean>(false);
  const [values, setValues] = useState<any>();
  const navigate = useNavigate()

  return (
    <Row gutter={[8, 8]} style={{ width: "100%" }} justify={"center"}>
      <Col md={{ span: 20 }} xxl={{ span: 16 }} xs={{ span: 24 }}>
        <ProCard bordered style={{ borderRadius: 22, padding: isMd ? 0 : 16 }}>
          <Row
            gutter={[8, 8]}
            style={{ width: "100%", marginBottom: 24 }}
            align="middle"
          >
            <Col
              xs={{ span: 24 }}
              md={{ span: 24 }}
              style={{
                display: "flex",
                justifyContent: "center",
                textAlign: "center",
                marginBottom: 16,
              }}
            >
              <PageHeader
                title="Cadastrar franquia"
                subtitle="Preencha todos os campos para adicionar uma nova franquia"
                color="default"
              />
            </Col>
            <Col>
              <StepsForm<{
                name: string;
              }>
                onFinish={async (value) => {
                  setIsTokenOpen(true);
                  setValues(value);
                }}
                formProps={{
                  validateMessages: {
                    required: "Este campo é obrigatório",
                  },
                }}
                submitter={{
                  render: (_, dom) => <FooterToolbar>{dom}</FooterToolbar>,
                }}
                onCurrentChange={() =>
                  window.scrollTo({
                    top: 0,
                    left: 0,
                    behavior: "smooth",
                  })
                }
              >
                <StepOne />
                <StepTwo />
                <StepThree />
              </StepsForm>
            </Col>
          </Row>
        </ProCard>
      </Col>

      <TokenModal
        onOk={(token) => {
          message.success("Franquia criada com sucesso");
          console.log(values, token);
          setIsTokenOpen(false);
          navigate({to: "/franchises"})
        }}
        open={isTokenOpen}
        setOpen={setIsTokenOpen}
      />
    </Row>
  );
}

export default CreateFranchise;
