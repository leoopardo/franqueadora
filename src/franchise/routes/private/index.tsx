import { Route, Routes } from "react-router-dom";

export const PrivateRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<p>Private</p>} />
    </Routes>
  );
};
