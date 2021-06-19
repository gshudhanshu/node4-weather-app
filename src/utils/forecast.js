const axios = require('axios')
const chalk = require('chalk')

const forecast = (longitude, latitude, callback) => {
    const url = 'http://api.weatherapi.com/v1/current.json?key=4711288914184c79b7d135356211706&q='+latitude+','+longitude+'&aqi=no';

    axios.get(url)
    .then (({data}) => {
        // console.log(response)
        if(data.location){
            callback(undefined, 
                /*chalk.bgGreen.black.bold*/('It is currently ' +
                data.current.temp_c + ' degree out. There is ' +
                data.current.precip_in + ' chance of rain')
            )
        } else {
            callback('Unable to find location. Try another search', undefined)
        }
    })
    .catch((error) => {
        console.log(error)
        if(error.errno = -3008){
            callback('Unable to connect to location services!', undefined)
        }
    })
}

module.exports = forecast