const axios = require('axios')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURI(address)+'.json?access_token=pk.eyJ1IjoiZ3NodWRoYW5zaHUiLCJhIjoiY2txMTFwanBhMDRrdDJwcGZkY3JpbTc1MSJ9.MCQHr5lOD7QbbPDsqO6-kg&limit=1'
    console.log(url)
    axios.get(url)
    .then (({data}) => {
        if(data.features.length !== 0){
            callback(undefined, {
                longitude : data.features[0].center[0],
                latitude : data.features[0].center[1],
                place_name: data.features[0].place_name
            })
        } else {
            callback('Unable to find location. Try another search', undefined)
        }
    })
    .catch((error) => {
        if(error.errno = -3008){
            callback('Unable to connect to location services!', undefined)
        }
    })
}

module.exports = geocode