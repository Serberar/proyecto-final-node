//importamos el cliente 
const user = require("../models/models.user");
const bcrypt =require ("bcrypt");
const {validateEmail,validatePassword,usedEmail }=require ("../validators");
const {generateSign}= require("../jwt")


const login = async (req, res) => {
    try {
        const userInfo = await User.findOne({ email: req.body.email})
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
        const newUser= new User({
            email: req.body.email,
            password: req.body.password
          });
        
          if(!validateEmail(newUser.email)){
           return res.status(400).send({message: "Invalid email"});
            
          }
          if(!validatePassword(newUser.password)){
            return res.status(400).send({message: "Invalid password"});
          }
        if(await usedEmail(newUser.email) > 0){
           return res.status(400).send({message: "Email is already in use"});
        }

        newUser.password= bcrypt.hashSync(newUser.password,10);
        const createdUser= await newUser.save();
      
        return res.status(201).json(createdUser);
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

module.exports={login,register,checkSession}