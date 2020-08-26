const LocalStrategy = require('passport-local').Strategy;
const User=require('../app/models/user');
const bcrypt = require('bcryptjs');

module.exports = function(passport){
  // Local Strategy
  passport.use(new LocalStrategy({
      usernameField:'email',
      passReqToCallback : true
    },(req,email,password,done)=>{
      User.findOne({email:email}).then((user)=>{
        if(!user){
          return done(null,false,req.flash('error-message','User not found with this email'))
        }
        bcrypt.compare(password, user.password,(err,passwordMatch)=>{
          if(err){
            return err;
          }
          if(!passwordMatch){
            return done(null,false,req.flash('error-message','Invalid Username or password'));
          }
          return done(null,user,req.flash('success-message','Login Success'));
        });
      });
    }));
     passport.serializeUser(function(user, done) {
        done(null, user.id);
      });

      passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
          done(err, user);
        });
      });

}