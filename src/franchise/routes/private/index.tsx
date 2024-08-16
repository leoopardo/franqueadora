import { Button, Result } from "antd";
import { Route, Routes, useNavigate } from "react-router-dom";
import { BaseLayout } from "./BaseLayout";
import { Loading } from "./components/loading";
import { Events } from "./events";
import { CreateEvent } from "./events/create";
import { UpdateEvent } from "./events/update";
import { Promoters } from "./promoters";
import { CreatePromoter } from "./promoters/create";
import { UpdatePromoter } from "./promoters/update";
import { Products } from "./service_orders/products";
import { CreateProduct } from "./service_orders/products/create";
import { UpdateProduct } from "./service_orders/products/update";
import { Terminals } from "./terminals";
import { Clients } from "./clients";
import { CreateClient } from "./clients/create";
import { UpdateClient } from "./clients/update";

export const PrivateRoutes = () => {
  const navigate = useNavigate();
  return (
    <Routes>
      <Route path="/" element={<BaseLayout />}>
        <Route path="franquias" element={<>Franquias</>} />
        <Route path="eventos">
          <Route index element={<Events />} />
          <Route path="cadastro" element={<CreateEvent />} />
          <Route path="edição" element={<UpdateEvent />} />
        </Route>
        <Route path="terminais">
          <Route index element={<Terminals />} />
        </Route>
        <Route path="/fichas">
          <Route path="produtos">
            <Route index element={<Products />} />
            <Route path="cadastro" element={<CreateProduct />} />
            <Route path="edição" element={<UpdateProduct />} />
          </Route>
        </Route>
        <Route path="promotores">
          <Route index element={<Promoters />} />
          <Route path="cadastro" element={<CreatePromoter />} />
          <Route path="edição/:id" element={<UpdatePromoter />} />
        </Route>
        <Route path="clientes">
          <Route index element={<Clients />} />
          <Route path="cadastro" element={<CreateClient />} />
          <Route path="edição/:id" element={<UpdateClient />} />
        </Route>

        <Route
          path="*"
          element={
            <Result
              status="404"
              title="404"
              subTitle="Desculpa, essa página não existe."
              extra={
                <Button type="default" onClick={() => navigate(-1)}>
                  Voltar
                </Button>
              }
            />
          }
        />
      </Route>
      <Route path="cross-auth/:credentials" element={<Loading />} />
    </Routes>
  );
};
