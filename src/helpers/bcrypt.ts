const bcryptjs = require('bcryptjs')

const salt = Number(process.env.GEN_SALT_SYNC)

const hashPassword = (password: String) => {
    return bcryptjs.hashSync(password, salt)
}

const comparePassword = (password: String, hash: String) => {
    return bcryptjs.compareSync(password, hash)
}

export {
    hashPassword,
    comparePassword
}