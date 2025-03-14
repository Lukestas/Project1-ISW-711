import Parent from '../models/ParentModel.js';
import bcrypt from 'bcryptjs';
import { createAccessToken } from '../libs/jwt.js';

export const registerParent = async (req, res) => {

    const { email, password, repeatPassword, phone, pin, firstName, lastName, country, birthDate } = req.body;

    try {

        if (!email || !password || !repeatPassword || !phone || !pin || !firstName || !lastName || !birthDate) {
            return res.status(400).json({ message: "Todos los campos marcados con * son obligatorios" });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(!email)) {
            return res.status(400).json({ message: "Correo electronico invalido" })
        }

        if (password !== repeatPassword) {
            return res.status(400).json({ message: "Las contraseñas no coinciden" })
        }

        if (pin.length !== 6 || isNaN(pin)) {
            return res.status(400).json({ message: "El pin debe ser exactamente de 6 digitos numericos" })
        }

        const emailExist = await Parent.findOne({ email })
        if (emailExist) {
            return res.status(400).json({ message: "El correo electronico ingresado ya se encuentra registrado" })
        }

        const age = moment().diff(moment(birthDate))
        if (age <= 18) {
            return res.status(400).json({ message: "Debe ser mayor de edad para registrarse" })
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const newParent = new Parent({
            email,
            password: hashedPassword,
            phone,
            pin,
            firstName,
            lastName,
            country,
            birthDate
        });

        const ParentSaved = await newParent.save()

        const token = await createAccessToken({ id: ParentSaved._id })
        res.status(200);
        res.cookie("token", token);
        res.json(ParentSaved)
    } catch (error) {
        console.log(error);
    }
}

export const login = async (req, res) => {

    const { email, password } = req.body;

    try {

        const ParentFound = await Parent.findOne({ email });
        if (!ParentFound) {
            res.status(400)
            res.json({
                message: "El padre no se encontro en la base de datos"
            })
            return res;
        }

        const isMatch = await bcrypt.compare(password, ParentFound.password);
        if (!isMatch) {
            res.status(400)
            res.json({
                message: "Contraseña incorrecta"
            })
        }

        const token = await createAccessToken({ id: ParentFound._id })
        res.cookie("token", token)
        res.json("Bienvenido " + ParentFound.firstName + " " + ParentFound.lastName)
    } catch (error) {
        res.status(500)
        res.json({
            message: error.message
        })
    }
}

export const logout = (req, res) => {
    res.cookie("token", "", {
        expires: new Date(0)
    })
    return res.sendStatus(200)
}

export const profile = async (req, res) => {
    const ParentFound = await Parent.findById(req.user.id)

    if (!ParentFound) {
        return res.status(400).json({
            message: "Padre no encontrado"
        })
    }
    return res.json({
        id: ParentFound._id,
        name: ParentFound.firstName + " " + ParentFound.lastName,
        email: ParentFound.email
    })
}
