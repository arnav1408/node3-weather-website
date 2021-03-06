const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/0153502d81dd81fe58c4dc930f9d9f70/' + latitude + ',' + longitude  +'?units=si&lang=en';

    request ({url, json: true}, (error, {body}) => {
        if (error) {
            callback('Unable to access weather services', undefined);
        } else if (body.error) {
            callback('Unable to find location.', undefined);
        } else {
            callback(undefined, body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degrees out. There is ' + body.currently.precipProbability*100 + '% chance of rain. Maximum temperature of the day is expected to be ' + body.daily.data[0].temperatureHigh + ' degrees. Minimum Temperature is expected to be ' + body.daily.data[0].temperatureLow + ' degrees.');
        }
    });
}

module.exports = forecast;