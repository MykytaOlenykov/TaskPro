import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { CssBaseline } from "@mui/material";

import { store } from "store";
import { ThemeProvider } from "theme";

import { App } from "./App.tsx";
import { Notifier } from "components/Notifier.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter basename="/">
        <ThemeProvider>
          <CssBaseline />
          <App />
          <Notifier />
        </ThemeProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
