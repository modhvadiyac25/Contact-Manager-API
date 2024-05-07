const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const validateToken = asyncHandler(async(req,res,next)=>{
    let token;
    const authorization = req.headers.Authorization || req.headers.authorization;
    console.log("[debug] : authorization : " + authorization);
    if(authorization && authorization.startsWith("Bearer")){
        token = authorization.split(" ")[1];
        jwt.verify(token,process.env.ACCESS_TOKEN_SECRET, (err,decode)=>{
            if(err){
                console.log("[debug] : if err");
                res.status(401);
                throw new Error("User is not authorized");
            }
            req.user = decode.user;
            next();
        });

        if(!token){
            res.status(401);
            throw new Error("User is not authorized and token is missing");
        }
    }else{
        res.status(400);
        throw new Error("Something went wrong");
    }
});

module.exports = validateToken;
