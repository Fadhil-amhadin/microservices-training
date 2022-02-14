import { verifyToken } from "../helpers/jwt";
import { Request, Response, NextFunction } from "express";

const authentication = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { signature } = req.headers;

        if(!signature || signature !== 'shoppingmallxyz'){
            res.status(403).send('Unauthorized')
        }
        next()
    } catch (error) {
        next(error)
    }
}

export default authentication;