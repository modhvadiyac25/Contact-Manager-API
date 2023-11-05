const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const validateToken = asyncHandler(async(req,res,next)=>{
    console.log("[debug] : validateToken");
    let token;
    console.log("[debug] : after token");
    const authorization = req.headers.Authorization || req.headers.authorization;
    console.log("[debug] : authorization : " + authorization);
    if(authorization && authorization.startsWith("Bearer")){
        console.log("[debug] : if authorization");
        token = authorization.split(" ")[1];
        console.log("[debug] : token : " +token);
        jwt.verify(token,process.env.ACCESS_TOKEN_SECRET, (err,decode)=>{
            if(err){
                console.log("[debug] : if err");
                res.status(401);
                throw new Error("User is not uthorized");
            }
            req.user = decode.user;
            console.log("[debug] : before next");
            next();
            console.log("[debug] : after next");
        });

        if(!token){
            console.log("[debug] : !token");
            res.status(401);
            throw new Error("User is not authorized and token is missing");
        }
        console.log("[debug] : after if token");

    }else{
        console.log("[debug] : first else");
        res.status(400);
        throw new Error("Something went wrong");
    }
    console.log("[debug] : out");
});

module.exports = validateToken;