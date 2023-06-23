const express = require("express")
const mongoose = require("mongoose")
const router = express.Router()
require("../models/Usuario")
const Usuario = mongoose.model("usuarios")
const bcrypt = require("bcryptjs")
const passport = require("passport")

router.get("/registro", (req, res) => {
    res.render("usuarios/registro")
})

router.post("/registro", (req, res) => {
    
    const novoUsuario = new Usuario({
        nome: req.body.nome,
        email: req.body.email,
        senha: req.body.senha
    })

    bcrypt.genSalt(10, (erro, salt) => {
        bcrypt.hash(novoUsuario.senha, salt, (erro, hash) => {
            if (erro) {
                req.flash("error_msg", "Hove um erro durante o salvamento do usuario")
                res.redirect("/")
            }

            novoUsuario.senha = hash

            novoUsuario.save().then(() => {
                req.flash("success_msg", "Usuário criado com sucesso!")
                res.redirect("/")
            }).catch((err) => {
                req.flash("error_msg", "Erro ao criar o usuário, tente novamente")
                res.redirect("/usuarios/registro")
            });
        })
    })
})

router.get("/login", (req, res) => {
    res.render("usuarios/login")
})

router.post("/login", (req, res, next) => {
    passport.authenticate("local",{
        successRedirect: "/",
        failureRedirect: "/usuarios/login",
        failureFlash: true
    })(req, res, next)
})

router.get("/logout", (req, res) => {
    req.logOut()
    req.flash("success_msg", "Deslogado com sucesso")
    res.redirect("/")
})

module.exports = router