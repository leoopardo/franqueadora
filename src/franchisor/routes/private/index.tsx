import { Route, Routes } from "react-router-dom";
import { Button, Result } from "antd";
import { BaseLayout } from "@franchise/routes/private/BaseLayout";
import { FranchiseRoutes } from "@franchise/routes";
import { CreateFranchise } from "./franchises/create";

export const PrivateRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<BaseLayout />}>
        <Route path="/franquias">
          <Route index element={<FranchiseRoutes />} />
          <Route path="cadastro" element={<CreateFranchise />} />
        </Route>
        <Route
          path="*"
          element={
            <Result
              status="404"
              title="404"
              subTitle="Desculpa, essa página não existe."
              extra={<Button type="default">Voltar para o início</Button>}
            />
          }
        />
      </Route>
    </Routes>
  );
};
