import express from "express";
import router from "../";
import supertest from "supertest";

const app = express();
app.use("/", router);
const request = supertest(app);

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
});
