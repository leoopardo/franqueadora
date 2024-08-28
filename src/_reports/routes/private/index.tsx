import { Button, Result } from "antd";
import { Route, Routes, useNavigate } from "react-router-dom";
import { ReportsPageProvider } from "../../contexts/ReportPageContext";
import { ReportsBaseLayout } from "./components/BaseLayout";
import { Events } from "./events";
import { EventById } from "./events/EventById";
import { Aports } from "./aports";

export const PrivateRoutes = () => {
  const navigate = useNavigate();
  return (
    <ReportsPageProvider>
      <Routes>
        <Route
          path="*"
          element={
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
          }
        />
        <Route path="/" element={<ReportsBaseLayout />}>
          <Route
            path="*"
            element={
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
            }
          />
          <Route path="/eventos" element={<Events />} />
          <Route path="evento/:event_id">
            <Route index element={<EventById/>} />
            <Route path="aportes" element={<Aports/>} />
            <Route path="caixas" element={<></>} />
            <Route
              path="*"
              element={
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
              }
            />
          </Route>
        </Route>
      </Routes>
    </ReportsPageProvider>
  );
};
