const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express()
//find the path to index.html
//Define paths for express config
const publicDirectory = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine
app.set('view engine', 'hbs')
app.set('views', viewPath);
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectory));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Dinh Vu'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Dinh Vu'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Dinh Vu',
        msg: 'tesing'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'You must provide an address'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if(error){
            return res.send({ error: error })
        }

        forecast(latitude, longitude , (error, forecastData) => {
            if(error){
                return res.send({ error: error })
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address 
            })
        })
    })

    // res.send({
    //     forecast: '50deg',
    //     location: 'Boston',
    //     address: req.query.address
    // })    
})

app.get('/products', (req, res) => {
    if(!req.query.search){
        //using return to short circuit the function
        return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query);
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404',{
        title: '404',
        name: 'Dinh Vu',
        errorMsg: 'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Dinh Vu',
        errorMsg: 'Page not found'
    })
})

app.listen(3000, () => {
    console.log('Server is up')
})