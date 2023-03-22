//requerimos mongoose
const mongoose = require('mongoose');   

//funcion para conectar con un try / catch
const connect = async () => {

    try {
        //Aquí conectamos a la BBDD
        const db = await mongoose.connect(process.env.DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        const {name, host} = db.connection;
        console.log(`Connected to ${name} DB in host: ${host}`)
        
    } catch (error) {
        console.log(`He tenido un error al conectar con mi BBDD: ${error}`)
    }

}
//exportamos la BBDD
module.exports = {connect}