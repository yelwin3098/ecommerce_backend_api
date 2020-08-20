const Cart = require('../models/cart')

module.exports.create = (req,res) => {
    const userId = req.user._id
    const productId = req.query.productId
    const cart = new Cart({userId,productId})
    cart.save()
    .then(response => {
        res.json(response)
    })
    .catch(err => console.log(err))
}

module.exports.read = (req, res) => {
    const userId = req.user._id
    Cart.find({userId})
        .populate('productId')
        .then(items => {
            res.send(items)
        })
        .catch(err => console.log(err))
}

module.exports.update = (req,res) => {
    const productId = req.query.productId
    const userId = req.user._id
    const quantity = req.body.quantity
    Cart.findOneAndUpdate({productId, userId}, {quantity} , { new: true})
        .then((cart) => {
            if (cart) {
                res.json(cart)
            } else {
                res.json({})
            }
        })
        .catch((err) => {
            res.json(err)
        })
}

module.exports.destroy = (req,res,next) => {
    const userId = req.user._id
    Cart.deleteMany({userId})
    .then(cart =>{
        next()
    })
    .catch(err => console.log(err))
}


