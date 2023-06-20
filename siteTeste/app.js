const express = require("express")
const app = express()
const handlebars = require("express-handlebars")
const bodyParser = require("body-parser")
const path = require("path")
const admin = require("./routes/admin")
const mongoose = require("mongoose")
const session = require("express-session")
const flash = require("connect-flash")
require("./models/Postagem")
const Postagem = mongoose.model("postagens")
require("./models/Categoria")
const Categoria = mongoose.model("categorias")

app.use(session({
    secret: "siteandroidtechandro",
    resave: true,
    saveUninitialized: true
}))

app.use(flash())

app.use((req, res, next) => {
    res.locals.success_msg = req.flash("success_msg")
    res.locals.error_msg = req.flash("error_msg")
    next()
})
// Handlebars
app.engine('handlebars', handlebars.engine({
    defaultLayout: 'main', runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true,
    }
}))
app.set('view engine', 'handlebars')

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

mongoose.Promise = global.Promise;
    mongoose.connect("mongodb://127.0.0.1/siteteste", {
        useNewUrlParser: true
    }).then(()=> {
        console.log("conectado com sucesso!")
    }).catch((err) => {
        console.log("Erro ao se conectar: "+ err)
    })

app.use(express.static(path.join(__dirname, "public")))



app.use("/admin", admin)

app.get("/postagem/:titulo", (req, res) => {
    Postagem.find({titulo: req.params.titulo}).then((postagem) => {
        const titulo = req.params.titulo
        
        Postagem.findOne({titulo}).then(postagem => {
            console.log(postagem)
            if(postagem){
                const post = {
                    titulo: postagem.titulo,
                    descricao: postagem.descricao,
                    conteudo: postagem.conteudo,
                    categoria: postagem.categoria
                }
                res.render('postagem/index', post)
            } else {
                req.flash("error_msg", "Essa página não existe")
                res.redirect("/")
            }
        })
        
    }).catch((err) => {
        req.flash("error_msg", "Erro interno")
        res.redirect("/")
    })
    
    
})

app.get("/", (req, res) => {
    Postagem.find().populate("categoria").sort("desc").then((postagens) => {
       res.render("index", {postagens: postagens}) 
    }).catch((err) => {
        req.flash("error-msg", "Erro ao listar postagens")
        res.redirect("/")
    })
    
})



const PORT = 8089
app.listen(PORT, () => {
    console.log("servidor rodando!")
})