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
require("./models/Postagem")
const Postagem = mongoose.model("postagens")
require("./models/Categoria")
const Categoria = mongoose.model("categorias")
const usuarios = require("./routes/usuario");
const passport = require("passport");
require("./config/auth")(passport)

// Configurações
    // sessão
    app.use(session({
        secret: "cursodenode",
        resave: true,
        saveUninitialized: true
    }))
        
    app.use(passport.initialize())
    app.use(passport.session())

    app.use(flash())
    // middleware
    app.use((req, res, next) => {
        res.locals.success_msg = req.flash("success_msg")
        res.locals.error_msg = req.flash("error_msg")
        res.locals.error = req.flash("error")
        res.locals.user = req.user || null
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
        
// Rotas
    
    app.use("/admin", admin)
    
    app.get("/postagem/:slug", (req, res) => {
        Postagem.find({slug: req.params.slug}).then((postagem) => {
            const slug = req.params.slug
            Postagem.findOne({slug})
            .then(postagem => {
                if(postagem){
                    const post = {
                        titulo: postagem.titulo,
                        data: postagem.data,
                        conteudo: postagem.conteudo
                    }
                    res.render('postagem/index', post)
                }else{
                    req.flash("error_msg", "Essa postagem nao existe")
                    res.redirect("/")
                }
            })
        }).catch((err) => {
            req.flash("error_msg", "Houve um erro interno")
            res.redirect("/")
        })
    })

    app.get("/categorias", (req, res) => {
        Categoria.find().then((categorias) => {
           res.render("categorias/index", {categorias: categorias})

        }).catch((err) => {
           req.flash("error_msg", "Houve um erro interno ao listar as categorias")
           res.redirect("/")
        })
   })

   app.use("/usuarios", usuarios)

   app.get("/categorias/:slug", (req, res) => {
    Categoria.findOne({slug: req.params.slug}).then((categoria) => {

        if(categoria) {
            Postagem.find({categoria: categoria._id}).then((postagens) => {
                res.render("categorias/postagens", {postagens: postagens, categoria: categoria})

            }).catch((err) => {
                req.flash("error_msg", "houve um erro ao listar os posts!")
                res.redirect("/")
            })

        }else {
            req.flash("error_msg", "Essa categoria não existe")
            res.redirect("/")
        }

    }).catch((err) => {
        req.flash("error_msg", "Houve um erro interno ao carregar a página")
        res.redirect("/")
    })
   })

    app.use("/", (req, res) => {
        Postagem.find().populate("categoria").sort({data: "desc"}).then((postagens) => {
           res.render("index", {postagens: postagens})
        }).catch((err) => {
            req.flash("error_msg", "Houve um erro interno")
            res.redirect("/404")
        })
        
    })

    

    app.get("/404", (req, res) => {
        res.send("Erro 404!")
    })

    app.use("/posts", (req, res) => {
        res.send("Pagina de posts")
    })
    
    
    
    

// Outros
const PORT = 8081
app.listen(PORT, () => {
    console.log("Servidor rodando")
})