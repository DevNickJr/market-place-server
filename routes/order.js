const router = require("express").Router();
const Order = require("../models/Order");
const { verifyTokenAndAuthorise, verifyTokenAndAdmin } = require("./verifyToken");


router.post("/", verifyTokenAndAuthorise, async (req, res) => {
    const txn_status = req.body.txn_status || "pending";
    const order = new Order({
        user_id: req.body.id,
        price: req.body.price,
        products: req.body.products,
        txn_ref: req.body.txn_ref,
        txn_status: txn_status
    })
    try {
        const savedOrder  = await order.save();
        res.status(200).json({
            status: "success",
            message: `order ${txn_status}`,
            data: {savedOrder}
        })
    } 
    catch (err) {
        res.status(500).send(err)
    }
})

router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
        const updatedOrder  = await Order.findByIdAndUpdate(req.params.id, {$set: req.body}, { new: true });
        res.status(200).json({
            status: "success",
            message: `order updated successfully`,
            data: {updatedOrder}
        })
    } 
    catch (err) {
        res.status(500).send(err)
    }
})

router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
        const deleteOrder  = await Order.findByIdAndDelete(req.params.id);
        res.status(200).json({
            status: "success",
            message: `order deleted successfully`,
            data: {deleteOrder}
        })
    } 
    catch (err) {
        res.status(500).send(err)
    }
})

router.get("/", verifyTokenAndAdmin, async (req, res) => {
    try {
        const order = await Order.find();
        
        if (!order) {
            res.status(404).json("No orders");
        }
        else{
            res.status(200).json(order);
        }
    }
    catch (err) {
        res.status(500).json(err);
    }
})


router.get("/:user_id", verifyTokenAndAuthorise, async (req, res) => {
    const user_id = req.params.user_id;
    try {
        const order = await Order.find({user_id : user_id});
        
        if (!order) {
            res.status(404).json({
                status: "success",
                message: "No orders for this user"
            });
        }
        else {
            res.status(200).json({
                status: "success",
                message: "Orders data available",
                data: order
            });
        }
    }
    catch (err) {
        res.status(500).json(err);
    }
})
router.get("/find/:id", verifyTokenAndAuthorise, async (req, res) => {
    const id = req.params.id;
    const order = await Order.findOne({_id : id});
    
    if (!order) {
        res.status(404).json({
            status: "success",
            message: "Order does not exist"
        });
    }

    res.status(200).json({
        status: "success",
        message: "Order data available",
        data: order
    });
})

module.exports = router;