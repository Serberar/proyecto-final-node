const XLSX = require('xlsx');
const workbook = XLSX.readFile('1.xlsx');
const worksheet = workbook.Sheets[workbook.SheetNames[0]];
const datos = XLSX.utils.sheet_to_json(worksheet);

// Convertir los datos a formato deseado
const arrayDatos = datos.map(dato => {
  return {
    cantidad: dato.CANTIDAD,
    nombre: dato.NOMBRE,
    calorias: dato.CALORIAS,
    proteinas: dato.PROTEINAS,
    carbohidratos: dato.CARBOHIDRA,
    grasas: dato.GRASAS
  }
});

console.log(arrayDatos); // Imprimir los datos en consola
