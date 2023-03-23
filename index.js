//requiero express
const express = require('express');
//requiero dotenv
const dotenv = require('dotenv')
//requiero cloudinary
const cloudinary= require("cloudinary").v2;
const API_KEY=773475856383468;
//importamos la cuncion connect de database.js
const {connect} = require('./src/utils/database');

//importo el router
const routerdata =require('./src/api/routes/data.routes');
const routeruser =require('./src/api/routes/user.routes');
const routeInfo = require('./src/api/routes/info.routes');

//configuracion coundinary
cloudinary.config({
    cloud_name:process.env.CLOUDINARY_NAME,
    api_key:API_KEY,
    api_secret:process.env.CLOUDINARY_SECRET
});

//configuracion dotenv
dotenv.config();
//asigno una variable al puerto
const port = process.env.port || 8000; 

//genero mi servidor
const app = express();

//llamo a conectar 
connect();

//configuro express
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//pongo las rutas
app.use('/alimentos', routerdata);
app.use('/usuarios', routeruser);
app.use('/info', routeInfo);

//le decimos donde escucha y asignamos una funcion 
app.listen(port, ()=>console.log(`listening on: http://localhost:${port}`));