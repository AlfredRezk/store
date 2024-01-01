const router = require('express').Router()


router.get('/', (req, res)=>{res.redirect('/products')})
router.use('/auth', require('./auth'))
router.use('/products', require('./product'))
router.use('/cart', require('./cart'))
module.exports = router