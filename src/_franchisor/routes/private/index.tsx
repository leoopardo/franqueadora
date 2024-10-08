import { Button, Layout, Result } from "antd";
import { Route, Routes, useNavigate } from "react-router-dom";
import { BaseLayout } from "./BaseLayout";
import { Clients } from "./clients";
import { CreateClient } from "./clients/create";
import { UpdateClient } from "./clients/update";
import { Franchises } from "./franchises";
import { CreateFranchise } from "./franchises/create";
import { UpdateFranchise } from "./franchises/update";
import { Promoters } from "./promoters";
import { CreatePromoter } from "./promoters/create";
import { UpdatePromoter } from "./promoters/update";
import { Terminals } from "./terminals";
import { CreateTerminals } from "./terminals/create";
import { Pending } from "./terminals/pending";
import { UpdateTerminals } from "./terminals/update";
import { Users } from "./users";
import { CreateUser } from "./users/create";
import { Me } from "./users/me";
import { Dashboard } from "./dashboard";

export const PrivateRoutes = () => {
  const navigate = useNavigate();
  return (
    <Routes>
      <Route path="/" element={<BaseLayout />}>
      <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/franquias">
          <Route index element={<Franchises />} />
          <Route path="cadastro" element={<CreateFranchise />} />
          <Route path="edição/:id" element={<UpdateFranchise />} />
        </Route>
        <Route path="/promotores">
          <Route index element={<Promoters />} />
          <Route path="cadastro" element={<CreatePromoter />} />
          <Route path="edição/:id" element={<UpdatePromoter />} />
        </Route>
        <Route path="/clientes">
          <Route index element={<Clients />} />
          <Route path="cadastro" element={<CreateClient />} />
          <Route path="edição/:id" element={<UpdateClient />} />
        </Route>
        <Route path="/terminais">
          <Route index element={<Terminals />} />
          <Route path="cadastro" element={<CreateTerminals />} />
          <Route path="pendentes" element={<Pending />} />
          <Route path="edição/:id" element={<UpdateTerminals />} />
        </Route>
        <Route path="usuários">
          <Route index element={<Users />} />
          <Route path="cadastro" element={<CreateUser />} />
        </Route>
        <Route path="conta" element={<Me />} />

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
                extra={
                  <Button type="default" onClick={() => navigate(-1)}>
                    Voltar para o início
                  </Button>
                }
              />
            </Layout>
          }
        />
      </Route>
    </Routes>
  );
};
