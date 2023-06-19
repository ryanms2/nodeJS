const express = require("express")
const mongoose = require("mongoose")
const router = express.Router()
require("../models/Categoria")
const Categoria = mongoose.model("categorias")

router.get("/", (req, res) => {
    res.render("admin/index")
})

router.get("/postagens", (req, res) => {
    res.render("admin/postagens")
})

router.get("/postagens/add", (req, res) => {
    res.render("admin/addpostagem")
})

router.get("/categorias", (req, res) => {
    Categoria.find().sort({date: 'desc'}).then((categorias) => {
        res.render("admin/categorias", {categorias: categorias})
       }).catch((err) => {
           req.flash("error_msg", "Houve um erro ao listar as categorias")
           res.redirect("/admin")
       })
})
router.get("/categorias/add", (req, res) => {
    res.render("admin/addcategoria")
})
router.post("/categorias/novo", (req, res) => {
    var erros = []

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

router.post("/categorias/deletar", (req, res) => {
    Categoria.deleteOne({_id: req.body.id}).then(() => {
        req.flash("success_msg", "Categoria deletada com sucesso")
        res.redirect("/admin/categorias")
    }).catch((err) => {
        req.flash("error_msg", "Houve um erro ao remover a categoria")
        res.redirect("/admin/categorias")
    })
})

router.get("/categorias/edit/:id", (req, res) => {
    Categoria.findOne({_id: req.params.id}).then((categoria) =>{
        res.render("admin/editcategoria", {categoria: categoria})
    }).catch((err) => {
        req.flash("error_msg", "Essa categoria não existe")
        res.redirect("/admin/categorias")
    })
})

router.post("/categorias/edit/", (req, res) => {
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
