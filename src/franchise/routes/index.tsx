import { useState } from "react";
import { PrivateRoutes } from "./private";
import { PublicRoutes } from "./public";

export const FranchiseRoutes = () => {
  const [AuthToken] = useState(false);

  return AuthToken ? <PrivateRoutes /> : <PublicRoutes />;
};
