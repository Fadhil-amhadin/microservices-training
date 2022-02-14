"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}
const express_1 = __importDefault(require("express"));
const index_1 = __importDefault(require("./routes/index"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
app.use(express_1.default.json());
app.get('/', (req, res) => {
    res.status(200).json({
        status: "success"
    });
});
app.use('/', index_1.default);
app.use('/uploads', express_1.default.static('uploads'));
app.listen(PORT, () => console.log(`server running on port: ${PORT}`));
