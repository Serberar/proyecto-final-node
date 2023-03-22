//requerimos express
const express = require('express');

//generamos el enrutador
const router = express.Router();

//importo las funciones
const {getdata, getdataBytitle, postdata, putdata, deletedata} = require('../controllers/data.controller')

//generamos las rutas
//rutas get
router.get('/', getdata);
router.get('/title/:title', getdataBytitle);
//ruta post
router.post('/', postdata);
//ruta put
router.put('/:id', putdata);
//ruta delete
router.delete('/:id', deletedata);

module.exports = router;
