const Info = require("../models/models.info");
const { deleteFile } = require("../middlewares/delete.file");

//Gets
const getInfo = async (req, res) => {
  try {
    let {page, limit} = req.query;
    const numinfo = await Info.countDocuments();
    limit = limit ? parseInt(limit) : 5;
    if(page && !isNaN(parseInt(page))){
      page = parseInt(page);
      console.log(page)
      let numPages = numinfo % limit > 0 ? numinfo / limit + 1 : numinfo / limit;
      
      if(page> numPages) page = numPages;
      
      if(page < 1) page = 1;      

      const skip = (page - 1) * limit; 

      const info = await Info.find().skip(skip).limit(limit)
      return res.status(200).json(
        {
          info: {
            numTotal: numinfo,
            page: page,
            limit: limit,
            nextPage: numPages >= page + 1 ? `/info?page=${page + 1}&limit=${limit}` : null,
            prevPage: page != 1 ? `/info?page=${page - 1}&limit=${limit}` : null
          },
          results:info
        }
      )

    }else{
      const info = await Info.find().limit(limit);
      return res.status(200).json({
        info: {
          numTotal: numinfo,
          page: 1,
          limit: limit,
          nextPage: numinfo > limit ? `/info?page=2&limit=${limit}` : null,
          prevPage: null
        },
        results: info
      });
    }

  } catch (error) {
    return res.status(500).json(error);
  }
};

const getInfoById = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const infoSearchById = await Info.findById(id).populate("Info");
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
      newInfo.image = req.file.path;
    }
    const createInfo = await newInfo.save();
    return res.status(201).json(createInfo);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const putInfo = async (req, res) => {
  console.log(req.file);
  try {
    const { id } = req.params;
    const putInfo = new Info(req.body);
    putInfo._id = id;
console.log(req.file);
    if (req.file) {
      putInfo.image = req.file.path;
    }

    const updateInfo = await Info.findByIdAndUpdate(id, putInfo);
    if (updateInfo.image) {
      deleteFile(updateInfo.image);
    }
    return res.status(200).json(updateInfo);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error', details: error.message });
  }
};

//Delete
const deleteInfo = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteInfo = await Info.findByIdAndDelete(id);
    if (!deleteInfo) {
      return res.status(404).json({ message: "Info not found" });
    }
    if (deleteInfo.image) {
      deleteFile(deleteInfo.image);
    }
    return res.status(200).json(deleteInfo);
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
  deleteInfo,
};
