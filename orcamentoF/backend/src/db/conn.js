const mongoose = require("mongoose");

async function main() {
    try{
        mongoose.set("strictQuery", true);

        await mongoose.connect(`mongodb+srv://playdroid840:g1CPAHJlZfPP1b0r@cluster0.ra26edb.mongodb.net/`);

        console.log("conectado ao banco")
    } catch (error) {
        console.log(`erro: ${error}`)
    }
};

module.exports = main;