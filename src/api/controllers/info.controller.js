const Info = require("../models/models.info");
const { deleteFile } = require("../middlewares/delete.file");

//Gets
const getInfo = async (req, res) => {
  try {
    const allInfo = await Info.find();
    return res.status(200).json(allInfo);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const getInfoById = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const infoSearchById = await Info.findById(id).populate("data");
    console.log(infoSearchById);
    if (!infoSearchById) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json(infoSearchById);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const getInfoByNombre = async (req, res) => {
  try {
    const { nombre } = req.params;
    const InfoByNombre = await Info.find({ nombre: nombre });
    return res.status(200).json(InfoByNombre);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const getInfoByApellidos = async (req, res) => {
  try {
    const { apellidos } = req.params;
    const infoByApellidos = await Info.find({ apellidos: apellidos });
    return res.status(200).json(infoByApellidos);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const getInfoByTelefono = async (req, res) => {
  try {
    const { telefono } = req.params;
    const infoByTelefono = await Info.find({ telefono: telefono });
    return res.status(200).json(infoByTelefono);
  } catch (error) {
    return res.status(500).json(error);
  }
};

//Post
const postInfo = async (req, res) => {
  try {
    console.log(req.body);

    const newInfo = new Info(req.body);
    if (req.file.path) {
      newImg.image = req.file.path;
    }
    const createInfo = await newInfo.save();
    return res.status(201).json(createInfo);
  } catch (error) {
    return res.status(500).json(error);
  }
};

//Put
const putInfo = async (req, res) => {
  try {
    const { id } = req.params;
    const putInfo = new Info(req.body);
    putInfo._id = id;

    const updateInfo = await Info.findOneAndUpdate(id, putInfo, { new: true });
    if (!updateInfo) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json(updateInfo);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const putImg = async (req, res) => {
  console.log(req.files);
  try {
    const { id } = req.params;
    const putImg = new Img(req.body);
    putImg._id = id;

    if (req.files.image) {
      putImg.image = req.files.image[0].path;
    }

    const updateImg = await Img.findByIdAndUpdate(id, putImg);
    if (updateImg.image) {
      deleteFile(updateImg.image);
    }

    return res.status(200).json(updateImg);
  } catch (error) {
    return res.status(500).json(error);
  }
};

//Delete
const deleteInfo = async (req, res) => {
  try {
    const { id } = req.params; //Le pasamos el id
    const deleteInfo = await Info.findOneAndDelete(id);
    if (!deleteInfo) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json(deleteInfo);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const deleteImg = async (req, res) => {
    try {
      const { id } = req.params;
      const deleteImg = await Img.findByIdAndDelete(id);
      if (!deleteImg) {
        return res.status(404).json({ message: "Img not found" });
      }
      if (deleteImg.image) {
        deleteFile(deleteImg.image);
      }
      return res.status(200).json(deleteImg);
    } catch (error) {
      return res.status(500).json(error);
    }
  };

module.exports = {
  getInfo,
  getInfoById,
  getInfoByNombre,
  getInfoByApellidos,
  getInfoByTelefono,
  postInfo,
  putInfo,
  deleteInfo
};
