const express = require('express')
const mongoose = require('./config/database')
const router = require('./config/routes')
const adminRouter=require('./config/adminRoute')
const cors = require('cors')
const flash = require('connect-flash');
const passport=require('passport');
const session = require('express-session');
const path=require('path')

const app= express()

app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use(cors())
const port = 3005
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(express.static(path.join(__dirname, 'public')))

//Flash and Session
app.use(session({
    secret: 'anysecret',
    saveUninitialized: true,
    resave: true
}));
app.use(flash());
//Passport Config
require('./config/passport')(passport);
// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

app.get('*', function(req, res, next){
  res.locals.user = req.user || null;
  res.locals.success_message=req.flash('success-message');
  res.locals.error_message=req.flash('error-message');
  next();
});

app.get('/',(req,res)=>
{
    res.send("Notes App")
})

app.use('/',router)
app.use('/admin',adminRouter)

app.listen(port,()=>{
    console.log('Listening on port ', port)
})