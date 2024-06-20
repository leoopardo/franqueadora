import ReactDOM from "react-dom/client";
import { StyledThemeProvider } from "./contexts/themeContext";
import "./globalStyles.css";
import { App } from "./App";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <StyledThemeProvider>
    <App />
  </StyledThemeProvider>
);
