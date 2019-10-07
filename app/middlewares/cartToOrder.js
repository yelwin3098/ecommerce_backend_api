const Cart = require("../models/cart")
const Product = require('../models/products')

const findAndConstructOrder = function(req, res, next) {
	req.body.orderNumber = Number(Date.now())
	const userId = req.user._id
	req.body.userId = userId
	let total = 0
	let orderItem = []
	Cart.find({ userId })
        .populate("productId")
		.then(items => {
            if(items.length){
                items.map(item => {
                    const { quantity } = item
                    const { price } = item.productId
                    total = total + price * quantity
                    orderItem = orderItem.concat({
                        productId: item.productId._id,
                        quantity,
                        price
                    })
                })
                req.body.total = total
                req.body.orderItem = orderItem
                next()
            }
            else{
                res.json({error:'cart is empty'})
            }
			
		})
		.catch(err => res.json(err))
}

const updateStock = function(req,res,next){
    const items = req.body.orderItem
    if(items.length){
        items.map(item => {
            Product.findOne({_id:item.productId})
            .then(product => {
                const stock = product.stock - item.quantity
                const _id = product._id
                Product.findOneAndUpdate({_id},{stock},{useFindAndModify:false})
                .then(product => {
                    next()
                })
            })
            .catch(err => console.log(err))
        })
    }
}

const verifyStock = function(req,res,next){
    const items = req.body.orderItem
    if(items.length){
        items.map(item => {
            Product.findOne({_id:item.productId})
            .then(product => {
                const stock = product.stock
                if(stock >= item.quantity){
                    next()
                }
                else if (stock){
                    res.json({error:`only ${stock} available`})
                }
               else{
                   res.json({error:'Item Unavailable'})
               }
            })
            .catch(err => console.log(err))
        })
    }
}


module.exports = {
    findAndConstructOrder,
    updateStock,
    verifyStock
}
