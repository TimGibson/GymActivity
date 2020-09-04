var express = require('express');
var router = express.Router();
const axios = require('axios');

router.post('/', function(req, res, next) {
  let lat = req.body.lat
  let lng = req.body.lng
  axios.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=1500&type=gym&keyword=gym&key=${process.env.MAPS_API_KEY}`)
      .then(response => {
          res.send(response.data)
      })
      .catch(err => {
          console.log(err);
          res.send(err)
      });
});

module.exports = router;