const Address = require('../models/address')

module.exports.create = (req,res) => {
    const userId = req.user._id
    const address = req.body
    const addresss = new Address({userId,...{address}})
    addresss.save()
    .then(address => res.json(address))
    .catch(err=>res.json(err))
}

module.exports.read = (req,res) => {
    const userId = req.user._id
    Address.find({userId,isDeleted:false})
    .then(address => res.json(address))
    .catch(err => res.json(err))
}

module.exports.update =(req,res) => {
    const {street,pincode,houseNo} = req.body
    const address = {street,pincode,houseNo}
    Address.findByIdAndUpdate(req.query.id,{...{},...{address}})
    .then(address => res.json(address))
    .catch(err => res.json(err))
}

module.exports.destroy = (req,res) => {
    Address.findByIdAndUpdate(req.query.id,{isDeleted:true})
    .then(address => res.json(address))
    .catch(err=>res.json(err))
}