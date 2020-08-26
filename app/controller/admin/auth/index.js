const User=require('../../../models/user')
const passport=require('passport')

module.exports = {
    loginForm:async (req,res) => {
        res.render('admin/login')
    },
    submitLogin:(req,res,next) => {
        passport.authenticate('local', {
            successRedirect: '/admin/dashboard',
            failureRedirect: '/admin/login',
            failureFlash: true
        })(req, res, next);
    },
    logout:(req,res,next)=>{
        req.logout();
        res.redirect('/admin/login');
    }

}