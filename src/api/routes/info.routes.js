const express= require("express");

const router = express.Router();

const {getInfo, getInfoById, getInfoByNombre, getInfoByApellidos, getInfoByTelefono, postInfo} = require("../controllers/info.controller");

router.get("/", getInfo);

router.get("/:id", getInfoById);

// router.get("/nombre/:nombre",getInfoByNombre);

// router.get("/apellidos/:apellidos", getInfoByApellidos);

// router.get("/telefono/:telefono", getInfoByTelefono);

router.post("/", postInfo);

router.put("/:id", (req,res)=> res.send('este es mi put'));

router.delete("/:id", (req,res)=> res.send('este es mi delete'));
module.exports = router;