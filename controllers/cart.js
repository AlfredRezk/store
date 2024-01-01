const Cart = require("../models/Cart")
const Product = require("../models/Product")
const User = require("../models/User")

exports.getCart = async(req, res)=>{
   

    const user = await User.findById(req.session.user._id)
    const cart = await Cart.findById(user.cart).populate('products.product').lean()

    res.render('pages/cart', {docTitle:'Cart', products: cart.products, totalPrice: cart.totalPrice.toFixed(2)})
}


exports.getDelete = async(req, res)=>{
    const user = await User.findById(req.session.user._id)
    const cart = await Cart.findById(user.cart).populate('products.product')
    const product = await Product.findById(req.params.prodId)
    console.log(req.params.prodId)
    const index = cart.products.findIndex(prod=> prod.product._id == req.params.prodId)
    cart.totalPrice = Number(cart.totalPrice) - (Number(product.price)*Number(cart.products[index].qty))
    const products = cart.products.filter(prod=> prod.product._id != req.params.prodId)

    cart.products = products;
    cart.save();
    res.redirect('/cart')

}

exports.getAdd = async(req, res)=>{
   const user = await User.findById(req.session.user._id)
   const cart = await Cart.findById(user.cart)
   const product = await Product.findById(req.params.id)
//    check if product is already in cart
   const index = cart.products.findIndex(prod=> prod.product == req.params.id)
   if(index!=-1){
    cart.products[index].qty=   cart.products[index].qty +1;
   }

else{
    cart.products.push({product: req.params.id, qty: 1})
}

    
    cart.totalPrice = Number(cart.totalPrice) + Number(product.price)
    cart.save();
    req.flash('success', 'Product added to cart')
    res.redirect('/')

}

exports.getInc = async(req, res)=>{
    const user = await User.findById(req.session.user._id)
    const cart = await Cart.findById(user.cart)
    const product = await Product.findById(req.params.prodId)
    const index = cart.products.findIndex(prod=> prod.product == req.params.prodId)
    cart.products[index].qty = cart.products[index].qty+ 1;
    cart.totalPrice = Number(cart.totalPrice) + Number(product.price)
    cart.save();
    req.flash('success', 'Product Qty increases')
    res.redirect('/cart')
}

exports.getDec = async(req, res)=>{
    const user = await User.findById(req.session.user._id)
    const cart = await Cart.findById(user.cart)
    const product = await Product.findById(req.params.prodId)
    const index = cart.products.findIndex(prod=> prod.product == req.params.prodId)
    if(cart.products[index].qty>1){
        cart.products[index].qty = cart.products[index].qty- 1;
        cart.totalPrice = Number(cart.totalPrice) - Number(product.price)
    }else{
        cart.totalPrice = Number(cart.totalPrice) -  (Number(product.price)*Number(cart.products[index].qty))
        const products = cart.products.filter(prod=> prod.product._id != req.params.prodId)
    
        cart.products = products;
    }
    
  
    cart.save();
    req.flash('success', 'Product Qty increases')
    res.redirect('/cart')

}