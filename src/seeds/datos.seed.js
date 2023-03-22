const mongoose = require('mongoose');
const movie = require('../api/models/models.datos');
const dotenv = require("dotenv").config()
const XLSX = require('xlsx');
const workbook = XLSX.readFile('1.xlsx');
const worksheet = workbook.Sheets[workbook.SheetNames[0]];
const datos = XLSX.utils.sheet_to_json(worksheet);

// Convertir los datos a formato deseado
const arrayDatos = datos.map(dato => {
  return {
    
    nombre: dato.NOMBRE,
    cantidad: dato.CANTIDAD,
    calorias: dato.CALORIAS,
    proteinas: dato.PROTEINAS,
    carbohidratos: dato.CARBOHIDRA,
    grasas: dato.GRASAS
  }
});

const DB_URL = process.env.DB_URL;

async function eliminarRegistrosDuplicados() {
  try {
    const movies = await movie.find();
    if (movies.length >0){
      await movie.collection.drop();
      console.log("datos reseteados");
    }
  } catch (err) {
    console.log('Error eliminando registros duplicados:', err);
  }
}

async function insertarDatos() {
  try {
    await eliminarRegistrosDuplicados();
    await movie.insertMany(arrayDatos);
    console.log("datos creados");C
  } catch (err) {
    console.log('Error insertando datos:', err);
  }
}

mongoose
  .connect(DB_URL)
  .then(() => insertarDatos())
  .catch((err) => console.log('Error conectando a la base de datos:', err))
  .finally(() => mongoose.disconnect());
