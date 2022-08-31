const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const JWT_SEC = process.env.JWT_SEC || 5000;

router.post("/register", async (req, res) => {
    const password = await bcrypt.hash(req.body.password, 10);
    const user = new User({
        username: req.body.username,
        password: password,
        email: req.body.email
    })
    try {
        const savedUser  = await user.save();
        res.status(200).json({
            status: "success",
            message: "user registration successful",
            data: {savedUser}
        })
    } 
    catch (err) {
        console.log(err);
        // res.send(err);
        res.status(500).json("Internal server error")
    }
})

router.post("/login", async (req, res) => {
    const username = req.body.username;
    const pword = req.body.password;
    const user = await User.findOne({username: username});
    
    res.status(200).json(user);
    if (!user) {
        res.status(404).json({
            status: "failed",
            message: "user not found"
        });
    } else if (!(await bcrypt.compare(pword, user.password)) ) {
        res.status(400).json({
            status: "failed",
            message: "invalid password"
        });
    } else {
        const {password, ...data} = user._doc;
        const token = await jwt.sign(data, JWT_SEC);
        res.status(200).json({
            status: "success",
            message: "Login Success",
            token: token
        });
    }
    !user && res.status(404).json({
        status: "failed",
        message: "user not found"
    });

    // !(await bcrypt.compare(pword, user.password)) && res.status(400).json({
    //     status: "failed",
    //     message: "invalid password"
    // });

    // const {password, ...data} = user._doc;
    // const token = await jwt.sign(data, JWT_SEC);
    // res.status(200).json({
    //     status: "success",
    //     message: "Login Success",
    //     token: token
    // });
    })


module.exports = router;






















// const router = require("express").Router();
// const User = require("../models/User");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");

// router.post("regiater", async (req, res) => {
//     const { name, email, password } = req.body;
//     const hashedPassword = await bcrypt.hash(password, 10);
//     const user = new User({
//         name,
//         email,
//         password: hashedPassword
//     });
//     try {
//         const savedUser = await user.save();
//         res.send({ user: user._id });
//     } catch (error) {
//         res.status(400).send(error);
//     }
// })