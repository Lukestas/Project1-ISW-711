import Child from '../models/ChildModel.js'

export const getChildrensByParentId = async (req, res) => {
  try {
    const childrens = await Child.find({ parent: req.parent.id })
    if (!childrens || childrens.length === 0) {
      return res.status(404).json(["No se encontraron niños asociados a este padre"]);
    }
    res.json(childrens);
  } catch (error) {
    const ChildSaved = await newChild.save();
    res.status(201).json({ message: 'Niño agregado correctamente', child: ChildSaved });
  }
}

export const registerChild = async (req, res) => {
  try {
    const { name, avatar, pin } = req.body;
    const parentId = req.parent.id;
    if (!name || !avatar || !pin) {
      return res.status(400).json(["Todos los campos son obligatorios"]);
    }
    const newChild = new Child({
      name,
      avatar,
      pin,
      parent: parentId
    })

    const ChildSaved = await newChild.save();
    res.status(201).json({ message: 'Niño agregado correctamente', child: ChildSaved });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error al agregar el niño', error });
  }
}

export const deleteChild = async (req, res) => {
  try {
    const childtoDelete = await Child.findByIdAndDelete(req.query.id);
    if (!childtoDelete) {
      return res.status(404).json({ message: "Niño no encontrado" });
    }
    res.json({ message: "Niño eliminado correctamente" });
  } catch (error) {
    console.error("Error al eliminar niño:", error);
    res.status(500).json({ message: 'Error al eliminar los datos del niño' });
  }
}

export const getChildById = async (req, res) => {
  try {
    const childFound = await Child.findById(req.query.id);
    if (!childFound) {
      return res.status(404).json({ message: 'Niño no encontrado' });
    }
    res.json(childFound)
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los datos del niño' });

  }
}

export const updateChild = async (req, res) => {
  const { name, pin, avatar } = req.body
  try {
    const childFound = await Child.findById(req.query.id);
    if (!childFound) {
      return res.status(404).json({ message: 'Niño no encontrado' });
    }
    childFound.name = name || childFound.name;
    childFound.pin = pin || childFound.pin;
    childFound.avatar = avatar || childFound.avatar;
    childFound.parent = req.parent.id

    const childSaved = await childFound.save();
    res.json(childSaved);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error al actualizar la informacion del niño', error });
  }
}
