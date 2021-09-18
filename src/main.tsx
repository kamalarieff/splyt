import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { Map } from "./components/Map";
import App from "./App";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Map />
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
