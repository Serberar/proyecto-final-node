const express = require("express");
const upload = require('../middlewares/upload.file');
const router = express.Router();

const {
  getInfo,
  getInfoById,
  getInfoByNombre,
  getInfoByApellidos,
  getInfoByTelefono,
  postInfo,
  putInfo,
  deleteInfo,
} = require("../controllers/info.controller");

router.get("/", getInfo);

router.get("/:id", getInfoById);

router.get("/nombre/:nombre", getInfoByNombre);

router.get("/apellidos/:apellidos", getInfoByApellidos);

router.get("/telefono/:telefono", getInfoByTelefono);

router.post("/", upload.single('image'),postInfo);

router.put("/:id", upload.single('image'), putInfo);

router.delete("/:id", deleteInfo);


module.exports = router;
