import express from 'express';
import httpLogger from '../middlewares/httpLogger';
import UserController from '../controllers/userController';
import authentication from '../middlewares/authentication';
import authorization from '../middlewares/authorization';


const userRouter = express.Router();
userRouter.use(authentication)
userRouter.use(httpLogger)

userRouter.post("/login", UserController.login)
userRouter.post("/signup", UserController.register)
userRouter.patch("/patchUser", authorization, UserController.patchUser)
userRouter.delete("/deleteUser", authorization, UserController.deleteUser)

export default userRouter

