import { Request } from 'express'
import morgan from 'morgan'
import fs from 'fs'

morgan.token('body', (req: Request) => JSON.stringify(req.body));
const accessLogStream = fs.createWriteStream('./logging/app.log', { flags: 'a' })
const httpLogger = morgan('[:date] :method :url status::status :body', { stream: accessLogStream})

export default httpLogger