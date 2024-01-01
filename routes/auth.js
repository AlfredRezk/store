const router = require('express').Router()
const ctrl = require('../controllers/auth')
const { protect } = require('../middlewares/auth')
const { register, login } = require('../validation/auth')


router.get('/register', ctrl.getRegister)
router.post('/register', register(), ctrl.postRegister)
router.get('/login', ctrl.getLogin)
router.get('/logout', protect, ctrl.getLogout)
router.post('/login', login(),  ctrl.postLogin)
module.exports = router