const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema({
    title: {
        type:String, 
        required: true,
    },
    img: {
        type: String, 
        required: true,
    },
    price: {
        type:Number, 
        required: true
    },
    quantity: {
        type:Number, 
        required: true,
    },
    description: {
        type:String, 
        required: true,
    },
    category: {
        type:String, 
        required: true,
    },
    // color: {
    //     type:Array, 
    //     required: true,
    // },
    // size: {
    //     type:Array,
    //     required: true,
    // },
}, {timestamps: true});

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;