const mongoose = require("mongoose");

async function main() {
    try{
        mongoose.set("strictQuery", true);

        await mongoose.connect(`${process.env.MONGO_URL}`);

        console.log("conectado ao banco")
    } catch (error) {
        console.log(`erro: ${error}`)
    }
};

module.exports = main;