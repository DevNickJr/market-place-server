const mongoose = require("mongoose");

const CartSchema = mongoose.Schema({
    user_id: {
        type: String,
        required: true,
        unique: true,
    },
    product_ids: {
        type:Array, 
        required: true,
    },
    total: {
        type:Number, 
        required: true
    },
}, {timestamps: true});

const Cart = mongoose.model("Cart", CartSchema);

module.exports = Cart;