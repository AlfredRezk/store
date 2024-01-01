const router = require('express').Router()

const ctrl = require('../controllers/product')
const { protect, authorize } = require('../middlewares/auth')
const upload =require('../middlewares/upload')
const { add } = require('../validation/product')

router.get('/add', protect, authorize('admin', 'seller'),  ctrl.getAdd)
router.post('/', protect, authorize('admin', 'seller'),  add(), upload.single('image'), ctrl.postAdd)
router.get('/', ctrl.getProducts)
router.get('/:id', ctrl.getProduct)
router.get('/delete/:id', protect, authorize('admin', 'seller'), ctrl.getDelete)
router.get('/edit/:id', protect, authorize('admin', 'seller'), ctrl.getEdit)
router.post('/edit/',protect, authorize('admin', 'seller'),  add(), upload.single('image'), ctrl.postEdit)
module.exports = router