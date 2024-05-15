const jwt= require("jsonwebtoken");
const config= require("config");
const KEY= config.get("JWT_KEY");

const generateAuthToken=(user)=>{
    const {_id,isBusiness,isAdmin}= user;

    const token=jwt.sign(user,KEY);
    return token
}


const verifyToken=(tokenFromClient)=> jwt.verify(tokenFromClient,KEY);
    





exports.generateAuthToken=generateAuthToken;
exports.verifyToken=verifyToken;