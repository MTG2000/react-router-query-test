import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { Wrapper } from "./utils/wrapper";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Wrapper>
      <App />
    </Wrapper>
  </React.StrictMode>
);
