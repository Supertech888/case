import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  
    <BrowserRouter>
      <App />
    </BrowserRouter>
  
);
