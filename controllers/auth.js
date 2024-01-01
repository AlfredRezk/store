const User = require('../models/User');
const {validationResult} = require('express-validator')
const Cart = require('../models/Cart')

let formData = {}


exports.getRegister = async(req, res)=>{

    res.render('pages/auth/register', {docTitle:'Sign up', ...formData})
}


exports.postRegister = async(req, res)=>{
    formData = req.body
    const err = validationResult(req);
    if(!err.isEmpty()){
        req.flash('error', err.errors[0].msg)
        
        return res.redirect('/auth/register');
        
    }

    const user  =await User.create(req.body)
    const cart = await Cart.create({userId: user._id, products:[], totalPrice:0})
    user.cart = cart;
    user.save();
    req.flash('success', 'Account created !')
    res.redirect('/auth/login');


}
exports.getLogin = async(req, res)=>{
    res.render('pages/auth/login', {docTitle:'Sign In', ...formData})
}

exports.postLogin = async(req, res)=>{
formData = req.body;
  const err = validationResult(req);
    if(!err.isEmpty()){
        req.flash('error', err.errors[0].msg)
        return res.redirect('/auth/login');
    }
    const {username, password}= req.body;
   
    // search for the username 
    let user = await User.findOne({$or:[{username}, {email: username}]})

    if(!user){
        req.flash('error', 'Invalid credintials')
        return res.redirect('/auth/login');
    }
    // check the password
    
    const isMatch = await user.matchPassword(password)

    if(!isMatch){
        req.flash('error', 'Invalid credintials')
        return res.redirect('/auth/login');
    }
    req.session.user = user;

    req.flash('success', 'LoggedIn Successfully ')
    res.redirect('/');

 
}

exports.getLogout = (req, res)=>{
    req.session.user = null;

    req.flash('success', 'Logged out Successfully ')
    res.redirect('/auth/login');
}