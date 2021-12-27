let mongoose = require('mongoose')
let passportLocalMongoose = require('passport-local-mongoose')

let userSchema = mongoose.Schema({
    username: { type: String, unique: true },
    password: String,
    fullname: String,
    admin: Boolean
})

userSchema.plugin(passportLocalMongoose)

module.exports = mongoose.model('User', userSchema)