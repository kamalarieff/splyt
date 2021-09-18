import React from "react";
import { renderHook } from "@testing-library/react-hooks";
import { QueryClient, QueryClientProvider } from "react-query";

import { getDrivers } from "apis/drivers";
import useDrivers from "../";

jest.mock("apis/drivers");

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  return ({ children }: { children: React.ReactElement }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe("sad path", () => {
  it("should return error even when the api failed to fetch", async () => {
    (getDrivers as jest.Mock).mockImplementation(() =>
      Promise.resolve({
        ok: false,
        json: () =>
          Promise.resolve({
            errors: [{ msg: "invalid" }],
          }),
      })
    );

    const { result, waitFor } = renderHook(
      () => useDrivers({ position: { lat: 1, lng: 123 }, numDrivers: 1 }),
      { wrapper: createWrapper() }
    );

    await waitFor(() => !result.current.isLoading);

    expect(result.current.isError).toBe(true);
    expect(result.current.error).toStrictEqual(Error("invalid"));
  });
});

describe("happy path", () => {
  it("getDrivers should have been called", async () => {
    (getDrivers as jest.Mock).mockImplementation(() =>
      Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve({
            pickup_eta: 1,
            drivers: [
              { driver_id: 1, location: { latitude: 1, longitude: 1 } },
            ],
          }),
      })
    );

    const { result, waitFor } = renderHook(
      () => useDrivers({ position: { lat: 1, lng: 123 }, numDrivers: 1 }),
      { wrapper: createWrapper() }
    );

    await waitFor(() => result.current.isSuccess);

    expect(getDrivers).toHaveBeenCalledWith(
      expect.objectContaining({ numDrivers: 1 })
    );
  });
});
