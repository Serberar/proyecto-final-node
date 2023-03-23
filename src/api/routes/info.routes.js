const express= require("express");

// const {getInfo,getInfoById,getInfoByNombre,getInfoByApellidos,getInfoByTelefono,postInfo,putInfo,deleteInfo} = require('../controllers/info.controller');
const router = express.Router();

router.get("/",(req,res)=> res.send('este es mi get'));

// router.get("/:id", getInfoById);

// router.get("/nombre/:nombre",getInfoByNombre);

// router.get("/apellidos/:apellidos", getInfoByApellidos);

// router.get("/telefono/:telefono", getInfoByTelefono);

// router.post("/", postInfo);

// router.put("/:id",putInfo);

// router.delete("/:id",deleteInfo);

module.exports = router;