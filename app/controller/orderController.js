const Order = require('../models/order')

module.exports.create = (req,res) => {
    req.body.addressId = req.query.addressId
    const order = new Order(req.body)
    order.userId = req.user._id
    order.save()
    .then(response => {
        res.json(response)
    })
    .catch(err => res.json(err))
}

module.exports.read = (req, res) => {
    const userId = req.user._id
    Order.find({userId})
        .then(categories => {
            res.send(categories)
        })
        .catch(err => console.log(err))
}