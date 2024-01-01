const router = require('express').Router()

const ctrl = require('../controllers/cart')

const { protect, authorize } = require('../middlewares/auth')

router.get('/', protect, ctrl.getCart)
router.get('/add/:id',protect, ctrl.getAdd)
router.get('/:prodId/delete', ctrl.getDelete)
router.get('/:prodId/inc', ctrl.getInc)
router.get('/:prodId/dec', ctrl.getDec)

module.exports = router