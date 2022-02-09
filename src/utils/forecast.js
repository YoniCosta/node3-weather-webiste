const request = require('request');

const forecast = (lat, long, callback) => {
    const givenLat = encodeURIComponent(lat);
    const givenLong = encodeURIComponent(long);

    const url = `http://api.weatherstack.com/current?access_key=a6663b480ec0004a27cb0f2a1bc5aeee&query=${givenLong},${givenLat}&units=m`

    request({ url, json: true }, (error, { body } = {}) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined);
        } else if (body.error) {
            callback(`Unable to forcast the weather for the given location`, undefined)
        } else {
            const { temperature, feelslike } = body.current;
            const description = body.current.weather_descriptions[0];
            callback(undefined, `${description} ,It is currently ${temperature} degress out, but feels like ${feelslike}.`)
        }
    })

}

module.exports = forecast