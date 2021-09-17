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

/* GET list of drivers. */
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
