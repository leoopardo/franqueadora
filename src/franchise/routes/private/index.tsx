import { Route, Routes } from "react-router-dom";
import { BaseLayout } from "./BaseLayout";
import { Button, Result } from "antd";
import { Events } from "./events";
import { Terminals } from "./terminals";

export const PrivateRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<BaseLayout />}>
        <Route path="franquias" element={<>Franquias</>} />
        <Route path="eventos" element={<Events />} />
        <Route path="terminais">
          <Route index element={<Terminals />} />
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
