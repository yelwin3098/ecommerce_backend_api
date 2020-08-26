const express = require('express')
const router = express.Router()
const categories = require('../app/controller/categoryController')
const users = require('../app/controller/userController')
const products = require('../app/controller/productController')
const carts = require('../app/controller/cartController')
const orders = require('../app/controller/orderController')
const multer = require('multer')
const {authenticate,authorise} = require('../app/middlewares/auth')
const address = require('../app/controller/addressController')
const {findAndConstructOrder,updateStock,verifyStock} = require('../app/middlewares/cartToOrder')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'public/images/uploads')
    },
    filename: (req, file, cb) => {
      cb(null, file.fieldname + '-' + Date.now() + '-' + file.originalname)
    }
})
const upload = multer({storage: storage})

router.post('/categories',authenticate,authorise,categories.create)
router.get('/categories',authenticate,categories.read)
router.put('/categories',authenticate,authorise,categories.update)
router.delete('/categories',authenticate,authorise,categories.destroy)

router.post('/register',users.register)
router.post('/login',users.login)
router.put('/users',authenticate,users.update)
router.delete('/users',authenticate,users.destroy)

router.post('/products',authenticate,authorise,upload.array('photos',5),products.create)
router.get('/products',products.read)
router.get('/product_by_cat',products.readByCategory)
router.put('/products',authenticate,authorise,upload.array('photos',5),products.update)
router.delete('/products',authenticate,authorise,products.destroy)

router.post('/carts',authenticate,carts.create)
router.get('/carts',authenticate,carts.read)
router.put('/carts',authenticate,carts.update)
router.delete('/carts',authenticate,carts.destroy)

router.post('/orders',authenticate,findAndConstructOrder,verifyStock,updateStock,carts.destroy,orders.create)
router.get('/orders',authenticate,orders.read)

router.post('/account',authenticate,address.create)
router.get('/account',authenticate,address.read)
router.put('/account',authenticate,address.update)
router.delete('/account',authenticate,address.destroy)

module.exports = router