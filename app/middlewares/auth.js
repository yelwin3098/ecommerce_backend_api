const  User  = require('../models/user')


const authenticate = function (req, res, next) {
    const token = req.header('x-auth')
    if(token){
    User.findByToken(token)
        .then((user) => {
            if (user) {
                req.user = user
                req.token = token
                req.role = user.role
                next()
            }
            else {
                res.status('401').send({ notice: 'token not available' })
                res.redirect('/admin/login')
            }
        })
        .catch((err) => {
            res.status('401').send(err)
            res.redirect('/admin/login')
        })
    }else{
        res.status('401').send({ error: 'token not available' })
        res.redirect('/admin/login')
    }
}

const authorise  = function(req,res,next){
    if(req.role == 'Admin'){
        next()
    }
    else{
        res.status('403').send({
            error: 'User not authorised'
        })
        res.redirect('/admin/login')
    }
}

module.exports = {
    authenticate,
    authorise
}