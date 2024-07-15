import { Route, Routes } from "react-router-dom";
import { Login } from "./Login";
import { Redirect } from "./redirect";

export const PublicRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="*" element={<Redirect/>}/>
    </Routes>
  );
};
