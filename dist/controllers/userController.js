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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = require("../helpers/bcrypt");
const jwt_1 = require("../helpers/jwt");
const logger_1 = __importDefault(require("../helpers/logger"));
const db_1 = __importDefault(require("../db/db"));
class userController {
    static register(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { name, email, phoneNo, nationalId, password } = req.body;
                password = (0, bcrypt_1.hashPassword)(password);
                yield (0, db_1.default)(`INSERT INTO "Users" ("name", "email", "phoneNo", "nationalId", "password") VALUES ('${name}', '${email}', '${phoneNo}','${nationalId}', '${password}');`);
                res.status(200).json({
                    payload: [],
                    errors: [],
                    success: true
                });
            }
            catch (error) {
                logger_1.default.error(error);
                next();
            }
        });
    }
    static login(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                const foundUser = yield (0, db_1.default)(`SELECT * FROM "Users" WHERE email = '${email}';`);
                if (!foundUser.rows[0]) {
                    logger_1.default.error('email not registered');
                    res.status(400).json({ errors: "email not registered" });
                }
                //check password
                const foundUserData = foundUser.rows[0];
                if (!(0, bcrypt_1.comparePassword)(password, foundUserData.password)) {
                    logger_1.default.error('credential is invalid');
                    res.status(403).json({ errors: "credentials is invalid" });
                }
                const userLogin = {
                    id: foundUserData.id,
                    email: foundUserData.email
                };
                const token = (0, jwt_1.signToken)(userLogin);
                res.status(200).json({
                    payload: [
                        {
                            token: {
                                accessToken: token
                            },
                            userInfo: {
                                personalInfo: {
                                    email: foundUserData.email,
                                    phoneNo: foundUserData.phoneNo,
                                    name: foundUserData.name
                                }
                            }
                        }
                    ],
                    errors: [],
                    success: true
                });
            }
            catch (error) {
                logger_1.default.error(error);
                next();
            }
        });
    }
    static patchUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { id, name, email, phoneNo, password } = req.body;
                const foundUser = yield (0, db_1.default)(`SELECT * FROM "Users" WHERE "id" = '${id}';`);
                if (!name)
                    name = foundUser.rows[0].name;
                if (!email)
                    name = foundUser.rows[0].email;
                if (!phoneNo)
                    phoneNo = foundUser.rows[0].phoneNo;
                // if (!nationalId) name = foundUser.rows[0].nationalId
                if (!password)
                    name = foundUser.rows[0].password;
                let data = [
                    `"name" = '${foundUser.rows[0].name}' `,
                    `"email" = '${foundUser.rows[0].email}' `,
                    `"phoneNo" = '${foundUser.rows[0].phoneNo}' `,
                    // `"nationalId" = '${foundUser.rows[0].nationalId}' `,
                    `"password" = '${foundUser.rows[0].password}' `
                ];
                yield (0, db_1.default)(`UPDATE "Users" SET ${data}  WHERE "id" = '${id}';`);
                const patchUser = yield (0, db_1.default)(`SELECT * FROM "Users" WHERE "id" = '${id}';`);
                res.status(200).json({
                    payload: [
                        {
                            id: patchUser.rows[0].id,
                            name: patchUser.rows[0].name,
                            email: patchUser.rows[0].email,
                            phoneNo: patchUser.rows[0].phoneNo
                        }
                    ],
                    errors: [],
                    success: true
                });
            }
            catch (error) {
                logger_1.default.error(error);
                next();
            }
        });
    }
    static deleteUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { id } = req.body;
                yield (0, db_1.default)(`DELETE FROM "Users" WHERE id = ${id};`);
                res.status(200).json({
                    payload: [],
                    errors: [],
                    success: true
                });
            }
            catch (error) {
                logger_1.default.error(error);
                next();
            }
        });
    }
}
exports.default = userController;
