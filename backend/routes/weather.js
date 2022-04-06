const router = require("express").Router();
const axios = require('axios');
let Weather = require("../models/weather.model");
const { response } = require("express");

// Root route
router.route("/:id").get((req, res) => {
    var zip_code = req.params.id;
    var url = 'https://api.openweathermap.org/data/2.5/weather?zip='+zip_code+'&APPID=44f1a0209deb1e734214ba214313621f';
    axios.get(url)
        .then(response => 
            // console.log(response.data);
            {
                let temperature = response.data.main.temp;
                let humidity = response.data.main.humidity;
                let pressure = response.data.main.pressure;
                let wind_speed = response.data.wind.speed;
                let weather = response.data.weather;
                let location = response.data.sys.country;
                let zip_code = req.params.id
                
                const newWeather = new Weather({temperature, humidity, pressure, wind_speed, weather, location, zip_code});
                newWeather.save().then(() => console.log('ddd'))
                return res.json(response.data)
            }
            )
        .catch(error => {
            res.json({ error: error });
        });
        
    // console.log(zip_code);
    // Post.find()
    //     .then((posts) => res.json(posts))
    //     .catch((err) => res.status(400).json("Error: " + err));
});


module.exports = router;
