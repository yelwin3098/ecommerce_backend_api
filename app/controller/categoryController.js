const Category = require('../models/category')

module.exports.create = (req,res) => {
    const category = new Category(req.body)
    category.save()
    .then(response => {
        res.json(response)
    })
    .catch(err => console.log(err))
}

module.exports.read = (req, res) => {
    Category.find()
        .then(categories => {
            res.send(categories)
        })
        .catch(err => console.log(err))
}

module.exports.update = (req,res) => {
    const id = req.query.id
    const body = req.body
    Category.findOneAndUpdate({_id:id }, body, { new: true,useFindAndModify:false})
        .then((category) => {
            if (category) {
                res.json(category)
            } else {
                res.json({})
            }
        })
        .catch((err) => {
            res.json(err)
        })
}

module.exports.destroy = (req,res) => {
    const id = req.query.id
    Category.findOneAndDelete(id)
    .then(category =>{
        res.json(category)
    })
    .catch(err => console.log(err))
}


