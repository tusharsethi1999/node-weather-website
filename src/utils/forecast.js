const request = require('postman-request');

forecast = (latitude, longitude, callback) => {
    if(latitude === undefined || latitude === undefined) {
        callback('Unable to find location', undefined);
    }
    const url = 'http://api.weatherstack.com/current?access_key=1190f5bda69a400a4922e2ff64b543eb&query=' 
    + encodeURIComponent(latitude) + ',' + encodeURIComponent(longitude);
    request({url, json: true}, (error, {body}) => {
        if(error) {
            callback('Unable to connect to location services', undefined);
        } else if(body.error) {
            callback('Unable to find location', undefined);
        } else {
            callback(undefined,{
                windSpeed: body.current.wind_speed,
                placename: body.location.name,
                temperature: body.current.temperature,
                feelslike: body.current.feelslike,
                description: body.current.weather_descriptions[0],
            });
        }
    });
}

module.exports = {
    forecast: forecast,
}