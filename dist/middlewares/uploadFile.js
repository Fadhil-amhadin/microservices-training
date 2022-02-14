"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const multer = require('multer');
const uploadFile = (imageFile) => {
    let theFileName;
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, "uploads");
        },
        filename: function (req, file, cb) {
            cb(null, Date.now() + "-" + file.originalname.replace(/\s/g, ""));
            theFileName = Date.now() + "-" + file.originalname.replace(/\s/g, "");
            req.body = Object.assign(Object.assign({}, req.body), { theFileName });
        }
    });
    const fileFilter = (req, file, cb) => {
        if (file.fieldname === imageFile) {
            if (!file.originalname.match(/\.(jpg|JPG|JPEG|jpeg|png|PNG|svg)$/)) {
                return cb(new Error('Only image files are allowed'), false);
            }
            cb(null, true);
        }
    };
    const sizeInMB = 10;
    const maxSize = sizeInMB * 1024 * 1024;
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
    ]);
    return (req, res, next) => {
        upload(req, res, function (err) {
            if (err) {
                if (err.code === 'LIMIT_FILE_SIZE') {
                    return res.status(400).send({
                        message: "maximum file size is 10 MB"
                    });
                }
                return res.status(400).send(err);
            }
            return next();
        });
    };
};
exports.default = uploadFile;
