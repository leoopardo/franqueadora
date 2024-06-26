import { Route, Routes } from "react-router-dom";
import { Landing } from "./landing";

export const LandingRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
    </Routes>
  );
};
