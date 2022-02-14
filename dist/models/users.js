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
const db_1 = __importDefault(require("../db/db"));
const logger_1 = __importDefault(require("../helpers/logger"));
const userTable = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, db_1.default)(`CREATE TABLE IF NOT EXISTS "Users" (id SERIAL PRIMARY KEY, email VARCHAR(255), name VARCHAR(255), "phoneNo" VARCHAR(255), "nationalId" VARCHAR(255), password VARCHAR(255));`);
        logger_1.default.info("table created");
        next();
    }
    catch (error) {
        logger_1.default.error(error);
        next();
    }
});
exports.default = userTable;
