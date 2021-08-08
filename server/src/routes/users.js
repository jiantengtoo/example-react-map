const axios = require('axios');
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {

  axios
    .get(`https://qa-interview-test.splytech.dev/api/drivers?${new URLSearchParams(req.query)}`)
    .then((response) => {
      // console.log(response.data)
      res.json(response.data)
    })
    .catch(err => res.send(err));

});

module.exports = router;
