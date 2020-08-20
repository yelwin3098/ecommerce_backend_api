const mongoose = require('mongoose')
// mongoose is a ODM - object document mapper
/*  1-> map a model to a collection
    2-> map an object to a document
    3-> map an object's property to a document's field  */


//db configuration - establishing connection to db
mongoose.Promise = global.Promise // we are setting the mongoose.promise as global es6 promise . i.e we will use Promises, as operations from backend to db are async
mongoose.connect('mongodb://localhost:27017/e-commerce-backend-api', { useNewUrlParser: true })
    .then(() => {
        console.log('successfully connected to db')
    })
    .catch((err) => {
        console.log('error connecting to db ', err)
    })

module.exports = mongoose