// Carregando módulos
const bodyParser = require("body-parser");
const express = require("express");
const handlebars = require("express-handlebars");
const app = express()
const admin = require("./routes/admin")
const path = require("path")
const mongoose = require("mongoose")
const session = require("express-session")
const flash = require("connect-flash")

// Configurações
    // sessão
    app.use(session({
        secret: "cursodenode",
        resave: true,
        saveUninitialized: true
    }))
    app.use(flash())
    // middleware
    app.use((req, res, next) => {
        res.locals.success_msg = req.flash("success_msg")
        res.locals.error_msg = req.flash("error_msg")
        next()
    })
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
    mongoose.Promise = global.Promise;
    mongoose.connect("mongodb://127.0.0.1/blogapp", {
        useNewUrlParser: true
    }).then(()=> {
        console.log("conectado com sucesso!")
    }).catch((err) => {
        console.log("Eroo ao se conectar: "+ err)
    })
    // Public
        app.use(express.static(path.join(__dirname,"public")))
        app.use((req, res, next) => {
            console.log("oi eu sou um middleware")
            next()
        })
// Rotas
    
    app.use("/admin", admin)

    app.use("/posts", (req, res) => {
        res.send("Pagina de posts")
    })
    app.use("/", (req, res) => {
        res.send("Pagina principal")
    })
    

// Outros
const PORT = 8081
app.listen(PORT, () => {
    console.log("Servidor rodando")
})