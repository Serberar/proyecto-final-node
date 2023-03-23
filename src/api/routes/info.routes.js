const express = require("express");

const router = express.Router();

const {
  getInfo,
  getInfoById,
  getInfoByNombre,
  getInfoByApellidos,
  getInfoByTelefono,
  postInfo,
  putInfo,
  deleteInfo
} = require("../controllers/info.controller");

router.get("/", getInfo);

router.get("/:id", getInfoById);

router.get("/nombre/:nombre", getInfoByNombre);

router.get("/apellidos/:apellidos", getInfoByApellidos);

router.get("/telefono/:telefono", getInfoByTelefono);

router.post("/", postInfo);

router.put("/:id", putInfo);

router.delete("/:id", deleteInfo);
module.exports = router;
