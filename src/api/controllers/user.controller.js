//importamos el cliente 
const user = require("../models/models.user");
const bcrypt =require ("bcrypt");
const {validateEmail,validatePassword,usedEmail }=require ("../validators");
const {generateSign}= require("../jwt")

const getuser = async (req, res) => {
    try{
        //recojo los datos con una peticion a mongo
        const alluser = await user.find();
        //devuelvo los datos en estado jsn con status 200
        return res.status(200).json(alluser);
    }catch(error){
        return res.status(500).json(error);
    }
}

const login = async (req, res) => {
    try {
        const userInfo = await user.findOne({ email: req.body.email})
        if(!userInfo) {
            return res.status(404).json({message: 'invalid email address'})
        }
        if(!bcrypt.compareSync(req.body.password, userInfo.password)){        
            return res.status(404).json({message: 'invalid password'});
        }
        const token = generateSign(userInfo._id, userInfo.email)
        return res.status(200).json({userInfo, token});
    } catch (error) {
        return res.status(500).json(error)
    }
}

const register = async (req, res)=>{
  console.log(req.body);
    try{
        const newuser= new user({
            email: req.body.email,
            password: req.body.password
          });
        
          if(!validateEmail(newuser.email)){
           return res.status(400).send({message: "Invalid email"});
            
          }
          if(!validatePassword(newuser.password)){
            return res.status(400).send({message: "Invalid password"});
          }
        if(await usedEmail(newuser.email) > 0){
           return res.status(400).send({message: "Email is already in use"});
        }

        newuser.password= bcrypt.hashSync(newuser.password,10);
        const createduser= await newuser.save();
      
        return res.status(201).json(createduser);
    } catch (error) {
        return res.status(500).json(error);
      }
};

const checkSession = async (req, res)=>{
    try{
        res.status(200).json(req.user)
    } catch (error) {
        return res.status(500).json(error);
      }
}

const deleteuser = async (req, res) => {
    try{
        const {id}=req.params;
        const deletemovie = await user.findByIdAndDelete(id); //Buscamos por id y actualizamos el elemento
        if(!deleteuser){     //Controlamos que el elemento existiera y si no enviamos error 404
            return res.status(404).json({ "message": "user not found"});
        }
        return res.status(200).json(deleteuser);
    } catch (error) {
     return res.status(500).json(error);
    }
}

module.exports={login,register,checkSession,getuser,deleteuser}