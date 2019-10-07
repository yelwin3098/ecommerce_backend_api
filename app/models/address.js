const moongoose = require('mongoose')
const Schema = moongoose.Schema
const addressSchema = new Schema({
    userId:{
        type:Schema.Types.ObjectId,
        required:true
    },
    address:[{
        houseNo:{
            type:String,
            required:true
        },
        street:{
            type:String,
            required:true
        },
        pincode:{
            type:Number,
            require:true
        }
    }],
    isDeleted:{
        type:Boolean,
        default:false
    }
})

const Address = moongoose.model('Address',addressSchema)

module.exports = Address