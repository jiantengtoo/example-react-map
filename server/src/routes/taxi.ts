import express from "express";
import { query, validationResult } from "express-validator";
import instance from "../axios/instance";

export const router = express.Router();

/* GET taxis listing. */
router.get(
  '/',
  query('latitude').isFloat({min:-90,max:90}),
  query('longitude').isFloat({min:-180,max:180}),
  query('count').optional().isNumeric(),
  (req, res, next) => {

    const err = validationResult(req);

    const axiosInstance = instance;

    if (!err.isEmpty()) {
      res.status(400).json({ errors: err.array() });
    } else {
      axiosInstance
      .get(
        `https://qa-interview-test.splytech.dev/api/drivers`,
        {
          params: req.query
        }
      )
      .then((response) => {
        res.json(response.data)
      })
      .catch(err => res.send(err));
    }

});

export default router;