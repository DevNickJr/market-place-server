const mongoose = require("mongoose");

const OrderSchema = mongoose.Schema({
    user_id: {
        type:String, 
        required: true,
    },
    price: {
        type:Number, 
        required: true
    },
    products: {
        type:Array, 
        required: true,
    },
    txn_status: {
        type:String,
        required: true,
        enum: ["pending", "success", "failed"],
        default: "pending",  
    },

    
}, {timestamps: true});

const Order = mongoose.model("Order", OrderSchema);

module.exports = Order;