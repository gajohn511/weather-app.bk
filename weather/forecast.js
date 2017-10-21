/*constants*/
// const yargs = require("yargs");
const request = require("request");
const api = "b188f8811c2c2842114953ff024bb929";
/*const argsv = yargs
    .options({
        // k: {
        //     demand: true,
        //     alias: 'key',
        //     describe: 'API Key',
        //     string: true
        // },
        lng: {
            demand: true,
            alias: 'longitude',
            describe: 'longitude of location',
            string: true,
            number: false
        },
        lat: {
            demand: true,
            alias: 'latitude',
            describe: 'latitude of location',
            string: true
        }
    })
    .help()
    .argv;*/

// console.log(argsv);
// return;

// internal function()
var getWeather = (lng, lat, callback) => {
  // https://api.darksky.net/forecast/[key]/[latitude],[longitude]
  request(
    {
      url: `https://api.darksky.net/forecast/${api}/${lat},${lng}`,
      json: true
    },
    (error, response, body) => {
      debugger; // jshint ignore:line

      if (response.statusCode === 200) {
        var currentObj = body.currently;
        callback(undefined, {
          temperature: currentObj.temperature,
          apparentTemparature: currentObj.apparentTemperature,
          status: `${response.statusCode} (${response.statusMessage})`
        });
      } else {
        callback(
          `Status Code: ${response.statusCode}, ERROR: ${response.statusMessage}`,
          undefined
        );
      }
    }
  );
};

/*if (argsv.lng.length &&
    argsv.lat.length) {
    call(api, argsv.lng, argsv.lat, (errmsg, resp) => {
        if (errmsg) {
            console.log(errmsg);
        } else {
            console.log(JSON.stringify(resp, undefined, 3));
        }
    });
} else {
    console.log(`Exit(0)`);
    return 0;
}*/

module.exports = getWeather;
