import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App from "./App.tsx";
import "./index.css";
import { store } from "./app/store";
import axios from "axios";

axios.defaults.withCredentials = true;

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
