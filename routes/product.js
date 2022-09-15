const router = require("express").Router();
const Product = require("../models/Product");
const { verifyTokenAndAdmin } = require("./verifyToken");

router.get("/", async (req, res, next) => {
    const products = await Product.find();
    
    if (!products) {
        res.status(404).json("No products");
    }

    res.status(200).json(products);
})

router.post("/", verifyTokenAndAdmin, async (req, res) => {
    if (!req.body.title || !req.body.img || !req.body.price || !req.body.quantity || !req.body.description || !req.body.category) {
        res.status(400).json("Input all required fields")
    }
    else {

        const product = new Product({
            title: req.body.title,
            img: req.body.img,
            price: req.body.price,
            quantity: req.body.quantity, 
            description: req.body.description,
            category: req.body.category
        })
        try {
            const savedProduct  = await product.save();
            res.status(200).json({
                status: "success",
                message: "product added successfuly",
                data: {savedProduct}
            })
        } 
        catch (err) {
            console.log(err);
            res.status(500).send(err)
        }
    }
})

router.get("/:id", async (req, res, next) => {
    const id = req.params.id;
    try {

        const product = await Product.findOne({_id : id});
        if (!product) {
            res.status(404).json("Product does not exist");
        }
        else {
            res.status(200).json(product);
        }
    }
    catch (err) {
        res.status(500).json(err);
    }

})

module.exports = router;