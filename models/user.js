let mongoose = require('mongoose')
let passportLocalMongoose = require('passport-local-mongoose')

let userSchema = mongoose.Schema({
    username: { type: String, unique: true },
    password: String,
    fullname: String,
    admin: Boolean,
    history: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'lora_gateway'
        }
    ]
})

userSchema.plugin(passportLocalMongoose)

module.exports = mongoose.model('User', userSchema)