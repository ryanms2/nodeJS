const express = require("express");

const app = express();
const handlebars = require('express-handlebars')
const bodyParser = require('body-parser');
const Post = require('./models/Post');

//config
    // Template Engine
    //const handlebars = require('express-handlebars');

app.engine('handlebars', handlebars.engine({defaultLayout: 'main',runtimeOptions: {
    allowProtoPropertiesByDefault: true,
    allowProtoMethodsByDefault: true, 
}, }));
app.set('view engine', 'handlebars');

// body Parser
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
    

// rotas

    app.get("/", function(req, res){ //ASC do mais antido e DESC do mais novo
        Post.findAll({order: [['id', 'DESC']]}).then(function(posts){
          res.render('home', {posts: posts})
            //nome: "rian", sobrenome: "San"
        })
        
    })

    app.get('/cad', function (req, res) {
        res.render('formulario') //arquivo formulario da views layout
    })
    app.post('/add', function (req, res) {
        Post.create({
            titulo: req.body.titulo,
            conteudo: req.body.conteudo
            
        }).then(function () {
            res.redirect('/')
        }).catch(function(erro){
            res.send('Houve um erro: ' + erro)
        })
        //res.send('texto: ' + req.body.titulo + " conteudo: "+ req.body.conteudo) //arquivo formulario da views layout
    })

    app.get('/deletar/:id', function(req,res){
        Post.destroy({where: {'id': req.params.id}}).then(function(){
            res.send("Postagem removida com sucesso")
        }).catch(function(erro){
            res.send("Esta postagem não existe!")
        })
    })

app.listen(8081, function() {
    console.log("Servidor iniciado em: http://localhost:8081")
});
