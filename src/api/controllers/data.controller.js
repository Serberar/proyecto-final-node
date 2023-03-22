//importamos el cliente 
const data = require("../models/models.datos");

//generamos las funciones
//genero las funciones del get
//me filta todas las entradas
const getdata = async (req, res) => {
    try{
        //recojo los datos con una peticion a mongo
        const alldatos = await data.find();
        //devuelvo los datos en estado jsn con status 200
        return res.status(200).json(alldatos);
    }catch(error){
        return res.status(500).json(error);
    }
}

//filtro por titulo
const getdataBytitle = async (req, res) => {
    try{
        //recojo los datos con una peticion a mongo
        const {title}= req.params;
        //filtro por titulo
        const titledatos = await data.find({title}); 
        //devuelvo los datos en estado jsn con status 200
        return res.status(200).json(titledatos);
    }catch(error){
        return res.status(500).json(error);
    }
}

//genero la funcion del post
const postdata = async (req, res) => {
   try{
        console.log(req.body); 
        const {nombre, cantidad, calorias, proteinas, carbohidratos, grasas} =req.body;
        //creamos un nuevo cliente con los datoe enviados
        const newdata = new data ({nombre, cantidad, calorias, proteinas, carbohidratos, grasas})
        //guardamos los datos en la base de datos y nos devuelde el nuevo elemento
        const createddata = await newdata.save();
        return res.status(201).json(createddata);
   } catch (error) {
    return res.status(500).json(error);
   }
}

// genero la funcion put
const putdata = async (req, res) => {
    try {
      const { id } = req.params;
      const updateddata = new data(req.body);
      updateddata._id = id;
  
      const updatedata = await data.findByIdAndUpdate(id, updateddata, { new: true }); //Buscamos por id y actualizamos el elemento
      if (!updatedata) {     //Controlamos que el elemento existiera y si no enviamos error 404
        return res.status(404).json({ "message": "data not found" });
      }
      return res.status(200).json(updatedata);
    } catch (error) {
      return res.status(500).json(error);
    }
  };

//genero la funcion delete
const deletedata = async (req, res) => {
    try{
        const {id}=req.params;
        const deletedata = await data.findByIdAndDelete(id); //Buscamos por id y actualizamos el elemento
        if(!deletedata){     //Controlamos que el elemento existiera y si no enviamos error 404
            return res.status(404).json({ "message": "data not found"});
        }
        return res.status(200).json(deletedata);
    } catch (error) {
     return res.status(500).json(error);
    }
}

module.exports ={getdata, getdataBytitle, postdata, putdata, deletedata};
