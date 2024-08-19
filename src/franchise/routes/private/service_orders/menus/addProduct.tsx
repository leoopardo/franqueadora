import { ProForm, ProFormRadio, ProFormText } from "@ant-design/pro-components";
import { useBreakpoints } from "@hooks/useBreakpoints";
import defaultTheme from "@styles/default";
import { Card, Col, Row, Typography } from "antd";
import { motion } from "framer-motion";

export const AddProduct = () => {
  //   const { id } = useParams();
  const { isSm } = useBreakpoints();
  return (
    <Row justify="center" style={{ width: "100%" }}>
      <Col
        style={{
          width: "100%",
          height: isSm ? "15vh" : "20vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center",
        }}
        span={24}
      >
        <Row
          style={{ width: "100%", height: "100%" }}
          justify="center"
          align="middle"
        >
          <Col xs={{ span: 20 }} md={{ span: 10 }}>
            <Typography.Title level={isSm ? 5 : 3} style={{ margin: 0 }}>
              Gerencie os produtos ao cardápio
            </Typography.Title>
            <Typography.Text style={{ lineHeight: 0 }}>
              Adicione produtos ao cardápio criado.
            </Typography.Text>
          </Col>
        </Row>
        <div
          style={{
            backgroundColor: "rgb(207, 207, 207, 0.2)",
            height: 5,
            width: "100%",
          }}
        >
          <motion.div
            style={{
              width: 0,
              minHeight: 5,
              borderRadius: 25,
              backgroundColor: defaultTheme.primary,
            }}
            animate={{
              width: `${100}%`,
              transition: {
                bounce: 0.8,
                bounceDamping: 1,
                stiffness: 30,
                type: "spring",
              },
            }}
          />
        </div>
      </Col>
      <Card
        style={{
          maxHeight: isSm ? "65vh" : "70vh",
          minHeight: isSm ? "65vh" : "70vh",
          overflowY: "auto",
          overflowX: "hidden",
          minWidth: "100%",
        }}
      >
        <Row justify="center" style={{ width: "100%" }} gutter={[16, 8]}>
          <Col xs={{ span: 24 }} md={{ span: 14 }}>
            <Card style={{ minHeight: "400px" }}>
              <ProForm
                submitter={false}
                initialValues={{ type: "FOOD", register_type: "UNIQUE" }}
              >
                <ProForm.Group>
                  <ProFormRadio.Group
                    name="type"
                    label="Tipo do produto"
                    rules={[{ required: true }]}
                    options={[
                      { label: "Alimento", value: "FOOD" },
                      { label: "Bebida", value: "DRINK" },
                      { label: "Outros", value: "OTHER" },
                    ]}
                  />
                  <ProFormRadio.Group
                    name="register_type"
                    label="Tipo de cadastro"
                    rules={[{ required: true }]}
                    options={[
                      { label: "Produto único", value: "UNIQUE" },
                      { label: "Composto", value: "COMBO" },
                    ]}
                  />
                </ProForm.Group>
                <ProForm.Group>
                  <ProFormText
                    name="name"
                    label="Nome do produto"
                    rules={[{ required: true }]}
                    placeholder="Nome do produto"
                    fieldProps={{ size: "large" }}
                  />
                  <ProFormText
                    name="description"
                    label="Descrição do produto"
                    placeholder="Nome do produto"
                    fieldProps={{ size: "large" }}
                  />
                  <ProFormText
                    name="price"
                    label="Preço de venda"
                    placeholder="R$ 0,00"
                    fieldProps={{ size: "large" }}
                  />
                </ProForm.Group>
              </ProForm>
            </Card>
          </Col>
          <Col xs={{ span: 24 }} md={{ span: 8 }}>
            <Card style={{ minHeight: "400px" }}></Card>
          </Col>
        </Row>
      </Card>
    </Row>
  );
};
