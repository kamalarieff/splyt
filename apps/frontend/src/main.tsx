import React from "react";
import ReactDOM from "react-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { TileLayer } from "react-leaflet";

import { LocationMarker, Map } from "containers/Map";

import { Slider } from "components/Slider";
import {
  DriverMarker,
  MyLocationMarker,
  OfficeMarker,
} from "components/Markers";

import "./index.css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      // set no cache so that we don't have that jumping effect when
      // changing to a fetched query
      // since it should mimic a realtime app, I think this is the correct
      // solution
      cacheTime: 0,
    },
  },
});

ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <header className="header">Splyt</header>
      <main className="main">
        <div className="min-h-full w-full md:w-1/2 flex justify-center items-center m-auto">
          <div className="flex flex-col space-y-8 w-full">
            <Map
              Controls={({
                officeClickHandler,
                myLocationClickHandler,
                setNumDrivers,
                numDrivers,
              }) => {
                return (
                  <div className="flex flex-col space-y-4 w-3/4 md:w-1/2 m-auto">
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
            >
              {({ drivers, position, setPosition, iconType }) => (
                <>
                  <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  {drivers?.map((driver) => (
                    <DriverMarker
                      key={driver.driver_id}
                      id={driver.driver_id}
                      position={{
                        lat: driver.location.latitude,
                        lng: driver.location.longitude,
                      }}
                    />
                  ))}
                  <LocationMarker onLocationFound={setPosition}>
                    {iconType === "OFFICE" ? (
                      <OfficeMarker position={position} />
                    ) : (
                      <MyLocationMarker position={position} />
                    )}
                  </LocationMarker>
                </>
              )}
            </Map>
          </div>
        </div>
      </main>
      <footer className="footer">Footer</footer>
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
