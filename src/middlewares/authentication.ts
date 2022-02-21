import { verifyToken } from "../helpers/jwt";
import { Request, Response, NextFunction } from "express";

const authentication = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { signature } = req.headers;

        if(signature != 'shoppingmallxyz'){
            // res.status(403).send('Unauthorized')
            throw { name: "InvalidSignature" }
        }
        next()
    } catch (error) {
        next(error)
    }
}

export default authentication;