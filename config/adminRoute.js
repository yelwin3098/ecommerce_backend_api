const express = require('express')
const router = express.Router()
const dashboardController=require('../app/controller/admin/index')
const authController=require('../app/controller/admin/auth/index')
const categoryController=require('../app/controller/admin/categoryController')
const productController=require('../app/controller/admin/productController')
const orderController=require('../app/controller/admin/orderController')
const customerController=require('../app/controller/admin/customerController')
const multer = require('multer')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'public/images/uploads')
    },
    filename: (req, file, cb) => {
      cb(null, file.fieldname + '-' + Date.now() + '-' + file.originalname)
    }
})
const upload = multer({storage: storage})

router.get('/dashboard',isLoggedIn,dashboardController.index);

router.get('/login',authController.loginForm)
router.post('/login',authController.submitLogin)
router.get('/logout',isLoggedIn,authController.logout)

router.get('/category_create',isLoggedIn,categoryController.category_form)
router.post('/category_create',isLoggedIn,categoryController.submit_category)
router.get('/category/delete/:id',isLoggedIn,categoryController.destroy)

router.get('/product_create',isLoggedIn,productController.create_form)
router.post('/product_create',isLoggedIn,upload.array('product_img',5),productController.create)
router.get('/product_list',isLoggedIn,productController.read)
router.get('/product/edit/:id',isLoggedIn,productController.edit);
router.post('/product/edit/:id',isLoggedIn,upload.array('product_img',5),productController.update);
router.get('/product/delete/:id',isLoggedIn,productController.destroy)

router.get('/order_list',isLoggedIn,orderController.read);
router.get('/order_accepted',isLoggedIn,orderController.accepted_list)
router.get('/order_detail/:id',isLoggedIn,orderController.order_detail)

router.get('/customer_list',isLoggedIn,customerController.customer_list)
router.get('/accounts',isLoggedIn,customerController.accounts)

router.get('/company_info',isLoggedIn,dashboardController.company_info)
router.post('/company_info/:id',isLoggedIn,upload.single('company_image'),dashboardController.submit_company_info)


module.exports = router

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        if (req.user.role === 'Admin') {
            return next();
        } else if (req.user.role === 'Customer') {
            res.redirect('/admin/login');
        }
    }
    res.redirect('/admin/login');
}