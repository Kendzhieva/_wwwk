import jwt from "jsonwebtoken";

export default (id) => {
    return jwt.sign({
        _id: id
    }, 'secret3333', { expiresIn: '1d' })
}