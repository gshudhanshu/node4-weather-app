const forecast = require("./utils/forecast")
const geocode = require("./utils/geocode")

const path = require('path')
const hbs = require('hbs')
const express = require('express');

const app = express();

const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../template/views')
const partialsPath = path.join(__dirname, '../template/partials')

const port = process.env.PORT || 3000

app.set('view engine', 'hbs')
app.set('views', viewsPath)
app.use(express.static(publicDirPath))

hbs.registerPartials(partialsPath)

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'shudhanshu'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'about page',
        name: 'shudhanshu'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'help page',
        name: 'shudhanshu'
    })
})

app.get('/weather', (req, res) =>{
    console.log(req.query)
    if(!req.query.address){
        return res.send({
            error: 'Please provide address'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, place_name}={}) => {
        if(error) {
            return res.send({
                error: error
            })
        }
        forecast(longitude, latitude, (error, forecastData) => {  
            if(error) {
                return res.send({
                    error: error
                })
            }
            console.log(forecastData)
            res.send({
                forecast: forecastData,
                location: place_name,
                address: req.query.address
            })
    })
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        error: 'Article not found!',
        name: 'shudhanshu'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        error: 'Page not found!',
        name: 'shudhanshu'
    })
})






app.listen(port, () => {
    console.log('Server is listening on port '+port)
})