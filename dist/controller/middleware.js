"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const jwt = require("jsonwebtoken");
const auth = (req, res, next) => {
    const token = req.header("auth-token");
    if (!token)
        return res.status(401).json({ message: "Please, Go To Register Page" });
    try {
        const varifield = jwt.verify(token, `${process.env.JWT_SECRET_KEY}`);
        req.user = varifield;
        next();
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
};
exports.auth = auth;
