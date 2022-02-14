"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.decrypt = exports.encrypt = void 0;
const crytpojs = require('crypto-js');
const encrypt = (password, CRYPTOSECRET) => {
    return crytpojs.AES.encrypt(password, CRYPTOSECRET).toString();
};
exports.encrypt = encrypt;
const decrypt = (password, CRYPTOSECRET) => {
    return crytpojs.AES.encrypt(password, CRYPTOSECRET).toString(crytpojs.enc.Utf8);
};
exports.decrypt = decrypt;
