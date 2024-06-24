import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { Button, Dropdown, Layout } from "antd";
import { Content, Header } from "antd/es/layout/layout";
import { Link } from "react-router-dom";

export const Landing = () => {
    document.title = "PDV365 - Portal" 

  return (
    <Layout
      style={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Header
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <img src="/logoDef.svg" style={{ height: 45, width: 150 }} />
        <Dropdown
          menu={{
            items: [
              {
                label: (
                  <Link to={`http://franqueadora.${window.location.host}`} target="_blank">
                    Franqueadora
                  </Link>
                ),
                key: "Franquadora",
              },
              {
                label: (
                  <Link to={`http://franquia.${window.location.host}`} target="_blank">
                    Franquia
                  </Link>
                ),
                key: "Franquia",
              },
              {
                label: (
                  <Link to={`http://promotor.${window.location.host}`} target="_blank">
                    Promotor
                  </Link>
                ),
                key: "Promotor",
              },{
                label: (
                  <Link to={`http://cliente.${window.location.host}`} target="_blank">
                    Cliente
                  </Link>
                ),
                key: "Cliente",
              },
            ],
          }}
        >
          <Button
            type="link"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: 6,
            }}
          >
            Acessar painel <ChevronDownIcon style={{ width: 18 }} />
          </Button>
        </Dropdown>
      </Header>
      <Content
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
        }}
      ></Content>
    </Layout>
  );
};
