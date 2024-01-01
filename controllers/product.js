const Product = require("../models/Product");
const { validationResult } = require("express-validator");
const User = require("../models/User");
let formData = {};

exports.getAdd = (req, res) => {
  res.render("pages/products/add", { docTitle: "Add Product", ...formData });
};

exports.postAdd = async (req, res) => {
  formData = req.body;
  const err = validationResult(req);

  if (!err.isEmpty()) {
    req.flash("error", err.errors[0].msg);
    return res.redirect("/products/add");
  }

  req.body.userId = req.session.user._id;

  if (req.file) req.body.image = req.file.originalname;
  else req.body.image = undefined;

  const product = await Product.create(req.body);

  // Add the product to the user products 
  const user = await User.findById(req.session.user._id)
  user.products.push(product)
  user.save();
  req.flash("success", "Product created !");
  res.redirect("/");
};

exports.getProducts = async (req, res) => {
  const products = await Product.find({}).lean();

  res.render("pages/home", { docTitle: "Home", products });
};

exports.getProduct = async(req, res) => {
  const product= await Product.findById(req.params.id).lean()
  let owner = false
  if(product.userId.toString() == req.session.user._id)
    owner = true;
  res.render('pages/products/details', {docTitle: product.title, product , owner})
};

exports.getEdit = async(req, res) => {
  const product = await Product.findById(req.params.id).lean()
  res.render('pages/products/edit', {docTitle: 'Edit ', product})
};

exports.postEdit = async(req, res) => {
  req.body.userId = req.session.user._id;

  if (req.file) req.body.image = req.file.originalname;
  else req.body.image = undefined;

  await Product.findByIdAndUpdate(req.body.id, req.body,{new: true, runValidators:true})
  res.redirect('/')
};

exports.getDelete = async(req, res) => {
  await Product.findByIdAndDelete(req.params.id)
  req.flash("success", 'Product removed!');
  res.redirect('/')
};
