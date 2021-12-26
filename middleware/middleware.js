let User = require('../models/user.js')

let middlewareObj = {}

middlewareObj.isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next()
    } else {
        req.flash('error', 'You need to be logged in to do that!')
        return res.redirect('/login')
    }
}

module.exports = middlewareObj