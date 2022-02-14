"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// var morgan = require('morgan');
// import morgan from 'morgan'
const httpLogger_1 = __importDefault(require("../middlewares/httpLogger"));
const userController_1 = __importDefault(require("../controllers/userController"));
const authentication_1 = __importDefault(require("../middlewares/authentication"));
const authorization_1 = __importDefault(require("../middlewares/authorization"));
// import uploadFile from '../middlewares/uploadFile';
const userRouter = express_1.default.Router();
userRouter.use(authentication_1.default);
userRouter.use(httpLogger_1.default);
// userRouter.use(morgan(':method :url :status :res[content-length] - :response-time ms'))
// userRouter.get("/loginCheck/:id", authorization, UserController.loginCheck)
userRouter.post("/login", userController_1.default.login);
userRouter.post("/signup", userController_1.default.register);
userRouter.patch("/patchUser", authorization_1.default, userController_1.default.patchUser);
userRouter.delete("/deleteUser", authorization_1.default, userController_1.default.deleteUser);
// userRouter.patch("/patchUser", uploadFile('image'), authorization, UserController.patchUser)
// userRouter.get('/getFavourites', FavouritesController.getFavourites);
// userRouter.post('/clicksFavourites', FavouritesController.addFavourites);
// userRouter.delete('/deleteFavourites/:id', FavouritesController.deleteFavourites);
exports.default = userRouter;
