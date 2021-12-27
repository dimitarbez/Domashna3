let express = require('express')
let router = express.Router()
let LoraGateway = require('../models/gateway')

// create route
router.post('/gateway', (req, res) => {
    LoraGateway.create(req.body.gateway, (err, gateway) => {
        if (err) {
            req.flash('err', err.message)
            res.redirect('back')
        }
        res.redirect('/map')
    })
})


// show route
router.get('/gateway/:id', (req, res) => {
    LoraGateway.findById(req.params.id, (err, foundGateway) => {
        if (err) {
            req.flash('err', err.message)
            res.redirect('back')
        }

        res.render('gateway/gateway_show.ejs', { foundGateway: foundGateway })
    })
})


// edit form route
router.get('/gateway/:id', (req, res) => {
    LoraGateway.findById(req.params.id, (err, foundGateway) => {
        if (err) {
            req.flash('err', err.message)
            res.redirect('back')
        }

        res.render('gateway/gateway_edit.ejs', { foundGateway: foundGateway })
    })
})


// create form
router.get('/gateway/new', (req, res) => {
    res.render('gateway/gateway_new.ejs')
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
    LoraGateway.findByIdAndDelete(req.params.id, (err) => {
        if (err) {
            req.flash('err', err.message)
            res.redirect('back')
        }

        res.redirect('/map')
    })
})

module.exports = router
