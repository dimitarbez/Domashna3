const mongoose = require('mongoose')

let gatewaySchema = mongoose.Schema({
    id: String,
    name: String,
    country_code: String,
    online: Boolean,
    frequency_plan: String,
    last_seen: Date,
    location: {
        latitude: Number,
        longitude: Number,
        altitude: Number
    }
})

module.exports = mongoose.model('lora_gateway', gatewaySchema)