var express = require('express');
var router = express.Router();
var Product = require('../models/product')
/* GET home page. */
var Cart = require('../models/cart')
router.get('/more-info/:id',function(req,res){
  Product.findById(req.params.id,function(err,product){
    if(err){
      console.log(err);
      res.redirect("back")
    }else{
      var thumb = new Buffer(product.img.data).toString('base64');
      product.image = "data:image/jpeg;base64,"+thumb;
      req.session.history.push(product.category);
      res.render('info',{product:product})
    }
  })
});
router.get('/cart',function(req,res){
  if(!req.session.cart){
    return res.render('cart',{product:null})
  }
  error = req.flash('error')[0]
  success = req.flash('success')[0]
  var cart = new Cart(req.session.cart)
  allProducts = cart.genArray();
  allProducts.forEach((product)=>{
    var thumb = new Buffer(product.item.img.data).toString('base64');
    product.image = "data:image/jpeg;base64,"+thumb;
  });
  res.render('cart',{products:allProducts,totalPrice:cart.totalPrice,totalQty:cart.totalQty,mess:error,success:success})
});
router.get('/', function(req, res) {
  // var lim = 3;
  if (req.query.data){
      var lim = req.query.data;
      console.log(req.query.data);
      Product.aggregate([
          {
              $match:{}
          },
          {
              $project:{
                  discountedPrice:1,
                  img:1,
                  title:1,
                  available:1,
                  createdAt:1
              }
          },
          {
              $sort :{
                  createdAt:-1
              }
          },
          // {
          //     $skip: lim-3
          // },
          // {
          //     $limit:3
          // }

      ]).exec((err,products)=>{
          if(err){
              console.log("no product");
          }else{
              var thumbs = [];
              products.forEach((product)=>{
                  var thumb = new Buffer(product.img.data.buffer).toString('base64');
                  product.image = "data:image/jpeg;base64,"+thumb;
              });
              res.send({products:products});
          }
      })
  } else {
      if (!req.session.history){
          req.session.history = [];
      }
      msg = req.flash('success')[0]
      msge = req.flash('error')[0]
      Product.aggregate([
          {
              $match:{}
          },
          {
              $project:{
                  discountedPrice:1,
                  img:1,
                  title:1,
                  available:1,
                  createdAt:1
              }
          },
          {
              $sort :{
                  createdAt:-1
              }
          },
          // {
          //     $limit:3
          // }
      ]).exec((err,products)=>{
          if(err){
              console.log("no product");
          }else{
              var thumbs = [];
              products.forEach((product)=>{
                  var thumb = new Buffer(product.img.data.buffer).toString('base64');
                  product.image = "data:image/jpeg;base64,"+thumb;
              });
              if (req.session.history != []){
                  var recomendType = req.session.history[req.session.history.length - 1];
                  Product.aggregate([
                      {
                          $match:{category:recomendType}
                      },
                      {
                          $project:{
                              discountedPrice:1,
                              img:1,
                              title:1,
                              available:1,
                              createdAt:1
                          }
                      },
                      {
                          $sort :{
                              createdAt:-1
                          }
                      },
                      // {
                      //     $limit:3
                      // }
                  ]).exec((err,recommended)=>{
                      if (!err){
                          recommended.forEach((product)=>{
                              var thumb = new Buffer(product.img.data.buffer).toString('base64');
                              product.image = "data:image/jpeg;base64,"+thumb;
                          });
                          res.render('index', { title: 'shopKart',products:products,images:thumbs,success:msg,error:msge,recommended:recommended});
                      }
                  });
              } else {
                  res.render('index', { title: 'shopKart',products:products,images:thumbs,success:msg,error:msge});
              }
          }
      })
  }

});

router.get('/change/:id',function(req,res){
  if(req.query.change < 0){
    req.flash('error',"Value Cannot Be Negetive")
    res.redirect('/cart')
  }else{
    cart = new Cart(req.session.cart);
    cart.change(req.params.id,req.query.change);
    req.session.cart = cart;
    res.redirect('/cart')
  }
});
router.get('/delete/:id',function(req,res){
  cart = new Cart(req.session.cart);
  cart.remove(req.params.id)
  req.session.cart = cart;
  req.flash('success',"Item Remove Successfully From The Cart")
  res.redirect('/cart')
})

router.get('/add-to-cart/:id',function(req,res){
  var cart = new Cart(req.session.cart?req.session.cart:{items:{},totalQty:0,totalPrice:0})

  Product.findById(req.params.id,function(err,product){
    if(err){
      return res.redirect('/')
    }else{
      cart.add(product,product._id)
      req.session.cart = cart;
      console.log(req.session.cart);
      res.redirect('/')
    }
  })
})

module.exports = router;
