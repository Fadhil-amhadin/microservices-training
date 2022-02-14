"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.comparePassword = exports.hashPassword = void 0;
const bcryptjs = require('bcryptjs');
const salt = Number(process.env.GEN_SALT_SYNC);
const hashPassword = (password) => {
    return bcryptjs.hashSync(password, salt);
};
exports.hashPassword = hashPassword;
const comparePassword = (password, hash) => {
    return bcryptjs.compareSync(password, hash);
};
exports.comparePassword = comparePassword;
