const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geoCode = require('./utils/geoCode')
const foreCast = require('./utils/forecast')

const app = express();
const port = process.env.PORT || 3000;

// Define paths for Express config
const viewsPath = path.join(__dirname, '../tamplates/views')
const publicDirPath = path.join(__dirname, '../public')
const partialsPath = path.join(__dirname, '../tamplates/partials')

// Setup handlerbars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Yoni Costa'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'about',
        name: 'Yoni Costa'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Yoni Costa',
        email: 'Yoni@support.com'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    }
    geoCode(req.query.address, (error, { latitude, longtitude, location } = {}) => {
        if (error) {
            return res.send({ error: 'You must provide an address' })
        }
        foreCast(latitude, longtitude, (error, forecastData) => {
            if (error) {
                return res.send(error)
            }
            res.send(
                {
                    forecast: forecastData,
                    address: req.query.address,
                    location: location
                }
            )
        })
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Yoni Costa',
        msg: 'Help article not found'
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    res.send({
        product: []
    })

})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Yoni Costa',
        msg: 'Page not found'
    })
})




// app.com
// app.com/help
// app.com/about
// app.com/weather


app.listen(port, () => {
    console.log('Server is up on port ' + port)
})