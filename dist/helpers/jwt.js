"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.signToken = void 0;
const jwt = require('jsonwebtoken');
const JWTSECRET = process.env.JWT_SECRET;
const signToken = (payload) => {
    return jwt.sign(payload, JWTSECRET);
};
exports.signToken = signToken;
const verifyToken = (token) => {
    return jwt.verify(token, JWTSECRET);
};
exports.verifyToken = verifyToken;
