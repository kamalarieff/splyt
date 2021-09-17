import express from "express";
import router from "../";
import supertest from "supertest";

const app = express();
app.use("/", router);
const request = supertest(app);

jest.mock("node-fetch");

import fetch from "node-fetch";

describe("driver", () => {
  describe("validation", () => {
    it("missing latitude and longitude should return correct error", async () => {
      const response = await request.get("/");

      expect(response.status).toBe(400);
      expect(response.body).toStrictEqual({
        errors: [
          { location: "query", msg: "latitude is required", param: "latitude" },
          {
            location: "query",
            msg: "longitude is required",
            param: "longitude",
          },
        ],
      });
    });

    it("missing latitude should return correct error", async () => {
      const response = await request.get("/?longitude=123");

      expect(response.status).toBe(400);
      expect(response.body).toStrictEqual({
        errors: [
          { location: "query", msg: "latitude is required", param: "latitude" },
        ],
      });
    });

    it("missing longitude should return correct error", async () => {
      const response = await request.get("/?latitude=123");

      expect(response.status).toBe(400);
      expect(response.body).toStrictEqual({
        errors: [
          {
            location: "query",
            msg: "longitude is required",
            param: "longitude",
          },
        ],
      });
    });

    it("invalid count type should return correct error", async () => {
      const response = await request.get(
        "/?latitude=123&longitude=456&count=asd"
      );

      expect(response.status).toBe(400);
      expect(response.body).toStrictEqual({
        errors: [
          {
            location: "query",
            msg: "count must be a number",
            param: "count",
            value: "asd",
          },
        ],
      });
    });
  });

  describe("success", () => {
    beforeAll(() => {
      fetch.mockImplementation(() =>
        Promise.resolve({
          json: () =>
            Promise.resolve({
              pickup_eta: 1,
              drivers: [
                { driver_id: 1, location: { latitude: 1, longitude: 1 } },
                { driver_id: 2, location: { latitude: 2, longitude: 2 } },
              ],
            }),
        })
      );
    });

    beforeEach(() => {
      jest.clearAllMocks();
    });

    it("should call the underlying endpoint with correct params", async () => {
      const response = await request.get("/?latitude=123&longitude=456");

      expect(response.status).toBe(200);
      expect(fetch).toHaveBeenCalledWith(
        "https://qa-interview-test.splytech.dev/api/drivers?latitude=123&longitude=456"
      );
    });

    it("should call the underlying endpoint with correct params when count is passed", async () => {
      const response = await request.get(
        "/?latitude=123&longitude=456&count=1"
      );

      expect(response.status).toBe(200);
      expect(fetch).toHaveBeenCalledWith(
        "https://qa-interview-test.splytech.dev/api/drivers?count=1&latitude=123&longitude=456"
      );
    });
  });
});
