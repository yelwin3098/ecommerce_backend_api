 const mongoose = require('mongoose')
 const Schema = mongoose.Schema
 const categorySchema = new Schema({
     name:{
         type:String,
         required:true
     },
     description :{
         type:String,
         required:true
     }
 },{ timestamps: {} })

 const Category = mongoose.model('Category',categorySchema)
 module.exports = Category