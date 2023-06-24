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
    const erros = []

    if(req.body.nome.length < 3 || req.body.nome.length == null || req.body.nome.length == undefined) {
        erros.push({texto: "insira um nome válido"})
    }

    if (req.body.email.length <= 10 || req.body.email.length == null || req.body.email.length == undefined) {
        erros.push({texto: "insira um email válido"})
    }

    if (req.body.senha.length <= 5 || req.body.senha.length == null || req.body.senha.length == undefined) {
        erros.push({texto: "insira uma senha válida"})
    }

    if (req.body.senha != req.body.senha2) {
        erros.push({texto: "As senhas estão divergentes"})
    }

    if (erros.length > 0) {
        res.render("usuarios/registro", {erros: erros})
    }else {
        Usuario.findOne({email: req.body.email}).then((usuario) => {
            if (usuario) {
                req.flash("error_msg", "já existe conta com esse email")
                res.redirect("/usuarios/registro")
            }else{
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
            }
        }).catch((err) => {
            req.flash("Houve um erro interno")
            res.redirect("/usuarios/registro")
        })
        
    }
    
    
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

router.get("/logout", (req,res,next)=>{
    req.logOut((err)=>{
        if(err){return next(err)}    
    req.flash('success_msg', "Deslogado com sucesso!")
    res.redirect("/")
    })
})

module.exports = router