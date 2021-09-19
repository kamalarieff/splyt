import express from "express";
import { URL } from "url";
import qs from "query-string";
import { query, validationResult } from "express-validator";
const fetch = require("node-fetch");

import { DRIVERS_API } from "../../../config";

const router = express.Router();

interface Drivers {
  pickup_eta: number;
  drivers: {
    driver_id: string;
    location: {
      bearing: number;
      latitude: number;
      longitude: number;
    };
  }[];
}

/**
 * @swagger
 *
 * /api/v1/drivers:
 *   get:
 *     summary: Get drivers coordinates
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: latitude
 *         description: Latitude
 *         in: query
 *         required: true
 *         schema:
 *           type: string
 *       - name: longitude
 *         description: Longitude
 *         in: query
 *         required: true
 *         schema:
 *           type: string
 *       - name: count
 *         description: Number of drivers
 *         in: query
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: json object of drivers
 *         content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                pickup_eta:
 *                  type: number
 *                  description: Expected time of arrival of driver
 *                  example: 24
 *                drivers:
 *                  type: array
 *                  items:
 *                    type: object
 *                    properties:
 *                      driver_id:
 *                        type: string
 *                        example: x-123
 *                      location:
 *                        type: object
 *                        properties:
 *                          latitude:
 *                            type: number
 *                            description: Latitude of car
 *                            example: 1.0123
 *                          longitude:
 *                            type: number
 *                            description: Longitude of car
 *                            example: 1.0123
 *                          bearing:
 *                            type: number
 *                            description: Direction of where car is heading
 *                            example: 123
 */
router.get(
  "/",
  query("latitude").exists().withMessage("latitude is required"),
  query("longitude").exists().withMessage("longitude is required"),
  query("count").optional().isNumeric().withMessage("count must be a number"),
  function (req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const url = new URL(DRIVERS_API);
    const queryParams = qs.stringify(
      {
        latitude: req.query?.latitude,
        longitude: req.query?.longitude,
        count: req.query?.count,
      },
      { skipNull: true }
    );
    url.search = queryParams;

    fetch(url.toString())
      .then((fetchRes: Response) => fetchRes.json())
      .then((drivers: Drivers) => res.json(drivers));
  }
);

export default router;
