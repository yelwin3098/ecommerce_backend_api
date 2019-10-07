const Product = require('../models/products')

module.exports.create = (req,res) => {
    console.log(req.files)
    const images = req.files.map(file => ({ link: file.path }))
    const body = req.body 
    const product = new Product({...body, ...{images}})
    product.save()
    .then(response => {
        res.json(response)
    })
    .catch(err => console.log(err))
}

module.exports.read = (req, res) => {
    Product.find({stock:{$gt:0}})
        .then(categories => {
            res.send(categories)
        })
        .catch(err => console.log(err))
}

module.exports.readByCategory = (req,res) => {
    const categoryId = req.query.categoryId
    Product.find({categoryId,stock:{$gt:0}})
    .then(categories => {
        res.send(categories)
    })
    .catch(err => console.log(err))
}

module.exports.update = (req,res) => {
    const id = req.query.id
    const images = req.files.map(file => ({ link: file.path }))
    const body = req.body 
    Product.findOneAndUpdate({_id:id }, {...body,...{images}}, { new: true})
        .then((product) => {
            if (product) {
                res.json(product)
            } else {
                res.json({})
            }
        })
        .catch((err) => {
            res.json(err)
        })
}

module.exports.destroy = (req,res) => {
    Product.findOneAndDelete({_id:req.body._id})
    .then(product =>{
        res.json(product)
    })
    .catch(err => console.log(err))
}