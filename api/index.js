const router = require('express').Router()
module.exports = router

const auth = require('./auth')
router.use('/auth', auth)