//requerimos express
const express = require('express');

//generamos el enrutador
const router = express.Router();

//importo las funciones
const {getuser, getuserBytitle, postuser, putuser, deleteuser} = require('../controllers/user.controller')

//generamos las rutas
//rutas get
router.get('/', getuser);
router.get('/nombre/:nombre', getuserBytitle);
//ruta post
router.post('/', postuser);
//ruta put
router.put('/:id', putuser);
//ruta delete
router.delete('/:id', deleteuser);

module.exports = router;
