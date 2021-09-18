import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";

import { OFFICES } from "utils/constants";
import Map from "../Map";

jest.mock("hooks/useDrivers");
jest.mock("containers/Map/LocationMarker", () => {
  return {
    __esModule: true,
    default: jest.fn(() => <div />),
  };
});

jest.mock("react-leaflet", () => {
  const { MapContainer, TileLayer, Tooltip } =
    jest.requireActual("react-leaflet");
  return {
    __esModule: true,
    MapContainer,
    TileLayer,
    Tooltip,
    Marker: () => <div data-testid="marker"></div>,
  };
});

import useDrivers from "hooks/useDrivers";
import LocationMarker from "../LocationMarker";

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
    />
  );

  fireEvent.change(screen.getByTestId("slider"), { target: { value: "7" } });
  await waitFor(() => {
    expect(screen.getAllByTestId("marker")).toHaveLength(7);
  });
});

it("should call LocationMarker with correct params when click on the buttons", () => {
  (useDrivers as jest.Mock).mockReturnValue({
    isSuccess: true,
  });

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
    />
  );

  expect(LocationMarker).toHaveBeenLastCalledWith(
    expect.objectContaining({
      iconType: "OFFICE",
      position: OFFICES["LONDON"],
    }),
    {}
  );

  fireEvent.click(screen.getByText("office"));
  expect(LocationMarker).toHaveBeenLastCalledWith(
    expect.objectContaining({
      iconType: "OFFICE",
      position: OFFICES["SINGAPORE"],
    }),
    {}
  );

  fireEvent.click(screen.getByText("my location"));
  expect(LocationMarker).toHaveBeenLastCalledWith(
    expect.objectContaining({
      iconType: "MARKER",
    }),
    {}
  );

  fireEvent.click(screen.getByText("office"));
  expect(LocationMarker).toHaveBeenLastCalledWith(
    expect.objectContaining({
      iconType: "OFFICE",
      position: OFFICES["LONDON"],
    }),
    {}
  );
});
