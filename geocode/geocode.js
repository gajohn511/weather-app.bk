
/*constants*/
const request = require("request");


/*internal functions*/


/*exposed functions*/
var fetchAddress = (address, callback) => {
    request({
        url: `http://maps.googleapis.com/maps/api/geocode/json?address=${address}`,
        json: true
    }, (error, response, body) => {
        debugger; // jshint ignore:line

        if (response.statusCode === 200 &&
            body.results.length) {
            debugger; // jshint ignore:line
            var result = body.results[0];
            var location = result.geometry.location;

            callback(undefined, {
                status: `${response.statusCode} (${body.status})`,
                address: `${result.formatted_address}`,
                lat: `${location.lat}`,
                lng: `${location.lng}`
            });
        } else {
            var ret = error ? JSON.stringify(error, undefined, 3) : body.status;
            callback(ret, undefined);
        }
    });
};


// public statements
module.exports = {
    fetchAddress
};

