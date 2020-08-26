const Address = require('../../models/address')
const Customer=require('../../models/user')

module.exports.customer_list=async (req,res)=>{
    const users=await Customer.find({role:'Customer'})
    res.render('admin/customer/customer_list',{title:'Admin | Customer List',customers:users})
}

module.exports.accounts = (req,res) => {
    Address.find({isDeleted:false}).populate('userId')
    .then(address => 
        res.render('admin/customer/address',{title:'Admin | Account & Address',addresses:address})
        )
    .catch(err => res.json(err))
}

