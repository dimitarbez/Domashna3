let express = require('express')
let router = express.Router()
let LoraGateway = require('../models/gateway')

// create route
router.post('/gateway', (req, res) => {

    console.log(req.body)
    let gateway = {
        id: req.body.id,
        name: req.body.name,
        country_code: req.body.country_code,
        online: req.body.online,
        frequency_plan: req.body.frequency_plan,
        last_seen: req.body.last_seen,
        location: {
            latitude: req.body.latitude,
            longitude: req.body.longitude,
            altitude: req.body.altitude
        }
    }
    LoraGateway.create(gateway, (err, gateway) => {
        if (err) {
            req.flash('err', err.message)
            res.redirect('back')
        }
        console.log(gateway)
        res.redirect('/map')
    })
})


router.get('/gateway', (req, res) => {
    LoraGateway.find({}, (err, gateways) => {
        res.json(gateways)
    })
})


// create form
router.get('/gateway/new', (req, res) => {    
    res.render('gateway/gateway_new.ejs')
})

// show route
router.get('/gateway/:id', (req, res) => {
    LoraGateway.findById(req.params.id, (err, foundGateway) => {
        if (err) {
            req.flash('err', err.message)
            res.redirect('back')
        }

        req.user.history.addToSet(foundGateway)
        req.user.save()

        res.render('gateway/gateway_show.ejs', { gateway: foundGateway })
    })
})


// edit form route
router.get('/gateway/:id/edit', (req, res) => {
    LoraGateway.findById(req.params.id, (err, foundGateway) => {
        if (err) {
            req.flash('err', err.message)
            res.redirect('back')
        }

        res.render('gateway/gateway_edit.ejs', { gateway: foundGateway })
    })
})




// edit route
router.put('/gateway/:id', (req, res) => {
    LoraGateway.findByIdAndUpdate(req.params.id, req.body.gateway, (err, foundGateway) => {
        if (err) {
            req.flash('err', err.message)
            res.redirect('back')
        }

        res.redirect('/map')
    })
})

router.delete('/gateway/:id', (req, res) => {
    console.log('del route')
    LoraGateway.findByIdAndDelete(req.params.id, (err) => {
        if (err) {
            req.flash('err', err.message)
            res.redirect('back')
        }

        res.redirect('/map')
    })
})

module.exports = router
