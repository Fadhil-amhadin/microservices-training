import { Request, Response, NextFunction } from 'express'
import logger from '../helpers/logger'

const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    let code = 500
    let msg: any = {
        payload: [],
        errors: [
            {
                code: "ERR1111",
                message: "Internal server error",
                type: "Server Error"
            }
        ]
    }
    if (err.name === "UserNotFound") {
		code = 404;
		msg.errors[0].code = "ERR1000";
		msg.errors[0].message = "User not found";
		msg.errors[0].type = "Not Found";
	} else if (err.name === "CredentialInvalid") {
		code = 404;
		msg.errors[0].code = "ERR1101";
		msg.errors[0].message = "Credential is Invalid";
		msg.errors[0].type = "Not Match";
	} else 	if (err.name === "EmailNotRegistered") {
		code = 404;
		msg.errors[0].code = "ERR1102";
		msg.errors[0].message = "Email Not Registered";
		msg.errors[0].type = "Not Found";
	} else if (err.message) {
		code = 400;
		msg.errors[0].code = "ERR1003";
		msg.errors[0].message = err.message;
		msg.errors[0].type = "Bad Input"
	} else if (err.name === "InvalidSignature") {
		code = 403;
		msg.errors[0].code = "ERR1004";
        msg.errors[0].message = "Signature is Invalid";
        msg.errors[0].type = "Not Match";
	} 
	if(err.name !== 'TypeError'){
		logger.error(msg.errors[0].message)
	} else if (err.message) {
		logger.error(msg.errors[0].message)
	} else {
		logger.error(err)
	}
	res.status(code).json(msg);
}

export default errorHandler