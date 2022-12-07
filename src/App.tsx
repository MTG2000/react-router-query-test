import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import { RootRouter } from "./router/rootRouter";

function App() {
  return (
    <div className="App">
      <RootRouter />
    </div>
  );
}

export default App;
