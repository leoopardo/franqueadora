import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/login/")({
  component: () => {
    const [state, setState] = useState<number>(0)
    return <button onClick={() => setState((prev) => ++prev)}>{state}</button>;
  },
});
