const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000;

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Set up Handle Bars Engine and Views Location 
app.set('view engine', 'hbs');
app.set('views', viewPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App!',
        name: 'Tushar Sethi',
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Tushar Sethi',
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Get Help!',
        message: 'Please Help Me!', 
        name: 'Tushar Sethi'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'Please Enter an Address',
        });
    }
    geocode.geocode(req.query.address, (error, {longitude, latitude, location} = {}) => {
        if (error) {
            return res.send({error});
        }
        forecast.forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({error});
            }
            res.send({
            forecast: forecastData,
            location,
            address : req.query.address,
        });
    });
    });
});

// app.get('/help', (req, res) => {
    //     res.send('Help Page!');
// });

// app.get('/help', (req, res) => {
//     res.send({
//         name: 'Tushar',
//         age: 20,
//     });
// });

// app.get('/help', (req, res) => {
//     res.send([{
//         name: 'Tushar',
//     },{
//         name:'Mike',
//     }]);
// });

// app.get('/about', (req, res) => {
//     res.send('<h1>About Page!</h1>');
// });

// app.get('/weather', (req, res) => {
//     res.send('Weather Page!');
// });

app.get('/help/*', (req, res) => {
    res.render('error', {
        title: '404!',
        name: 'Tushar Sethi',
        errorMessage: 'Help Page Not Found!',
    });
});

// * is a wildcard character
app.get('*', (req, res) => {
    res.render('error', {
        title: '404!',
        name: 'Tushar Sethi',
        errorMessage: 'Page not found!',
    });
});

app.listen(port, () => {
    console.log('Server is up on port ' + port);
});