const mongoose = require('mongoose');

//obtengo en Schema de mongoose
const Schema = mongoose.Schema;
//creamos el Schema se nuestra entidad movies
const usersSchema = new Schema(
{
    
    nombre: {type: String, required: true},
    apellidos: {type: String, required: true},
    edad: {type: Number, required: true},
    sexo: {type: String, required: true},
    email: {type: Number, required: true},
    telefono: {type: Number, required: true}


}, {
    timestamps:true
}

)
//insertamos en la const user el modelo
const user = mongoose.model('user', usersSchema);

//exportamos el modelo
module.exports = user;
