import { Button, Result } from "antd";
import { Route, Routes } from "react-router-dom";
import { BaseLayout } from "./BaseLayout";
import { Loading } from "./components/loading";
import { Events } from "./events";
import { CreateEvent } from "./events/create";
import { UpdateEvent } from "./events/update";
import { Terminals } from "./terminals";

export const PrivateRoutes = () => {
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
      <Route path="cross-auth/:credentials" element={<Loading />} />
    </Routes>
  );
};
