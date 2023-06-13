// Carregando módulos
const bodyParser = require("body-parser");
const express = require("express");
const handlebars = require("express-handlebars");
const app = express()
//const mongoose = require("mongoose")


// Configurações
    // Body Parser
    app.use(bodyParser.urlencoded({extended: true}))
    app.use(bodyParser.json())
    // Handlebars
    app.engine('handlebars', handlebars.engine({defaultLayout: 'main',runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true, 
    }, }));
    app.set('view engine', 'handlebars');
    // Mongoose
    
    //
// Rotas


// Outros
const PORT = 8081
app.listen(PORT, () => {
    console.log("Servidor rodando")
})