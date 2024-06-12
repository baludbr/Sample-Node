const dotenv=require("dotenv");
const jwt = require('jsonwebtoken');
const rateLimit=require("express-rate-limit")

dotenv.config()

const Constant = Object.freeze({ 
    COMMONLIMIT: 1 
  });

const verifyToken = (req, res, next) => { 
    const token = req.headers["w-access-token"]; 
    if (!token) { 
        return res.status(403).send({ 
            message: "Access token is required" 
        }) 
    } 
 
    try { 
        const decoded = jwt.verify(token, process.env.SECRET); 
   
        req.user = decoded; 
 
        next(); 
    } catch (e) { 
     
        return res.status(401).send({ 
            message: "Invalid access token" 
        }); 
    } 
};
const commonLimit = rateLimit({ 
    max: 20, 
    windowMs: Constant.COMMONLIMIT * 60 * 1000, 
    message: { 
      message: 'Too many requests from this IP, please try again after an ' + Constant.COMMONLIMIT + ' minutes' 
    }, 
  })
module.exports = {verifyToken,commonLimit}