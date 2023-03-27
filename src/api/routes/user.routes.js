const express= require("express");
const router = express.Router();
const{login, checkSession, register, getuser, deleteuser}= require("../controllers/user.controller");
const {isAuth,isAdmin} = require("../middlewares/auth");


router.get("/", getuser);
router.post("/checkSession",[isAuth],checkSession);
router.post("/login", login);
router.post("/register", register);
router.post("/:id", deleteuser);

module.exports= router;