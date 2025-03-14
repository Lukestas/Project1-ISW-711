import Child from '../models/ChildModel.js'
import Parent from '../models/ParentModel.js'

export const registerChild = async (req, res) => {
    const { name, pin, avatar } = req.body;

    if (!name) {
        return res.status(400).json({ message: "Se requiere el nombre del infante" })
    }
    if (pin.length !== 6 || isNaN(pin)) {
        return res.status(400).json({ message: "se requiere un pin de 6 digitos numericos para el infante" })
    }

    const ParentFound = await Parent.findById(req.user.id)

    const newChild = new Child({
        name, 
        pin, 
        avatar: "Aun por definir",
        parent: ParentFound._id
    })
    
    const ChildSaved = await newChild.save();
    res.status(200);
    res.json(ChildSaved)
}
