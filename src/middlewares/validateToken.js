import jwt, { decode } from "jsonwebtoken";
import dotenv from 'dotenv'
dotenv.config();

const TOKEN_SECRET = process.env.TOKEN_SECRET;

export const authRequired = (req, res, next) => {
    const { token } = req.cookies;
    if (!token) {
        res.status(401)
        res.json({
            message: "No existen token, acceso denegado"
        })
    }
    jwt.verify(token, TOKEN_SECRET, (err, user) => {
        if (err) {
            res.status(403)
            res.json({
                message: "Token invalido"
            })
            return res
        }
        req.user=user
        next();
    })
}
