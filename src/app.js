const path = require('path');
const express = require('express');
const hbs = require('hbs');
const forecast = require('./utils/forecast.js');
const geocode = require('./utils/geocode.js');

const app = express();
const port = process.env.PORT || 3000;

//Define Paths
const publicDirectory = path.join(__dirname, '../public');
const viewPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//Setting Engines
app.set('view engine', 'hbs');
app.set('views', viewPath);
hbs.registerPartials(partialsPath);

app.use(express.static(publicDirectory));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'NodeJs',
        name: 'Arnav Agrawal'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Goooogle',
        name: 'Arnav Agrawal'
    });
});

app.get('/help', (req,res) => {
    res.render('help', {
        title: 'Help',
        message: 'Hello There Need Some Help!!!',
        name: 'Arnav Agrawal'
    });
});

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Please Provide an address'
        });
    }
    const address = req.query.address;
    geocode(address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({ error });
        }
        forecast (latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error });
            }
            res.send({
                location,
                forecast: forecastData,
                address: req.query.address
            });
        })
    })
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404 Page',
        name: 'Arnav',
        errorMessage: 'Help Article Not Found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404 Page',
        name: 'Arnav',
        errorMessage: 'Page not found'
    })
});

app.listen(port, () => {
    console.log('Listening on Port ' + port);
});