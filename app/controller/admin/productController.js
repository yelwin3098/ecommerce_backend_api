const Product = require('../../models/products');
const Category = require('../../models/category');
const fs=require('fs')

module.exports.create_form = async (req, res) => {
    const categories = await Category.find();
    res.render('admin/products/create', { title: 'Admin | Product Creation', categories: categories })
}

module.exports.create = (req, res) => {
    console.log(req.files)
    const images = req.files.map(file => ({ link: file.path }))
    const body = req.body
    const product = new Product({ ...body, ...{ images } })
    product.save()
        .then(response => {
            res.redirect('/admin/product_create')
        })
        .catch(err => console.log(err))
}

module.exports.read = async (req, res) => {
    const products = await Product.find({ stock: { $gt: 0 } }).populate('categoryId')
    res.render('admin/products/product_list', { products: products })
}
module.exports.edit = async (req, res) => {
    const categories = await Category.find();
    const product = await Product.findById(req.params.id).populate('categoryId');
    res.render('admin/products/edit', { title: 'Admin | Product Edition', categories: categories, product: product })
}
module.exports.readByCategory = (req, res) => {
    const categoryId = req.query.categoryId
    Product.find({ categoryId, stock: { $gt: 0 } })
        .then(categories => {
            res.send(categories)
        })
        .catch(err => console.log(err))
}

module.exports.update = (req, res) => {
    const id = req.params.id
    console.log(req.body)
    if (req.files) {
        const images = req.files.map(file => ({ link: file.path }))
        const body = req.body
        Product.findOneAndUpdate({ _id: id }, { ...body, ...{ images } }, { new: true })
            .then((product) => {
                if (product) {
                    res.redirect('/admin/product_list')
                } else {
                    res.json({})
                }
            })
            .catch((err) => {
                res.json(err)
            })
    }else{
        const body = req.body
        Product.findOneAndUpdate({ _id: id }, {body}, { new: true })
            .then((product) => {
                if (product) {
                    res.redirect('/admin/product_list')
                } else {
                    res.json({})
                }
            })
            .catch((err) => {
                res.json(err)
            })
    }
}

module.exports.destroy = (req, res) => {
    Product.findOneAndDelete({ _id: req.params.id })
        .then(product => {
            res.redirect('/admin/product_list')
        })
        .catch(err => console.log(err))
}