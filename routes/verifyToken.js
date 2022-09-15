const jwt = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {
    const token = req.headers.token ? req.headers.token.split(" "): "";
    if (token) {
        try {
            const decodedToken = await jwt.verify(token[1], process.env.JWT_SEC);
            req.user = decodedToken;
            next();
        } catch (error) {
            return res.status(401).json(error);
        }
    } else {
        res.status(401).json("You're not Authenticated")
    }
}

const verifyTokenAndAuthorise = async (req, res, next) => {
    verifyToken(req, res, () => {
        try {
            if (req.user.isAdmin || req.user._id === req.params.id ) {
                next();
            }
            else {
                return res.status(403).json("You're not Authorised to perform this action");
            }
        }
        catch (err) {
            res.status(500).json(err);
        }
    });
}

const verifyTokenAndAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        try {
            if (req.user.isAdmin) {
                next();
            }
            else {
                return res.status(403).json("Only Admin can perform this action");
            }
        }
        catch (err) {
            return res.status(500).json(err);
        }
    })
}

module.exports = {
    verifyToken,
    verifyTokenAndAuthorise,
    verifyTokenAndAdmin
}