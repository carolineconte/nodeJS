const mongoose = require("mongoose");

require("dotenv").config();

async function connectDataBase() {
    await mongoose.connect(process.env.DBCONNECTION)
    console.log('Connect!')
};

connectDataBase().catch((e) => console.log(e))

module.exports = connectDataBase