import { Response, Request, NextFunction } from "express"
import { comparePassword, hashPassword } from "../helpers/bcrypt";
import { signToken } from "../helpers/jwt";
import logger from "../helpers/logger";
import query from "../db/db"


export default class userController {
    static async register (req: Request, res: Response, next: NextFunction) {
        try {
            let { name, email, phoneNo, nationalId, password } = req.body
            password = hashPassword(password)

            await query(`INSERT INTO "Users" ("name", "email", "phoneNo", "nationalId", "password") VALUES ('${name}', '${email}', '${phoneNo}','${nationalId}', '${password}');`)
            res.status(200).json({
                payload: [],
                errors: [],
                success: true
            })
        } catch (error) {
            logger.error(error)
            next()
        }
    }

    static async login ( req: Request, res: Response, next: NextFunction) {
        try {
            const { email, password } = req.body
            const foundUser = await query(`SELECT * FROM "Users" WHERE email = '${email}';`)
            if (!foundUser.rows[0]) {
                logger.error('email not registered')
                res.status(400).json({errors: "email not registered"})
            }
            //check password
            const foundUserData = foundUser.rows[0]
            if (!comparePassword(password, foundUserData.password)) {
                logger.error('credential is invalid')
                res.status(403).json({errors: "credentials is invalid"})
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
            logger.error(error)
            next()
        }
    }

    static async patchUser (req: Request, res: Response, next: NextFunction) {
        try {
            let { id, name, email, phoneNo, password } = req.body

            const foundUser = await query(`SELECT * FROM "Users" WHERE "id" = '${id}';`)

            if (!name) name = foundUser.rows[0].name
            if (!email) name = foundUser.rows[0].email
            if (!phoneNo) phoneNo = foundUser.rows[0].phoneNo
            if (!password) name = foundUser.rows[0].password

            let data: string[] = [
                `"name" = '${foundUser.rows[0].name}' `,
                `"email" = '${foundUser.rows[0].email}' `,
                `"phoneNo" = '${foundUser.rows[0].phoneNo}' `,
                `"password" = '${foundUser.rows[0].password}' `
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
            logger.error(error)
            next()
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
            logger.error(error)
            next()
        }
    }
}
