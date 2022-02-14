if (process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
}

import express, { Request, Response} from 'express';
import routes from './routes/index';

const app = express()
const PORT = process.env.PORT || 5000
app.use(express.json())

app.get('/', (req: Request, res: Response) => {
    res.status(200).json({
        status: "success"
    })
})

app.use('/', routes)
app.use('/uploads', express.static('uploads'))

app.listen(PORT, () => console.log(`server running on port: ${PORT}`))