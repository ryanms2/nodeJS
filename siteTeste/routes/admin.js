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
    res.render("admin/categorias")
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
        console.log("categoria salva")
    }).catch((err) => {
        console.log("erro ao salvar")
    })
})

module.exports = router
