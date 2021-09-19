import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import { OFFICES } from "utils/constants";
import Map from "../Map";

jest.mock("hooks/useDrivers");
jest.mock("react-leaflet", () => {
  const { MapContainer } = jest.requireActual("react-leaflet");
  return {
    __esModule: true,
    MapContainer,
  };
});

import useDrivers from "hooks/useDrivers";

it("should show correct number of markers when setting the number of drivers", async () => {
  (useDrivers as jest.Mock).mockReturnValue({
    isSuccess: true,
    data: {
      drivers: [
        { driver_id: 1, location: { latitude: 1, longitude: 1 } },
        { driver_id: 2, location: { latitude: 2, longitude: 2 } },
        { driver_id: 3, location: { latitude: 3, longitude: 3 } },
        { driver_id: 4, location: { latitude: 4, longitude: 4 } },
        { driver_id: 5, location: { latitude: 5, longitude: 5 } },
        { driver_id: 6, location: { latitude: 6, longitude: 6 } },
        { driver_id: 7, location: { latitude: 7, longitude: 7 } },
      ],
    },
  });

  render(
    <Map
      Controls={({ setNumDrivers }) => {
        return (
          <input
            type="range"
            onChange={(e) => setNumDrivers(parseInt(e.target.value))}
            data-testid="slider"
          />
        );
      }}
    >
      {({ drivers }) => (
        <>
          {drivers?.map((driver) => (
            <div key={driver.driver_id}>driver marker</div>
          ))}
        </>
      )}
    </Map>
  );

  fireEvent.change(screen.getByTestId("slider"), { target: { value: "7" } });
  await waitFor(() => {
    expect(screen.getAllByText("driver marker")).toHaveLength(7);
  });
});

it("should show correct marker when click on the buttons", () => {
  const MockOfficeMarker = jest
    .fn()
    .mockImplementation(() => <div>office marker</div>);
  const MockMyLocationMarker = jest
    .fn()
    .mockImplementation(() => <div>my location marker</div>);

  render(
    <Map
      Controls={({ officeClickHandler, myLocationClickHandler }) => {
        return (
          <>
            <button onClick={officeClickHandler}>office</button>
            <button onClick={myLocationClickHandler}>my location</button>
          </>
        );
      }}
    >
      {({ iconType, position }) => (
        <>
          {iconType === "OFFICE" ? (
            <MockOfficeMarker position={position} />
          ) : (
            <MockMyLocationMarker position={position} />
          )}
        </>
      )}
    </Map>
  );

  expect(screen.getByText("office")).toBeInTheDocument();
  expect(MockOfficeMarker).toHaveBeenLastCalledWith(
    expect.objectContaining({
      position: OFFICES["LONDON"],
    }),
    {}
  );

  fireEvent.click(screen.getByText("office"));
  expect(screen.getByText("office")).toBeInTheDocument();
  expect(MockOfficeMarker).toHaveBeenLastCalledWith(
    expect.objectContaining({
      position: OFFICES["SINGAPORE"],
    }),
    {}
  );

  fireEvent.click(screen.getByText("my location"));
  expect(screen.getByText("my location marker")).toBeInTheDocument();
  expect(MockMyLocationMarker).toHaveBeenCalled();

  fireEvent.click(screen.getByText("office"));
  expect(screen.getByText("office")).toBeInTheDocument();
  expect(MockOfficeMarker).toHaveBeenLastCalledWith(
    expect.objectContaining({
      position: OFFICES["LONDON"],
    }),
    {}
  );
});
