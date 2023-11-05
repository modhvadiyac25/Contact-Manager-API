const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//@desc Current User Info
//@route POST /api/user/current
//@access private
const currentUser = asyncHandler(async(req,res) => {
    console.log("[debug] : async handler current user");
    res.json(req.user);
});

//@desc Create User
//@route POST api/users/login
//@access public 
const loginUser = asyncHandler(async (req,res) => {
    const {email, password} = req.body;
    if(!email || !password){
        res.status(400);
        throw new Error("Email or Password is/are empty");  
    }

    const user = await User.findOne({ email });
    //compare password with hash password
    if(user && (await bcrypt.compare(password,user.password))){
        const accessToken = jwt.sign({
            user:{
                username:user.username,
                email:user.email,
                id:user.id,
            },
        },process.env.ACCESS_TOKEN_SECRET,{expiresIn:"30m"});
        res.status(200).json({"token":accessToken});
    }else{
        res.status(401);
        throw new Error("email or password is not valid");
    }
});


//@desc Create User
//@route POST api/users/register
//@access public
const registerUser = asyncHandler(async (req, res) => {
    
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        res.status(400);
        throw new Error("All fields are mandatory");
    }
    try{
    const useravailable = await User.findOne({email});
    if(useravailable){
        res.status(400);
        throw new Error("User already exist !");
    }}catch(ex){
        console.log("ex : ",ex);
    }

    const bcryptPassword = await bcrypt.hash(password,10);
    console.log("password : " + bcryptPassword);
    const user = await User.create({
        username, email, password:bcryptPassword
    });
    
    if(user){
        res.status(201).json({_id: user.id, email: user.email});
    }else{
        res.status(400);
        throw new Error("Invalid User Data.");
    }
}); 

module.exports = {registerUser, loginUser, currentUser};