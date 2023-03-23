const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const infoSchema = new Schema({
     nombre: {type: String, required: true},
     apellidos: {type: String, required: true},
     telefono: {type: Number, required: true},
     observaciones: {type: String, required: false},
     dieta: [{type: Schema.Types.ObjectId, ref: 'data'}]
},{
    timestamps: true,
});

const Info = mongoose.model('info',infoSchema);

module.exports = Info;