import { Route, Routes } from "react-router-dom";
import { BaseLayout } from "./BaseLayout";

export const PrivateRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<BaseLayout />}>
        <Route path="franquias" element={<>Franquias</>} />
      </Route>
    </Routes>
  );
};
