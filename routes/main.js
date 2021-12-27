require('dotenv').config()
let express = require('express')
let router = express.Router()
let passport = require('passport')
let middleware = require('../middleware/middleware')
let User = require('../models/user')
let LoraGateway = require('../models/gateway')


router.get('/', (req, res) => {
    res.render('home')
})


router.get('/history', middleware.isLoggedIn, (req, res) => {
    User.findById(req.user._id)
        .populate('history')
        .exec((err, user) => {
            res.render('history', {gateways: user.history})
        })
})


router.get('/map', middleware.isLoggedIn, (req, res) => {
    LoraGateway.find({}, (err, gateways) => {
        if (err) {
            console.log(err)
        } else {
            gateways = gateways.slice(0, 200)
            console.log(gateways)
            res.render('map', {gateways: JSON.stringify(gateways)})
        }
    })
})


router.get('/login', (req, res) => {
    res.render('login')
})


// login hangle
router.post('/login', (req, res, next) => {

    passport.authenticate('local', (err, user, info) => {
        if(err) { return next(err) }
        if(!user) { 
            req.flash('error', 'Username or password do not match!')
            return res.redirect('/login')
        }

        req.logIn(user, (err) => {

            if(err) {
                console.log(err)
            } else {
                req.flash('success', 'Welcome!')
                res.redirect('/')
            }
        })
    
    }
    )(req, res, next)
})


router.get('/logout', (req, res) => {
    req.logout()
    req.flash('success', 'Logged you out')
    res.redirect('/')
})


router.get('/register', (req, res) => {
    res.render('register')
})


router.post('/register', (req, res) => {
    let newUser = {
        username: req.body.username.trim(),
        fullname: req.body.fullname.trim()
    }

    User.find({username: req.body.username}, (err, foundUser) => {
        if (foundUser.length > 0) {
            console.log(foundUser)
            req.flash('error', 'That username is currently in use')
            res.redirect('back')
        } else {
            User.register(newUser, req.body.password, (err, user) => {
                if (err) {
                    req.flash('error', err)
                    console.log(err)
                    res.redirect('/register')
                }

                req.login(user, err => {
                    if (err) {
                        console.log(err)
                        req.flash('error', err)
                        console.log(err)
                        res.redirect('/register')
                    }
                    res.redirect('/')
                })
            })
        }
    })
})


router.get('/submit_gateway', (req, res) => {
    res.render('submit_gateway')
})


module.exports = router