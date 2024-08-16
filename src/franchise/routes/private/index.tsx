import { getPermission } from "@franchise/utils/getUserPermission";
import { Button, Result } from "antd";
import { Route, Routes, useNavigate } from "react-router-dom";
import { BaseLayout } from "./BaseLayout";
import { Clients } from "./clients";
import { CreateClient } from "./clients/create";
import { UpdateClient } from "./clients/update";
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
import { CreateTerminals } from "./terminals/create";
import { UpdateTerminals } from "./terminals/update";

export const PrivateRoutes = () => {
  const navigate = useNavigate();

  return (
    <Routes>
      <Route path="/" element={<BaseLayout />}>
        {getPermission("EVENTOS_CADASTRO", "view") && (
          <Route path="eventos">
            <Route index element={<Events />} />
            {getPermission("EVENTOS_CADASTRO", "create") && (
              <>
                <Route path="cadastro" element={<CreateEvent />} />
                <Route path="edição" element={<UpdateEvent />} />
              </>
            )}
          </Route>
        )}
        <Route path="terminais">
          <Route index element={<Terminals />} />
          {getPermission("TERMINAIS_GERENCIAMENTO", "create") && (
            <>
              <Route path="cadastro" element={<CreateTerminals />} />{" "}
              <Route path="edição/:id" element={<UpdateTerminals />} />
            </>
          )}
        </Route>
        <Route path="/fichas">
          <Route path="produtos">
            <Route index element={<Products />} />
            <Route path="cadastro" element={<CreateProduct />} />
            <Route path="edição" element={<UpdateProduct />} />
          </Route>
        </Route>
        {getPermission("PROMOTOR_CADASTRO", "view") && (
          <Route path="promotores">
            <Route index element={<Promoters />} />
            {getPermission("PROMOTOR_CADASTRO", "create") && (
              <>
                <Route path="cadastro" element={<CreatePromoter />} />
                <Route path="edição/:id" element={<UpdatePromoter />} />
              </>
            )}
          </Route>
        )}{" "}
        {getPermission("CLIENTE_CADASTRO", "view") && (
          <Route path="clientes">
            <Route index element={<Clients />} />
            {getPermission("CLIENTE_CADASTRO", "create") && (
              <>
                {" "}
                <Route path="cadastro" element={<CreateClient />} />
                <Route path="edição/:id" element={<UpdateClient />} />
              </>
            )}
          </Route>
        )}
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
