import { Response, Request, NextFunction } from "express"
import { comparePassword, hashPassword } from "../helpers/bcrypt";
import { signToken } from "../helpers/jwt";
import errorHandler from "../middlewares/errorHandler";
import query from "../db/db"
import joi from "joi"
export default class userController {
    static async register (req: Request, res: Response, next: NextFunction) {
        try {
            const schema = joi.object({
                name: joi.string().min(3).required(),
                email: joi.string().email().min(5).required(),
                phoneNo: joi.string().min(9).required(),
                nationalId: joi.string().min(16).required(),
                password: joi.string().pattern(new RegExp('^[a-zA-Z0-9]{8,}$')).required()
            })

            const {error} = schema.validate(req.body)
            if (error) {
                throw { message: error.details[0].message }
            }
            let { name, email, phoneNo, nationalId, password } = req.body
            password = hashPassword(password)

            await query(`INSERT INTO "Users" ("name", "email", "phoneNo", "nationalId", "password") VALUES ('${name}', '${email}', '${phoneNo}','${nationalId}', '${password}');`)
            res.status(200).json({
                payload: [],
                errors: [],
                success: true
            })
        } catch (error) {
            errorHandler(error, req, res, next)
        }
    }

    static async login ( req: Request, res: Response, next: NextFunction) {
        try {
            const { email, password } = req.body
            const foundUser = await query(`SELECT * FROM "Users" WHERE email = '${email}';`)
            if (!foundUser.rows[0]) {
                throw {name: 'EmailNotRegistered'}
            }
            //check password
            const foundUserData = foundUser.rows[0]
            if (!comparePassword(password, foundUserData.password)) {
                throw {name: 'CredentialInvalid'}
            }

            const userLogin = {
                id: foundUserData.id,
                email: foundUserData.email
            }
            const token = signToken(userLogin)

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
            })
        } catch (error) {
            errorHandler(error, req, res, next)
        }
    }

    static async patchUser (req: Request, res: Response, next: NextFunction) {
        try {
            let { id, name, email, phoneNo, password } = req.body

            let container: any = {}
            if (name) container.name = name
            if (email) container.email = email
            if (phoneNo) container.phoneNo = phoneNo
            if (password) container.password = password

            const foundUser = await query(`SELECT * FROM "Users" WHERE "id" = 2;`)

            if (!foundUser.rows[0]) {
                throw {name: 'UserNotFound'}
            }
            !container.name ? foundUser.rows[0].name : container.name
            !container.email ? foundUser.rows[0].email : container.email
            !container.phoneNo ? foundUser.rows[0].phoneNo: container.phoneNo
            !container.password ? foundUser.rows[0].password : container.password

            let data: string[] = [
                `"name" = '${container.name}' `,
                `"email" = '${container.email}' `,
                `"phoneNo" = '${container.phoneNo}' `,
                `"password" = '${container.password}' `
            ]

            await query(`UPDATE "Users" SET ${data}  WHERE "id" = '${id}';`)
            const patchUser = await query(`SELECT * FROM "Users" WHERE "id" = '${id}';`)
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
            })

        } catch (error) {
            errorHandler(error, req, res, next)
        }
    }

    static async deleteUser (req: Request, res: Response, next: NextFunction) {
        try {
            let { id } = req.body

            await query(`DELETE FROM "Users" WHERE id = ${id};`)

            res.status(200).json({
                payload: [],
                errors: [],
                success: true
            })
        } catch (error) {
            errorHandler(error, req, res, next)
        }
    }
}
