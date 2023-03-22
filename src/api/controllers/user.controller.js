//importamos el cliente 
const user = require("../models/models.user");

//generamos las funciones
//genero las funciones del get
//me filta todas las entradas
const getuser = async (req, res) => {
    try{
        //recojo los users con una peticion a mongo
        const allusers = await user.find();
        //devuelvo los users en estado jsn con status 200
        return res.status(200).json(allusers);
    }catch(error){
        return res.status(500).json(error);
    }
}

//filtro por titulo
const getuserBytitle = async (req, res) => {
    try{
        //recojo los users con una peticion a mongo
        const {title}= req.params;
        //filtro por titulo
        const titleusers = await user.find({title}); 
        //devuelvo los users en estado jsn con status 200
        return res.status(200).json(titleusers);
    }catch(error){
        return res.status(500).json(error);
    }
}

//genero la funcion del post
const postuser = async (req, res) => {
   try{
        console.log(req.body); 
        const {nombre, cantidad, calorias, proteinas, carbohidratos, grasas} =req.body;
        //creamos un nuevo cliente con los datoe enviados
        const newuser = new user ({nombre, cantidad, calorias, proteinas, carbohidratos, grasas})
        //guardamos los users en la base de users y nos devuelde el nuevo elemento
        const createduser = await newuser.save();
        return res.status(201).json(createduser);
   } catch (error) {
    return res.status(500).json(error);
   }
}

// genero la funcion put
const putuser = async (req, res) => {
    try {
      const { id } = req.params;
      const updateduser = new user(req.body);
      updateduser._id = id;
  
      const updateuser = await user.findByIdAndUpdate(id, updateduser, { new: true }); //Buscamos por id y actualizamos el elemento
      if (!updateuser) {     //Controlamos que el elemento existiera y si no enviamos error 404
        return res.status(404).json({ "message": "user not found" });
      }
      return res.status(200).json(updateuser);
    } catch (error) {
      return res.status(500).json(error);
    }
  };

//genero la funcion delete
const deleteuser = async (req, res) => {
    try{
        const {id}=req.params;
        const deleteuser = await user.findByIdAndDelete(id); //Buscamos por id y actualizamos el elemento
        if(!deleteuser){     //Controlamos que el elemento existiera y si no enviamos error 404
            return res.status(404).json({ "message": "user not found"});
        }
        return res.status(200).json(deleteuser);
    } catch (error) {
     return res.status(500).json(error);
    }
}

module.exports ={getuser, getuserBytitle, postuser, putuser, deleteuser};
