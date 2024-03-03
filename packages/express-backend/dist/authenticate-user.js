"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require("jsonwebtoken");
function authenticateUser(req, res, next) {
    const authHeader = req.headers["authorization"];
    // Getting the 2nd part of the auth header (the token)
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) {
        res.status(401).end();
    }
    else {
        jwt.verify(token, process.env.TOKEN_SECRET, (error, decoded) => {
            if (decoded) {
                next();
            }
            else {
                res.status(401).end();
            }
        });
    }
}
