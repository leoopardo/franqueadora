import { ArrowRightEndOnRectangleIcon } from "@heroicons/react/24/outline";
import {
  Button,
  Checkbox,
  Col,
  Form,
  Input,
  Layout,
  Row,
  Typography
} from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import envs from "../../../../config/envs";
import { useTheme } from "../../../../contexts/themeContext";
import { useBreakpoints } from "../../../../hooks/useBreakpoints";
import defaultTheme from "../../../../styles/default";
import { useLogin } from "../../../services/auth/useLogin";

export const Login = () => {
  const { isSm } = useBreakpoints();
  const navigate = useNavigate();
  const logo = "/logo.svg";
  const [credentials, setCredentials] = useState<{
    USERNAME: string;
    PASSWORD: string;
    remember: boolean;
  }>({ USERNAME: "", PASSWORD: "", remember: true });
  const { error, loading, reset, mutate, isSuccess } = useLogin({
    AuthFlow: "USER_PASSWORD_AUTH",
    AuthParameters: {
      USERNAME: credentials.USERNAME,
      PASSWORD: credentials.PASSWORD,
    },
    ClientId: envs.COGNITO.FRANCHISOR.CLIENT_ID,
    ClientMetadata: {},
  });
  const { theme } = useTheme();

  function handleCredentialsChange(e: any) {
    if (error) {
      reset();
    }
    setCredentials((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function currentSession() {}

  useEffect(() => {
    currentSession();
    if (isSuccess) {
      setTimeout(() => {
        navigate("/franquias");
      }, 1000);
    }
  }, [loading]);

  return (
    <Layout>
      <Row
        style={{
          height: "100vh",
          width: "100%",
          display: isSm ? undefined : "flex",
          justifyContent: isSm ? undefined : "center",
          alignItems: isSm ? undefined : "center",
        }}
      >
        {isSm && (
          <Col
            xs={{ span: 24 }}
            style={{
              height: "30%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div
              style={{
                width: "100%",
                height: "100%",
                backgroundColor: defaultTheme.primary,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                gap: 8,
                boxShadow:
                  "rgba(50, 50, 93, 0.25) 0px 30px 100px 12px inset, rgba(0, 0, 0, 0.3) 0px 18px 60px -10px inset",
              }}
            >
              <img src={logo} style={{ width: "60%" }} />
              <Typography.Title
                level={5}
                style={{ color: "#fff", width: "100%", textAlign: "center" }}
                data-testid="franchisor-title"
              >
                Backoffice Franqueadora
              </Typography.Title>
            </div>
          </Col>
        )}
        <Col
          xs={{ span: 24 }}
          md={{ span: 10 }}
          style={{
            height: isSm ? "fit-content" : "100%",
            marginTop: isSm ? "-20%" : undefined,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Layout
            style={{
              width: "100%",
              height: "100%",
              borderTopRightRadius: 32,
              borderBottomRightRadius: 32,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginRight: "-5%",
              zIndex: 99,
              backgroundColor: theme === "dark" ? "#18191B" : "#f1f1f1",
            }}
          >
            <Row
              gutter={[8, 4]}
              style={{
                height: "50%",
                maxHeight: "400px",
                padding: "0 15%",
                alignItems: "center",
                width: "100%",
                maxWidth: "850px",
                marginTop: isSm ? 32 : 0,
              }}
            >
              <Col span={24}>
                <Typography.Title
                  level={isSm ? 3 : 1}
                  style={{ fontWeight: 700, margin: 0, textAlign: "center" }}
                >
                  Bem-vindo
                </Typography.Title>
              </Col>
              <Col span={24} style={{ textAlign: "center", marginBottom: 16 }}>
                <Typography.Text strong style={{}}>
                  Informe seus dados de acesso.
                </Typography.Text>
              </Col>
              <Col span={24}>
                <Form
                  layout="vertical"
                  style={{ width: "100%" }}
                  initialValues={credentials}
                  onFinish={() => {
                    mutate();
                  }}
                >
                  <Form.Item label="Usuário" name="USERNAME">
                    <Input
                      data-testid="username"
                      name="USERNAME"
                      size="large"
                      placeholder="Informe seu usuário"
                      style={{ width: "100%" }}
                      onChange={handleCredentialsChange}
                      status={error ? "error" : undefined}
                    />
                  </Form.Item>
                  <Form.Item
                    label="Senha"
                    name="PASSWORD"
                    help={error ? "Usuário ou senha incorretos" : undefined}
                    status={error ? "warning" : undefined}
                  >
                    <Input.Password
                      data-testid="password"
                      name="PASSWORD"
                      size="large"
                      placeholder="Informe sua senha"
                      style={{ width: "100%" }}
                      onChange={handleCredentialsChange}
                      status={error ? "error" : undefined}
                    />
                  </Form.Item>
                  <Form.Item label="" valuePropName="checked" name="remember">
                    <Checkbox
                      data-testid="remember-checkbox"
                      name="remember"
                      value={credentials.remember}
                      onChange={handleCredentialsChange}
                    >
                      {" "}
                      Lembrar de mim
                    </Checkbox>
                  </Form.Item>
                  <Form.Item label="">
                    <Button
                      data-testid="login"
                      type="primary"
                      style={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                      size="large"
                      shape="round"
                      icon={<ArrowRightEndOnRectangleIcon width={24} />}
                      htmlType="submit"
                      loading={loading}
                    >
                      Acessar
                    </Button>
                  </Form.Item>
                </Form>
              </Col>
            </Row>
          </Layout>
        </Col>
        {!isSm && (
          <Col
            xs={{ span: 0 }}
            md={{ span: 14 }}
            style={{
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div
              style={{
                width: "100%",
                height: "100%",
                backgroundColor: defaultTheme.primary,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                gap: 36,
              }}
            >
              <img
                src={"/logo.svg"}
                alt="logo-pdv365"
                style={{ width: "50%" }}
              />
              <Typography.Title
                level={3}
                style={{ color: "#fff", display: "flex", gap: 8 }}
                data-testid="franchisor-title"
              >
                <Typography.Title level={3} style={{ color: "#fff" }} italic>
                  Backoffice
                </Typography.Title>{" "}
                Franqueadora
              </Typography.Title>
            </div>
          </Col>
        )}
      </Row>
    </Layout>
  );
};
