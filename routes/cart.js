const router = require("express").Router();
const Cart = require("../models/Cart");
const { verifyTokenAndAdmin, verifyTokenAndAuthorise } = require("./verifyToken");


// router.post("/:id", async (req, res, next) => {
//     console.log("ennik")
//     const id = req.params.id;
//     const product_id = req.body.product_id;
//     const price = req.body.price;
//     try {
//         const cart = await Cart.findOne({_id : id});
//         if (!cart) {
//             const cart = new Cart(
//                {
//                 user_id: id,
//                 product_ids: [product_id],
//                 total: price
//                }
//             ); 
        
//             const savedCart = await cart.save();
//             res.status(200).json(cart);
//         } else {
//             Cart.findByIdAndUpdate({_id: cart._id}, {
//                     product_ids: [...cart.product_ids, product_id],
//                     total: cart.price + price
//                })
//         }
//     }
//     catch (err) {
//         res.status(500).json(err);
//     }
// })

router.post("/", verifyTokenAndAuthorise, async (req, res) => {
    const cart = new Cart(req.body);
    try {
        // const cart = await Cart.findOne({ user_id: req.params.user_id });
        const savedCart = await cart.save();
        res.status(200).json(savedCart);
    }
    catch (err) {
        res.status(500).json(err)
    }
})

router.put("/:user_id", verifyTokenAndAuthorise, async (req, res) => {
    try {
        const updatedCart = await Cart.findOneAndUpdate({ user_id: req.params.user_id }, {$et: req.body});
        res.status(200).json(updatedCart);
    }
    catch (err) {
        res.status(500).json(err)
    }
})

router.delete("/:user_id", verifyTokenAndAuthorise, async (req, res) => {
    try {
        const deletedCart = await Cart.findOneAndDelete({ user_id: req.params.user_id });
        res.status(200).json(deletedCart);
    }
    catch (err) {
        res.status(500).json(err)
    }
})



router.get("/:user_id", verifyTokenAndAuthorise, async (req, res) => {
    const user_id = req.params.user_id;
    try{
        const cart = await Cart.findOne({user_id : user_id});
        
        if (!cart) {
            res.status(200).json({
                status: "success",
                message: "Your Cart is empty"
            });
        }
    
        res.status(200).json({
            status: "success",
            message: "Cart Found",
            data: cart
        });
    }
    catch (err) {
        res.status(500).json(err);
    }
})

router.get("/", verifyTokenAndAdmin, async (req, res) => {
    try{
        const cart = await Cart.find();
        
        if (!cart) {
            res.status(200).json({
                status: "success",
                message: "No Cart"
            });
        }
    
        res.status(200).json({
            status: "success",
            message: "Gotten",
            data: cart
        });
    }
    catch (err) {
        res.status(500).json(err);
    }
})

module.exports = router;










// router.post("/:id", async (req, res, next) => {
//     console.log("ennik")
//     const id = req.params.id;
//     const product_id = req.body.product_id;
//     const price = req.body.price;
//     try {
//         const cart = await Cart.findOne({_id : id});
//         if (!cart) {
//             const cart = new Cart(
//                {
//                 user_id: id,
//                 product_ids: [product_id],
//                 total: price
//                }
//             ); 
        
//             const savedCart = await cart.save();
//             res.status(200).json(cart);
//         } else {
//             Cart.findByIdAndUpdate({_id: cart._id}, {
//                     product_ids: [...cart.product_ids, product_id],
//                     total: cart.price + price
//                })
//         }
//     }
//     catch (err) {
//         res.status(500).json(err);
//     }
// })