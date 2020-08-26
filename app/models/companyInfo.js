const moongoose = require('mongoose')
const Schema = moongoose.Schema
const conpanyInfoSchema = new Schema({
    image: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    phone:{
        type: String,
        required: true
    },
    tax:{
        type:Number,
        require:true
    },
    address:{
        type: String,
        required: true
    },
    fb_url:{
        type: String,
        required: true
    },
    map_url:{
        type: String,
        required: true
    },
    messenger_url:{
        type: String,
        required: true
    }

}, { timestamps: {} })

const companyInfo = moongoose.model('companyInfo', conpanyInfoSchema)

module.exports = companyInfo