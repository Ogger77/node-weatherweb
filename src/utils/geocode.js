const request = require('request');

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1Ijoib2dnZXI3NyIsImEiOiJjazB3dno4NTIwMGFvM21wZnQ0cXc1cDNyIn0.08ydQa3nOqb4DTjBxX2R-g&limit=1`
 
    request({ url, json: true }, (error, { body }) => {
        if(error)
            callback('Unable to connect to location service', undefined);
        else if(body.features.length === 0)
            callback('Unable to find location', undefined);
        else{
            callback(undefined, {
                latitude: body.features[0].center[0],
                longitude: body.features[0].center[1],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode;