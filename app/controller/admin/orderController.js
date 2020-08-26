const Cart = require('../../models/cart')
const Order=require('../../models/order')
const Product=require('../../models/products')

module.exports.read = (req, res) => {
    Cart.find()
        .populate('userId')
        .populate('productId')
        .then(items => {
            res.render('admin/order/pending_list',{title:'Admin | Order Pending List',orders:items})
        })
        .catch(err => console.log(err))
}

module.exports.accepted_list = (req, res) => {
    Order.find()
        .populate('userId')
        .populate('addressId')
        .then(items => {
            res.render('admin/order/accepted_list',{title:'Admin | Order Accepted List',orders:items})
        })
        .catch(err => console.log(err))
}

module.exports.order_detail = (req, res) => {
    const id=req.params.id
    Order.findById(id)
        .populate('userId')
        .populate('addressId')
        .populate({ 
            path: 'orderItem.productId',
            populate: {
              path: 'categoryId',
              model: 'Category'
            } 
         })
        .then(item => {
            res.render('admin/order/order_detail',{title:'Admin | Order Detail',order:item})
        })
        .catch(err => console.log(err))
}



