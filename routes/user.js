var express = require('express');
var router = express.Router();
var Product = require('../models/product')
var csrf = require('csurf')
var User = require("../models/user")
var passport = require('passport')
var csrfProtection = csrf();
var Cart = require('../models/cart')
var Order = require('../models/order')
/* GET home page. */
var stripe = require('stripe')
router.use(csrfProtection);
router.get('/profile',isLoggedIn,function(req,res){
  Order.find({user:req.user},function(err,orders){
    if(!err) {
      var totalorders = {};
      var totalcreatedat = [];
      totalorders.createdAt = orders.createdAt;
      var cartArray = []
      orders.forEach(function(order){
        totalcreatedat.push(order.createdAt);
        var cart = new Cart(order.cart)
        cartArray.push(cart.genArray())

      })
      totalorders.cart = cartArray;
      totalorders.createdAt = totalcreatedat

        res.render("user/profile",{items:cartArray});
        console.log(totalorders);

    }
  });
});
router.get('/logout',isLoggedIn,function(req,res){
  req.logout()
  res.redirect('/')
})
router.get('/checkout',isLoggedIn,function(req,res){
  if(req.session.cart.totalPrice === 0){
    req.flash('error',"Payment Cannot Be 0")
    res.redirect('../cart')
  }
  res.render('payment',{csrfToken:req.csrfToken()})
})

router.post('/checkout',isLoggedIn,function(req,res){
  var cart = new Cart('req.session.cart')

  // stripe.charge.create({
  //   amount: cart.totalPrice*100 //because 1 rs has 100 paise,
  //   currency:"rs",
  //   source: "key obtined by hidden input tag",
  //   descripttion: "Charge by "+req.body.email
  // },function(err,charge){
  //   if(err){
  //     req.flash('error',err.message)
  //     return res.redirect('/checkout')
  //   }
  //   req.flash('error',err.message)
    order = new Order();
    console.log(req.user);
    order.name = req.body.name;
    order.user = req.user;
    order.cart = req.session.cart;
    order.postalCode = req.body.postalCode;
    order.address = req.body.address;
    order.save(function(err,order){
      if(err){
        console.log(err);
        req.flash('error',"Order Cannot Be Placed")
        res.redirect('/')
      }else{
        console.log(order);
        req.session.cart = null;
        req.flash('success',"Your Order Has Been Placed")
        res.redirect('/')

      }
    })


})
router.use('/',function notLoggedIn(req,res,next){
  if(!req.isAuthenticated()){
    return next()
  }res.redirect('/')
})




router.get('/signup',function(req,res,next){
  var messages = req.flash('error')
  res.render("user/signup",{csrfToken:req.csrfToken(),messages:messages})
})
router.post('/signup',passport.authenticate('local.signup',{
  successRedirect : '/user/profile',
  failureRedirect: '/user/signup',
  failureFlash:true
}))

router.get('/signin',function(req,res){
  var messages = req.flash('error')
  res.render("user/signin",{csrfToken:req.csrfToken(),messages:messages})
})

router.post('/signin',passport.authenticate('local.signin',{
  successRedirect: '/user/profile',
  failureRedirect: '/user/signin',
  failureFlash: true
}))

function isLoggedIn(req,res,next){
  if(req.isAuthenticated()){
    return next()
  }
  req.flash('error',"You Need To Sign In")
  res.redirect('/user/signin')
}

router.get('/google', passport.authenticate('google',{
    scope : ['profile']
}));
router.get('/google/redirect',passport.authenticate('google'), (req, res)=>{
    res.redirect('/user/profile');
});



module.exports = router;
