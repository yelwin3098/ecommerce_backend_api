const Order=require('../../models/order')
const Cart=require('../../models/cart')
const Customer=require('../../models/user')
const Info=require('../../models/companyInfo')

module.exports = {
    index:async (req,res) => {
        const carts=await Cart.find();
        const customers=await Customer.find({role:'Customer'})
        const orders=await Order.find()
                    .populate('userId')
                    .populate('addressId')
        res.render('admin/dashboard',{title:'Admin | Dashboard',orders:orders,
                                       carts:carts, customers:customers })
    },
    company_info:async (req,res) => {
        const info=await Info.findOne()
        res.render('admin/company_info',{title:'Admin | Company Information',info:info})
    },
    submit_company_info:(req,res,next)=>{
        const id=req.params.id
        const files = req.file
       if(files){
        const info =Info.findByIdAndUpdate(id,{
            description:req.body.description,
            phone:req.body.phone,
            tax:req.body.tax,
            address:req.body.address,
            fb_url:req.body.fb_url,
            map_url:req.body.map_url,
            messenger_url:req.body.messenger_url,
            image:'images/uploads/'+req.file.filename,
        });
         info.exec()
            .then(response => {
                res.redirect('/admin/company_info')
            })
            .catch(err => console.log(err))
       }else{
        const info =Info.findByIdAndUpdate(id,{
            description:req.body.description,
            phone:req.body.phone,
            tax:req.body.tax,
            address:req.body.address,
            fb_url:req.body.fb_url,
            map_url:req.body.map_url,
            messenger_url:req.body.messenger_url,
            image:req.body.image,
        });
        info.exec()
        .then(response => {
            res.redirect('/admin/company_info')
        })
        .catch(err => console.log(err))
       }
    }
}