const mongoose = require("mongoose")
// configurando mongoose
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://127.0.0.1/aprendendo", {
    useNewUrlParser: true 
}).then(() => {
    console.log("MongoDB conectado")
}).catch((error) =>{
    console.log("Ouve um erro: " + error)
})

// model - usuarios

const UsuarioSchema = mongoose.Schema({
    nome: {
        type: String,
        require: true
    },
    sobrenome: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    idade: {
        type: Number,
        require: true
    },
    pais: {
        type: String
    }
})

mongoose.model('usuarios', UsuarioSchema)

const novoUsuario = mongoose.model('usuarios')
new novoUsuario({
    nome: "Rian",
    sobrenome: "santos",
    email: "revoltadasgala@gmail.com",
    idade: 19,
    pais: "Brasil"
}).save().then(() => {
    console.log("DEELBOMMM")
}).catch((erro)=>{
    console.log("ouve um erro: "+ erro)
})