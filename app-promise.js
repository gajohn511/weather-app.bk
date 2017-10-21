// imports
const yargs = require("yargs");
const axios = require("axios");

// variables
const argsv = yargs
  .options({
    a: {
      demand: true,
      alias: "address",
      describe: "Address to fetch weather for",
      string: true
    }
  })
  .help()
  .alias("h", "help").argv;

var encodedAddress = encodeURIComponent(argsv.address);
var geocodeURL = `http://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`;

// funcions ()

axios
  .get(geocodeURL)
  .then(response => {
    debugger; //jshint ignore:line

    if (response.data.status === "ZERO_RESULTS") {
      throw new Error("Zero Results");
    }

    var geometryObj = response.data.results[0].geometry;
    var faddress = response.data.results[0].formatted_address;
    var weatherURL = `https://api.darksky.net/forecast/b188f8811c2c2842114953ff024bb929/${geometryObj
      .location.lat},${geometryObj.location.lng}`;

    console.log(faddress);
    return axios.get(weatherURL);
  })
  .then(response => {
    var currentlyObj = response.data.currently;
    console.log(
      `It's currently ${currentlyObj.temperature}. Feels like ${currentlyObj.apparentTemperature}.`
    );
  })
  .catch(e => {
    if (e.code === "ENOTFOUND") {
      console.log("Unable to connect to API servers");
    } else {
      console.log(e.message);
    }
  });
