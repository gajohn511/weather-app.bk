// constants
const yargs = require("yargs");
const geocode = require("./geocode/geocode.js");
const weather = require("./weather/forecast.js");
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

//jshint ignore:line
// var yo = "somethig";

if (argsv.a.length) {
  console.log("Loading info...");

  setTimeout(() => {
    geocode.fetchAddress(encodeURIComponent(argsv.a), (errorMsg, resp) => {
      if (errorMsg) {
        console.log(errorMsg);
      } else {
        const geoObj = resp;
        //jshint ignore:line
        // fetch forecast data
        weather(resp.lng, resp.lat, (werror, wresp) => {
          console.log(
            `The geo-request status: ${geoObj.status}, weather-request status: ${wresp.status}`
          );
          console.log("---");
          console.log(`Address: ${resp.address}`);
          console.log(`Temperature: ${wresp.temperature}`);
          console.log(`apparentTemparature: ${wresp.apparentTemparature}`);
          console.log("---\n");
        });

        // final stage
        // console.log(`The request status: ${resp.status}.`);
        // console.log('---');
        // console.log(`Address: ${resp.address}`);
        // console.log(`lat: ${resp.lat}`);
        // console.log(`lng: ${resp.lng}`);
        // console.log('---\n');
      }
    });
  }, 1000);

  //jshint ignore:line
} else {
  console.log(`Exit(${argsv.a.length})`);
  // return 0;
}
