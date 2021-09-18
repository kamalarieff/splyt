import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { Map } from "./components/Map";
import App from "./App";
import { QueryClient, QueryClientProvider } from "react-query";
import { Header } from "components/Header";
import { Footer } from "components/Footer";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      // set no cache so that we don't have that jumping effect when
      // changing to a fetched query
      // since it should mimic a realtime app, I think this is the correct solution
      cacheTime: 0,
    },
  },
});

ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <main className="main">
        <div className="min-h-full grid grid-cols-5 gap-4">
          <div className="col-span-5">
            <Header>Splyt</Header>
          </div>
          <div className="col-span-5 md:col-span-3 md:col-start-2">
            <Map />
          </div>
          <div className="col-span-5 flex items-end">
            <Footer>Footer</Footer>
          </div>
        </div>
      </main>
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
