const mongoose = require('mongoose');

//obtengo en Schema de mongoose
const Schema = mongoose.Schema;
//creamos el Schema se nuestra entidad movies
const usersSchema = new Schema(
{

    email: {type: String, required: true},
    password:{type:String, require:true},
    role: {type: String, default:'user', enum:['admin', 'user']}


}, {
    timestamps:true
}

)
//insertamos en la const user el modelo
const user = mongoose.model('user', usersSchema);

//exportamos el modelo
module.exports = user;
