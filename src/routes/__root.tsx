import {
    createRootRoute,
    Outlet,
    useNavigate
} from "@tanstack/react-router";
import { useEffect } from "react";
import secureLocalStorage from "react-secure-storage";
import "./globalStyles.css";

export const Route = createRootRoute({
  component: () => {
    const navigate = useNavigate();
    useEffect(() => {
      if (!secureLocalStorage.getItem("token")) {
        navigate({ to: "/login" });
      }
    }, []);

    return (
      <>
        <Outlet />
      </>
    );
  },
});
