"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const randomNumberGenerator = () => {
    return Math.floor(Math.random() * 899999 + 100000).toString();
};
exports.default = randomNumberGenerator;
