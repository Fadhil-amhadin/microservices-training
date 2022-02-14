import { verifyToken } from "../helpers/jwt";
import { Request, Response, NextFunction } from "express"

const authorization = async ( req: Request, res: Response, next: NextFunction) => {
    try {
        const { access_token } = req.headers
        if(!access_token){
            res.status(403).send("Unauthorized")
        }

        
        const user = verifyToken(access_token)
        const id = user.id

        req.body = {
            ...req.body,
            id
        }
        next()
    } catch (error) {
        next(error)
    }
}

export default authorization