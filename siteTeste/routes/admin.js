const express = require("express")
const mongoose = require("mongoose")
const router = express.Router()
require("../models/Categoria")
const Categoria = mongoose.model("categorias")
require("../models/Postagem")
const Postagem = mongoose.model("postagens")

const {eAdmin} = require("../helpers/eAdmin")

router.get("/", eAdmin, (req, res) => {
    res.render("admin/index")
})

router.get("/postagens", eAdmin, (req, res) => {
    Postagem.find().populate("categoria").sort({date: "desc"}).then((postagens) => {
      res.render("admin/postagens", {postagens: postagens})  
    }).catch((err) => {
        req.flash("error_msg", "Houve um erro ao mostrar a lista de postagens")
    })
    
})

router.get("/postagens/add", eAdmin, (req, res) => {
    Categoria.findOne().then((categorias) => {
        res.render("admin/addpostagem", {categorias: categorias})
    })
    
})

router.post("/postagens/add", eAdmin, (req, res) => {
    const erros = []
    
    if (req.body.titulo.length < 4 || req.body.titulo.length == null || typeof req.body.titulo == undefined) {
        erros.push({texto: "Insira um titulo válido"})
    }

    if(req.body.descricao.length < 10 || req.body.descricao.length == null || typeof req.body.descricao == undefined){
        erros.push({texto: "Insira uma descrição maior"})
    }
    
    if (!req.body.conteudo || req.body.conteudo.length == null || typeof req.body.conteudo == undefined) {
        erros.push({texto: "Insira um conteudo maior"})
    }

    if(!req.body.categoria || req.body.categoria.length == null || typeof req.body.categoria == undefined) {
        erros.push({texto: "Insira uma categoria válida"})
    }

    if (erros.length > 0) {
        res.render("admin/addpostagem", {erros: erros})
    } else {
        const novaPostagem = {
        titulo: req.body.titulo,
        descricao: req.body.descricao,
        conteudo: req.body.conteudo,
        categoria: req.body.categoria,
        slug: req.body.slug
        }

        new Postagem(novaPostagem).save().then(() => {
            req.flash("success_msg", "Postagem salva com sucesso")
            res.redirect("/admin/postagens")
        }).catch((err) => {
            req.flash("error_msg", "Houve um erro ao adicionar postagem")
            res.redirect("/admin/postagens")
        })
    }
    
})

router.post("/postagens/deletar", eAdmin, (req, res) => {
    Postagem.deleteOne({_id: req.body.id}).then(() => {
        req.flash("success_msg", "Postagem deletada com sucesso")
        res.redirect("/admin/postagens")
    }).catch((err) => {
        req.flash("error_msg", "Houve um erro ao deletar postagem")
        res.redirect("/admin/postagens")
    })
})

router.get("/postagens/edit/:id", eAdmin, (req, res) => {
    Postagem.findOne({_id: req.params.id}).then((postagem) => {
        Categoria.find().then((categoria) => {

            res.render("admin/editpostagens", {categoria: categoria, postagem: postagem})

        }).catch((err) => {
            req.flash("error_msg", "Houve um erro ao listar a categoria")
            res.redirect("/admin/postagens")
        })
        
    }).catch((err) => {
        req.flash("error_msg", "Houve um erro ao listar a postagem")
        res.redirect("/admin/postagens")
    })
})

router.post("/postagens/edit", eAdmin, (req, res) => {
    const erros = []
    
    if (req.body.titulo.length < 4 || req.body.titulo.length == null || typeof req.body.titulo == undefined) {
        erros.push({texto: "Insira um titulo válido"})
    }

    if(req.body.descricao.length < 10 || req.body.descricao.length == null || typeof req.body.descricao == undefined){
        erros.push({texto: "Insira uma descrição maior"})
    }
    
    if (!req.body.conteudo || req.body.conteudo.length == null || typeof req.body.conteudo == undefined) {
        erros.push({texto: "Insira um conteudo maior"})
    }

    if(!req.body.categoria || req.body.categoria.length == null || typeof req.body.categoria == undefined) {
        erros.push({texto: "Insira uma categoria válida"})
    }

    if (erros.length > 0) {
        res.render("admin/editpostagens", {erros: erros})
    }else {
    Postagem.findOne({_id: req.body.id}).then((postagem) => {
        postagem.titulo = req.body.titulo
        postagem.descricao = req.body.descricao
        postagem.conteudo = req.body.conteudo
        postagem.categoria = req.body.categoria
        postagem.slug = req.body.slug

        postagem.save().then(() => {
            req.flash("success_msg", "Postagem editada com sucesso!")
            res.redirect("/admin/postagens")
        }).catch((err) => {
            req.flash("error_msg", "Houve um erro ao editar a postagem")
            res.redirect("/admin/postagens")
        })
    })
    }
    
})

router.get("/categorias", eAdmin, (req, res) => {
    Categoria.find().sort({date: 'desc'}).then((categorias) => {
        res.render("admin/categorias", {categorias: categorias})
       }).catch((err) => {
           req.flash("error_msg", "Houve um erro ao listar as categorias")
           res.redirect("/admin")
       })
})
router.get("/categorias/add", eAdmin, (req, res) => {
    res.render("admin/addcategoria")
})
router.post("/categorias/novo", eAdmin, (req, res) => {
    var erros = []

    if(req.body.titulo.length < 3 || req.body.titulo == null || req.body.titulo == undefined) {
        
    }

    const novaCategoria = {
        titulo: req.body.titulo,
        slug: req.body.slug
    }

    new Categoria(novaCategoria).save().then(() => {
        req.flash("success_msg", "Categoria salva com sucesso")
        res.redirect("/admin/categorias")
    }).catch((err) => {
        req.flash("error_msg", "Ouve um erro ao salva a categoria")
        res.redirect("/admin/categorias")
    })
})

router.post("/categorias/deletar", eAdmin, (req, res) => {
    Categoria.deleteOne({_id: req.body.id}).then(() => {
        req.flash("success_msg", "Categoria deletada com sucesso")
        res.redirect("/admin/categorias")
    }).catch((err) => {
        req.flash("error_msg", "Houve um erro ao remover a categoria")
        res.redirect("/admin/categorias")
    })
})

router.get("/categorias/edit/:id", eAdmin, (req, res) => {
    Categoria.findOne({_id: req.params.id}).then((categoria) =>{
        res.render("admin/editcategoria", {categoria: categoria})
    }).catch((err) => {
        req.flash("error_msg", "Essa categoria não existe")
        res.redirect("/admin/categorias")
    })
})

router.post("/categorias/edit/", eAdmin, (req, res) => {
    Categoria.findOne({_id: req.body.id}).then((categoria) => {
        categoria.titulo = req.body.titulo
        categoria.slug = req.body.slug

        if(categoria.titulo.length < 3 || categoria.titulo.length == undefined || categoria.slug.length < 3 || categoria.slug == undefined){
            req.flash("error_msg", "Erro ao editar categoria")
            res.redirect("/admin/categorias")
        } else {
            categoria.save().then(() => {
            req.flash("success_msg", "Categoria deletada com sucesso")
            res.redirect("/admin/categorias")
            }).catch((err) => {
            req.flash("error_msg", "Erro ao editar categoria")
            res.redirect("/admin/categorias")
            })
            
        }
        
    })
})

module.exports = router
