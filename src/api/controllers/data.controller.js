//importamos el cliente 
const Data = require("../models/models.datos");

//generamos las funciones
//genero las funciones del get
//me filta todas las entradas

const getdata = async (req, res) => {
    try {
      let {page, limit} = req.query;
      const numdatos = await Data.countDocuments();
      limit = limit ? parseInt(limit) : 10;
      if(page && !isNaN(parseInt(page))){
        page = parseInt(page);
        console.log(page)
        let numPages = numdatos % limit > 0 ? numdatos / limit + 1 : numdatos / limit;
        
        if(page> numPages) page = numPages;
        
        if(page < 1) page = 1;      
  
        const skip = (page - 1) * limit; 
  
        const datos = await Data.find().skip(skip).limit(limit)
        return res.status(200).json(
          {
            info: {
              numTotal: numdatos,
              page: page,
              limit: limit,
              nextPage: numPages >= page + 1 ? `/alimentos?page=${page + 1}&limit=${limit}` : null,
              prevPage: page != 1 ? `/alimentos?page=${page - 1}&limit=${limit}` : null
            },
            results:datos
          }
        )
  
      }else{
        const datos = await Data.find().limit(limit);
        return res.status(200).json({
          info: {
            numTotal: numdatos,
            page: 1,
            limit: limit,
            nextPage: numdatos > limit ? `/alimentos?page=2&limit=${limit}` : null,
            prevPage: null
          },
          results: datos
        });
      }
  
    } catch (error) {
      return res.status(500).json(error);
    }
  };


//filtro por titulo
const getdataBytitle = async (req, res) => {
    try{
        //recojo los datos con una peticion a mongo
        const {title}= req.params;
        //filtro por titulo
        const titledatos = await Data.find({title}); 
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
        const newdata = new Data ({nombre, cantidad, calorias, proteinas, carbohidratos, grasas})
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
      const updateddata = new Data(req.body);
      updateddata._id = id;
  
      const updatedata = await Data.findByIdAndUpdate(id, updateddata, { new: true }); //Buscamos por id y actualizamos el elemento
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
        const deletedata = await Data.findByIdAndDelete(id); //Buscamos por id y actualizamos el elemento
        if(!deletedata){     //Controlamos que el elemento existiera y si no enviamos error 404
            return res.status(404).json({ "message": "data not found"});
        }
        return res.status(200).json(deletedata);
    } catch (error) {
     return res.status(500).json(error);
    }
}

module.exports ={getdata, getdataBytitle, postdata, putdata, deletedata};
