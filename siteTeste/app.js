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
const usuario = require("./routes/usuario")
const passport = require("passport")
require("./config/auth")(passport)

app.use(session({
    secret: "siteandroidtechandro",
    resave: true,
    saveUninitialized: true
}))

app.use(passport.initialize())
app.use(passport.session())

app.use(flash())

app.use((req, res, next) => {
    res.locals.success_msg = req.flash("success_msg")
    res.locals.error_msg = req.flash("error_msg")
    res.locals.user = req.user || null
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

app.get("/postagem/:slug", (req, res) => {
    Postagem.find({slug: req.params.slug}).then((postagem) => {
        const slug = req.params.slug
        
        Postagem.findOne({slug}).then(postagem => {
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

app.get("/categorias", (req,res) => {
    Categoria.find().sort("desc").then((categorias) => {
        Postagem.find().sort("desc").then((postagens) => {
           res.render("categorias/index", {categorias: categorias, postagens: postagens}) 
        })
        
    }).catch((err) => {
    req.flash("error_msg", "Erro interno")
    res.redirect("/")
    })
})

app.get("/postagens/:slug", (req, res) => {
    Categoria.findOne({slug: req.params.slug}).then((categoria) => {
        if (categoria) {
            Postagem.find({categoria: categoria._id}).then((postagens) => {
                res.render("categorias/postagens", {postagens: postagens, categoria: categoria})
            }).catch((err) => {
                req.flash("error_msg", "Erro ao listar postagens")
                res.redirect("/")
            })
        }
    }).catch((err) => {
        req.flash("error_msg", "Erro ao encontrar categoria")
        res.redirect("/categorias")
    })
})

app.use("/usuarios", usuario )

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