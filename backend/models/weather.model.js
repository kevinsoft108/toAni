const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const weatherSchema = new Schema({
    temperature: String,
    weather: Array,
    humidity: String,
    wind_speed: String,
    location: String,
    zip_code: String,
    pressure: String
});

const Weather = mongoose.model("weather_data", weatherSchema);

module.exports = Weather;
