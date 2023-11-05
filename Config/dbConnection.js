const mongoose = require("mongoose");

const connectDb = async () => {
    try {
        const connect = await mongoose.connect(process.env.CONNECTION_STRING);
        console.log("DataBase is Connected ", connect.connection.host, connect.connection.name);
    } catch (exception) {
        console.log("Error while establishing connection with database : " + exception);
        process.exit(1);
    }
};


module.exports = connectDb;