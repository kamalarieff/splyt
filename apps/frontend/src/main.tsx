import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { Layout } from "components/Layout";
import { Map } from "./components/Map";
import App from "./App";
import { QueryClient, QueryClientProvider } from "react-query";
import { Header } from "components/Header";
import { Footer } from "components/Footer";

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
      <Header>Splyt</Header>
      <Layout>
        <Map />
      </Layout>
      <Footer>Footer</Footer>
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
