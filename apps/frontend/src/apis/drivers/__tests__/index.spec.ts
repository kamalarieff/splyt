import { getDrivers } from "..";

global.fetch = jest.fn();

it("should build the correct url to call the endpoint with", () => {
  getDrivers({ latitude: 1, longitude: 1, numDrivers: 1 });
  expect(fetch).toHaveBeenCalledWith(
    expect.stringContaining("?count=1&latitude=1&longitude=1")
  );
});
