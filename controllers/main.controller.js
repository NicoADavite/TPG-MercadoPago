const {index,one} = require('../models/product.model');

module.exports ={
    index: (req,res) => res.render('home',{
        products:index(),
        styles:['home']
    }),
    // Step 3
    addCart: (req,res) => {
        // Find Product in DB
        // let product = ???
        let product = one(req.body.id);
        // Check product exist in cart
        if(req.session.cart.find( item => item.id == product.id)){
            req.session.cart = req.session.cart.map( item => {
                if(item.id == product.id){
                    item.quantity = item.quantity + 1;
                }
                return item;
            })
        } else {
            req.session.cart.push({...product, quantity: 1})
        }

        return res.redirect("/")
        // Case 1: Exist and update quantity
        // Case 2: Add cart and set quantity
        // return res.send("Add a new product")
    },
    // Step 5
    updateCart: (req,res) => {
        // Check quantity
        if(req.body.quantity <= 0){
            req.session.cart = req.session.cart.filter( item => item.id != req.body.id);
        } else {
            req.session.cart = req.session.cart.map( item => {
                if(item.id == req.body.id){
                    item.quantity = req.body.quantity;
                }
                return item;
            })
        }
        // Case 1: Is equal to zero then remove product
        // Case 2: Update all cart items setting quantity in product selected
        // return res.send("Update quantity")
        return res.redirect("/");
    }, 
    // Step 6
    removeCart: (req,res) =>{
        if(req.body.quantity <= 0){
            req.session.cart = req.session.cart.filter( item => item.id != req.body.id);
        } else {
            req.session.cart = req.session.cart.map( item => {
                if(item.id == req.body.id){
                    item.quantity = req.body.quantity;
                }
                return item;
            })
        }
        return res.redirect("/");
        // return res.send("Remove a product from the cart")
    }
}