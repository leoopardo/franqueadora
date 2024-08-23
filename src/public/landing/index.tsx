import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { Button, Dropdown, Layout, Menu, Typography } from "antd";
import { Content, Header } from "antd/es/layout/layout";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import defaultTheme from "../../styles/default";
import { MenuProps } from "antd/lib";

type MenuItem = Required<MenuProps>["items"][number];

const items: MenuItem[] = [
  {
    label: "Fale com um consultor",
    key: "talk",
  },
  {
    label: "Seja um franqueado",
    key: "franchise",
  },
  {
    label: "Serviços",
    key: "services",
    children: [
      {
        type: "group",
        label: "Item 1",
        children: [
          { label: "Option 1", key: "setting:1" },
          { label: "Option 2", key: "setting:2" },
        ],
      },
      {
        type: "group",
        label: "Item 2",
        children: [
          { label: "Option 3", key: "setting:3" },
          { label: "Option 4", key: "setting:4" },
        ],
      },
    ],
  },
];

export const Landing = () => {
  document.title = "PDV365 - Portal";
  const [current, setCurrent] = useState("mail");

  const onClick: MenuProps["onClick"] = (e) => {
    console.log("click ", e);
    setCurrent(e.key);
  };
  const videoRef = useRef(null);

  useEffect(() => {
    const videoElement = videoRef.current;

    if (videoElement) {
      (videoElement as any).playbackRate = 0.7;

      const handleEnded = () => {
        setTimeout(() => {
          (videoElement as any).play();
        }, 5000); // 1000ms delay before replay
      };

      (videoElement as any).addEventListener("ended", handleEnded);

      return () => {
        (videoElement as any).removeEventListener("ended", handleEnded);
      };
    }
  }, []);

  return (
    <Layout
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Header
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          position: "sticky",
          top: 0,
          left: 0,
          zIndex: 99,
        }}
      >
        <img src="/logoDef.svg" style={{ height: 45, width: 150 }} />
        <Menu
          onClick={onClick}
          selectedKeys={[current]}
          mode="horizontal"
          items={items}
          style={{ width: "41%", fontWeight: 700, fontSize: 20, height: 60 }}
        />
        <Dropdown
          menu={{
            items: [
              {
                label: (
                  <Link
                    to={`http://franqueadora.${window.location.host}`}
                    // target="_blank"
                    data-testid="franqueadora"
                  >
                    Franqueadora
                  </Link>
                ),
                key: "Franquadora",
              },
              {
                label: (
                  <Link
                    to={`http://franquia${import.meta.env.VITE_ENV === "local" ? "." : "-"}${window.location.host}`}
                    // target="_blank"
                    data-testid="franquia"
                  >
                    Franquia
                  </Link>
                ),
                key: "Franquia",
              },
              {
                label: (
                  <Link
                    to={`http://promotor${import.meta.env.VITE_ENV === "local" ? "." : "-"}${window.location.host}`}
                    // target="_blank"
                    data-testid="promotor"
                  >
                    Promotor
                  </Link>
                ),
                key: "Promotor",
              },
              {
                label: (
                  <Link
                    to={`http://cliente${import.meta.env.VITE_ENV === "local" ? "." : "-"}${window.location.host}`}
                    // target="_blank"
                    data-testid="cliente"
                  >
                    Cliente
                  </Link>
                ),
                key: "Cliente",
              },
            ],
          }}
        >
          <Button
            data-testid="acessar-painel"
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
          width: "99vw",
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            zIndex: 2,
            textAlign: "left",
            maxWidth: 550,
            position: "absolute",
            left: "8%",
            top: "32%",
          }}
        >
          <Typography.Title
            style={{ color: "#fff", fontWeight: "800", lineHeight: 1.3 }}
          >
            Gestão de{" "}
            <span style={{ backgroundColor: defaultTheme.primary }}>bares</span>
            ,{" "}
            <span style={{ backgroundColor: defaultTheme.primary }}>
              ingressos
            </span>{" "}
            e um sistema{" "}
            <span style={{ backgroundColor: defaultTheme.primary }}>
              financeiro
            </span>{" "}
            na palma da sua mão
          </Typography.Title>
        </div>
        <img
          src="img.jpeg"
          style={{
            position: "absolute",
            top: "65px",
            left: "0",
            height: "75vh",
            width: "100%",
            minWidth: "99vw",
            minHeight: "75vh",
            objectFit: "cover",
            zIndex: 0,
            filter: "brightness(0.6)",
          }}
        />
        {/* <source
            src={
              "banner2.mov"
              // import.meta.env.VITE_ENV === "local"
              //   ? "src/assets/banner2.mov"
              //   : "https://v.ftcdn.net/02/98/00/57/700_F_298005744_YHTLirkrwEbE1ee2v4z5O5kRUL7YVsmt_ST.mp4"
            }
            type="video/mp4"
          />
        </video> */}
        {/* <div style={{ minHeight: 1000, marginTop: 650 }}>ftyfytf</div> */}
      </Content>
    </Layout>
  );
};
