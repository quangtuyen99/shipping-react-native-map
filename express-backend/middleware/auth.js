const jwt = require("jsonwebtoken");
const jwtSceret = require("../config/jwtSceret");

module.exports = (req, res, next) => {
    const authHeader = req.get("Authorization");

    if (!authHeader) {
        return res.status(401).json({ error: "Missing authorization" });
    }

    try {
        const token = authHeader;
        jwt.verify(token, jwtSceret);
        next();
    } catch (error) {
        return res.status(401).json(error);
    }
}