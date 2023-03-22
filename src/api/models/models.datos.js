const mongoose = require('mongoose');

//obtengo en Schema de mongoose
const Schema = mongoose.Schema;
//creamos el Schema se nuestra entidad movies
const datosSchema = new Schema(
{
    
    nombre: {type: String, required: true},
    cantidad: {type: Number, required: false},
    calorias: {type: Number, required: false},
    proteinas: {type: Number, required: false},
    carbohidratos: {type: Number, required: false},
    grasas: {type: Number, required: false}


}, {
    timestamps:true,
    collection: "Alimentos"
}

)
//insertamos en la const data el modelo
const data = mongoose.model('data', datosSchema);

//exportamos el modelo
module.exports = data;
