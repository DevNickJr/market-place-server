const router = require("express").Router()
const res = require("express/lib/response");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const { verifyTokenAndAuthorise, verifyTokenAndAdmin } = require("./verifyToken");


router.put("/:id", verifyTokenAndAuthorise, async (req, res) => {
    if (req.body.password) {
        req.body.password = await bcrypt.hash(req.body.password, 10);
    }
    if (req.body.isAdmin) {
        req.body.isAdmin = false
    }
    try {
        const user = await User.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, { new: true });
        if (!user) {
            res.status(404).json("User Not found")
        } 
        else {
            const {password, ...data} = user._doc;
            res.status(200).json(data);
        }
    }
    catch (err) {
        res.status(500).json(err);  
    }
})

router.get("/", verifyTokenAndAdmin, async (req, res) => {
    try {
        const users = await User.find().lean();
        if (!users) {
            res.status(404).json("No users found");
        }
        else {
            const {password, ...data} = users;
            res.status(200).json(data)
        }
    }
    catch (err) {
        res.status(500).json(err);
    }
})
router.get("/:id", verifyTokenAndAuthorise, async (req, res) => {
    try {
        const user = await User.findById(req.params.id).lean();
        if (!user) {
            res.status(404).json("User does not exist");
        }
        else {
            const {password, ...data} = user;
            res.status(200).json(data);
        }
    }
    catch (err) {
        res.status(500).json(err);
    }
})

router.delete("/:id", verifyTokenAndAuthorise, async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            res.status(404).json("User does not exist, delete failed")
        }
        else {
            const {password, ...data} = user;
            res.status(200).json({
                status: "success",
                message: "User Deleted Successfully",
                data: data
            });
        }
    }
    catch (err) {
        res.status(500).json(err);
    }
})

module.exports = router;