const express = require("express");
const router = express.Router();
const {registerUser, loginUser, currentUser} = require("../controllers/userController");
const validateToken = require("../middleware/validateTokenHandler");

router.post("/register", registerUser);

router.post("/login", loginUser);
router.get("/current", validateToken, currentUser);
// router.post("/current",(req,res)=>{
//     res.status(200).json("C");
// });
module.exports = router;
