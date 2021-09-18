import React from "react";
import ReactDOM from "react-dom";
import { QueryClient, QueryClientProvider } from "react-query";

import App from "./App";
import { Map } from "containers/Map";

import { Slider } from "components/Slider";
import { Header } from "components/Header";
import { Footer } from "components/Footer";

import "./index.css";

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
            <div className="flex flex-col space-y-8">
              <Map
                Controls={({
                  officeClickHandler,
                  myLocationClickHandler,
                  setNumDrivers,
                  numDrivers,
                }) => {
                  return (
                    <div className="flex flex-col space-y-4 w-1/2 m-auto">
                      <Slider value={numDrivers} onChange={setNumDrivers} />
                      <div className="flex justify-center space-x-4">
                        <button className="button" onClick={officeClickHandler}>
                          Switch offices
                        </button>
                        <button
                          className="button"
                          onClick={myLocationClickHandler}
                        >
                          My location
                        </button>
                      </div>
                    </div>
                  );
                }}
              />
            </div>
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
