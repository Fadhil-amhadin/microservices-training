import { Request, Response, NextFunction } from 'express'
const multer = require('multer')

const uploadFile = (imageFile: any) => {
    let theFileName;
    const storage = multer.diskStorage({
        destination: function (req: Request, file: any, cb: any) {
            cb(null, "uploads")
        },
        filename: function (req: Request, file: any, cb: any) {
            cb (null, Date.now() + "-" + file.originalname.replace(/\s/g, ""))
            
            theFileName = Date.now() + "-" + file.originalname.replace(/\s/g, "")
            req.body = {
                ...req.body,
                theFileName
            }
        }
    })

    const fileFilter = (req: Request, file: any, cb: any) => {
        if (file.fieldname === imageFile){
            if (!file.originalname.match(/\.(jpg|JPG|JPEG|jpeg|png|PNG|svg)$/)){
                return cb(new Error('Only image files are allowed'), false)
            }
            cb(null, true)
        }
    }
    const sizeInMB = 10
    const maxSize = sizeInMB * 1024 * 1024

    const upload = multer({
        storage,
        fileFilter,
        limits: {
            fileSize: maxSize
        }
    }).fields([
        {
            name: imageFile,
            maxCount: 1
        }
    ])
    return (req: Request, res: Response, next: NextFunction) => {
        upload (req, res, function(err: any) {
            if (err){
                if(err.code === 'LIMIT_FILE_SIZE'){
                    return res.status(400).send({
                        message: "maximum file size is 10 MB"
                    })
                }
                return res.status(400).send(err)
            }
            return next()
        })
    }
}

export default uploadFile