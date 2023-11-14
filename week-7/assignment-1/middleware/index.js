"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jwt = require("jsonwebtoken");
var SECRET = 'SECr3t';
var authenticateJwt = function (req, res, next) {
    var authHeader = req.headers.authorization;
    if (authHeader) {
        var token = authHeader.split(' ')[1];
        jwt.verify(token, SECRET, function (err, user) {
            if (err) {
                return res.sendStatus(403);
            }
            req.userId = user.id;
            next();
        });
    }
    else {
        res.sendStatus(401);
    }
};
exports.default = { authenticateJwt: authenticateJwt, SECRET: SECRET };
