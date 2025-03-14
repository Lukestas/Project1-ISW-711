import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config();

const TOKEN_SECRET=process.env.TOKEN_SECRET;

if (!TOKEN_SECRET){
    throw new Error("Falta la variable de entorno TOKEN_SECRET en el archivo .env")
}

export function createAccessToken(payload) {
    return new Promise(((resolve,reject)=>{
        jwt.sign(
            payload,
            TOKEN_SECRET,
            { expiresIn: "1d" },
            (err, token) => {
                if (err) reject(err);
                resolve(token)
            }
        );
    }))
}