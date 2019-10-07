const mongoose = require('mongoose')
const Schema = mongoose.Schema
const orderSchema = new Schema(
    {
        orderNumber:{
            type:Number,
            required:true
        },
        orderDate:{
            type:Date,
            default:new Date()
        },
        userId:{
            type:Schema.Types.ObjectId,
            ref:'User',
            required:true
        },
        total:{
            type:Number,
            required:true
        },
        addressId:{
            type:Schema.Types.ObjectId,
            ref:'Address',
            required:true
        },
        orderItem:[{
            productId:{
                type:Schema.Types.ObjectId,
                required:true
            },
            quantity:{
                type:Number,
                require:true
            },
            price:{
                type:Number,
                required:true
            }
        }],
        status :{
            type:String,
            default:'Dispatched'
        }
    }
)

const Order = mongoose.model('Order',orderSchema)
module.exports = Order