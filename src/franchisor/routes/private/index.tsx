import { Route, Routes } from "react-router-dom";
import { BaseLayout } from "./BaseLayout";
import { Button, Layout, Result } from "antd";
import { Franchises } from "./franchises";
import { CreateFranchise } from "./franchises/create";
import { Promoters } from "./promoters";
import { CreatePromoter } from "./promoters/create";
import { Terminals } from "./terminals";
import { Pending } from "./terminals/pending";
import { Clients } from "./clients";

export const PrivateRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<BaseLayout />}>
        <Route path="/franquias">
          <Route index element={<Franchises />} />
          <Route path="cadastro" element={<CreateFranchise />} />
        </Route>
        <Route path="/promotores">
          <Route index element={<Promoters />} />
          <Route path="cadastro" element={<CreatePromoter />} />
        </Route>
        <Route path="/clientes">
          <Route index element={<Clients />} />
        </Route>
        <Route path="/terminais">
          <Route index element={<Terminals />} />
          <Route path="pendentes" element={<Pending />} />
        </Route>
        <Route
          path="*"
          element={
            <Layout
              style={{
                width: "100%",
                height: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Result
                status="404"
                title="404"
                subTitle="Desculpa, essa página não existe."
                extra={<Button type="default">Voltar para o início</Button>}
              />
            </Layout>
          }
        />
      </Route>
    </Routes>
  );
};
