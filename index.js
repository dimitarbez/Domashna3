require('dotenv').config()

const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const methodOverride = require('method-override')

mongoose.connect(process.env.DATABASEURL).then(() => {
    console.log("connected to db " + process.env.DATABASEURL);
}).catch(err => {
    console.log(err);
})

let LoraGateway = require('./models/gateway')

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(express.static(__dirname + '/public'))
app.use(methodOverride('_method'))
app.set('view engine', 'ejs')


app.get('/', (req, res) => {
    res.render('home')
})


app.get('/history', (req, res) => {
    LoraGateway.find({}, (err, gateways) => {
        if (err) {
            console.log(err)
        } else {
            console.log(gateways)
            res.render('history', {gateways: gateways})
        }
    })
})


app.get('/map', (req, res) => {
    LoraGateway.find({}, (err, gateways) => {
        if (err) {
            console.log(err)
        } else {
            console.log(gateways)
            res.render('map', {gateways: gateways})
        }
    })
})


app.get('/login', (req, res) => {
    res.render('login')
})


app.get('/submit_gateway', (req, res) => {
    res.render('submit_gateway')
})


app.get('*', (req, res) => {
    res.send('test')
})

app.listen(process.env.PORT || 3001, () => {
    console.log('app started')
})