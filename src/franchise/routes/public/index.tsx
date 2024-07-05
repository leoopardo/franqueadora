import { Route, Routes } from "react-router-dom";
import { Login } from "./Login";
import { CrossAuth } from "./CrossAuth";

export const PublicRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="cross-auth/:credentials" element={<CrossAuth />} />
    </Routes>
  );
};
