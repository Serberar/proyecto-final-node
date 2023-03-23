const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const infoSchema = new Schema({
     nombre: {type: String, required: true},
     apellidos: {type: String, required: true},
     telefono: {type: String, required: true},
     observaciones: {type: String, required: false},
     data: [{type: Schema.Types.ObjectId, ref: 'data'}],
     image: {type: String,required: false, default:"https://res.cloudinary.com/dcflhsicn/image/upload/v1679579711/infoUsers/avatar_kp5c66.png"}
},{
    timestamps: true,
});

const Info = mongoose.model('info',infoSchema);

module.exports = Info;