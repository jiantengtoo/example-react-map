import axios from "axios";
import express from "express";

export const router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {

  axios
    .get(`https://qa-interview-test.splytech.dev/api/drivers`)
    .then((response) => {
      console.log(response.data)
      res.json(response.data)
    })
    .catch(err => res.send(err));

});

export default router;