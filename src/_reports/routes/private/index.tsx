import { Button, Result } from "antd";
import { Route, Routes, useNavigate } from "react-router-dom";
import { ReportsPageProvider } from "../../contexts/ReportPageContext";
import { Aports } from "./aports";
import { CashRegister } from "./cashRegister";
import { CashRegisterDetails } from "./cashRegister/Details";
import { ReportsBaseLayout } from "./components/BaseLayout";
import { Courtesies } from "./courtesies";
import { Events } from "./events";
import { EventById } from "./events/EventById";

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
            <Route index element={<EventById />} />
            <Route path="aportes" element={<Aports />} />
            <Route path="caixas">
              <Route index element={<CashRegister />} />
              <Route path=":id" element={<CashRegisterDetails />} />
            </Route>

            <Route path="cortesias">
              <Route index element={<Courtesies />} />
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
