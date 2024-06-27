import { Route, Routes } from "react-router-dom";
import { Login } from "./Login";

export const PublicRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
    </Routes>
  );
};
