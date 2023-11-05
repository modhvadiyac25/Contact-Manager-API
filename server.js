const express = require("express");
const errorHandler = require("./middleware/errorHandler");
const connectDb1 = require("./Config/dbConnection.js");
const dotenv = require("dotenv").config();

console.log("[debug] : hello");
connectDb1();
const app = express();

const port = process.env.PORT || 5001;

//parser to parse the json response which is received
app.use(express.json());
console.log("[debug] : ./api/contacts");
app.use("/api/contacts",require("./routes/contactRoutes.js"));
console.log("[debug] : ./api/users");
app.use("/api/users",require("./routes/userRoutes.js"));
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
}); 