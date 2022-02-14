"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const jwt_1 = require("../helpers/jwt");
const authorization = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { access_token } = req.headers;
        if (!access_token) {
            res.status(403).send("Unauthorized");
        }
        const user = (0, jwt_1.verifyToken)(access_token);
        const id = user.id;
        req.body = Object.assign(Object.assign({}, req.body), { id });
        next();
    }
    catch (error) {
        next(error);
    }
});
exports.default = authorization;
