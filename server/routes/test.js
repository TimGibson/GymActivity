var express = require('express');
var router = express.Router();
const axios = require('axios');

router.get('/', function(req, res, next) {
    axios.get(`https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=gym&inputtype=textquery&fields=geometry,photos,formatted_address,name,opening_hours,rating&locationbias=circle:2000@47.6918452,-122.2226413&key=${process.env.MAPS_API_KEY}`)
        .then(response => {
            console.log("here loser", response)
            res.send("hey stinker")
        })
        .catch(err => {
            console.log(err);
            res.send("uhoh poopy!")
        });
});

module.exports = router;