var express = require('express');
var router = express.Router();
const axios = require('axios');

router.get('/', function(req, res, next) {
    axios.get('https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=gym&inputtype=textquery&fields=geometry,photos,formatted_address,name,opening_hours,rating&locationbias=circle:2000@47.6918452,-122.2226413&key=AIzaSyAAV2O4AUfzi0o0urWkYzgld7WYr6fOfFI')
        .then(response => {
            console.log("here loser", response.data.candidates)
            res.send("hey stinker")
        })
        .catch(err => {
            console.log(err);
            res.send("uhoh poopy!")
        });
});

module.exports = router;