import { Route, Routes } from "react-router-dom";
import { BaseLayout } from "./BaseLayout";
import { Button, Result } from "antd";
import { Franchises } from "./franchises";
import { CreateFranchise } from "./franchises/create";
import { Promoters } from "./promoters";
import { CreatePromoter } from "./promoters/create";

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
