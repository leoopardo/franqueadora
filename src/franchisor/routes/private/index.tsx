import { Route, Routes } from "react-router-dom";
import { BaseLayout } from "./BaseLayout";
import { Button, Result } from "antd";
import { Franchises } from "./franchises";
import { CreateFranchise } from "./franchises/create";

export const PrivateRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<BaseLayout />}>
        <Route path="/franquias">
          <Route index element={<Franchises />} />
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
