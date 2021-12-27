require('dotenv').config()

const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const methodOverride = require('method-override')
let passport = require('passport')
let localStrategy = require('passport-local')
let flash = require('connect-flash')

mongoose.connect(process.env.DATABASEURL).then(() => {
    console.log("connected to db " + process.env.DATABASEURL);
}).catch(err => {
    console.log(err);
})

app.use(require("express-session")({
    secret: "Zivio je drug tito!",
    resave: false,
    saveUninitialized: false
}));

let LoraGateway = require('./models/gateway')
const User = require('./models/user')

let mainRoutes = require('./routes/main')
let gatewayRoutes


app.use(passport.initialize())
app.use(passport.session())
passport.use(new localStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

app.use(flash())

app.use((req, res, next) => {
    res.locals.currentUser = req.user
    res.locals.error = req.flash('error')
    res.locals.success = req.flash('success')
    res.locals.primary = req.flash('primary')

    next()
})


app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(express.static(__dirname + '/public'))
app.use(methodOverride('_method'))
app.set('view engine', 'ejs')

app.use(mainRoutes)



app.get('*', (req, res) => {
    req.flash('error', 'Route not found!')
    res.redirect('/')
})

app.listen(process.env.PORT || 3000, () => {
    console.log('app started')
})