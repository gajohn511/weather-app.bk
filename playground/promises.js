
// local variables
const request = require('request');


// functions ()

var geocodeAddress = (address) => {
    var encodedAddress = encodeURIComponent(address);
    return new Promise((resolve, reject) => {
        request({
            url: `http://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`,
            json: true
        }, (error, response, body) => {
            debugger; // jshint ignore:line

            if (response.statusCode === 200 &&
                body.results.length) {
                debugger; // jshint ignore:line
                var result = body.results[0];
                var location = result.geometry.location;

                resolve({
                    status: `${response.statusCode} (${body.status})`,
                    address: `${result.formatted_address}`,
                    lat: `${location.lat}`,
                    lng: `${location.lng}`
                });
            } else {
                var ret = error ? JSON.stringify(error, undefined, 3) : body.status;
                reject(ret);
            }
        });
    });
};

geocodeAddress('000000000').then((location) => {
    console.log(JSON.stringify(location, undefined, 3));
}, (errorMessage) => {
    console.log(errorMessage);
});

