const request = require('request');

const forecast = (lat, long, callback) => {
    const url=`https://api.darksky.net/forecast/076fa2eb088b8cd6bd14f8cd378821be/${long},${lat}`;

    //shorthand syntax for url (url: url)
    //destructuring response.body into body
    request({ url, json: true }, (error, { body })=> {
        if(error){
            callback('unable to connect', undefined)
        }else if(body.error){
            callback('Unable to find location', undefined)
        }else{
            const tempHigh = body.daily.data[0].temperatureHigh;
            const tempLow = body.daily.data[0].temperatureLow;            
            const deg = body.currently.temperature;
            const rain = body.currently.precipProbability;
            const summary = body.daily.data[0].summary;

            callback(undefined, `${summary}. It is currently ${deg} with the highgest at ${tempHigh} and the lowest at ${tempLow}. There is ${rain} % of rain`)    
        }   
    })
}

module.exports = forecast;