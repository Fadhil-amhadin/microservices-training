"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const morgan_1 = __importDefault(require("morgan"));
const fs_1 = __importDefault(require("fs"));
morgan_1.default.token('body', (req) => JSON.stringify(req.body));
const accessLogStream = fs_1.default.createWriteStream('./logging/app.log', { flags: 'a' });
const httpLogger = (0, morgan_1.default)('[:date] :method :url status::status :body', { stream: accessLogStream });
exports.default = httpLogger;
