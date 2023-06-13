const express = require("express");

const app = express();

app.get("/", function(req, res){
    res.send("Seja bem-vindo ao meu app!!!!!")
});

app.get("/sobre", function(req, res) {
    res.send("Minha pagina sobre")
});

app.get("/blog", function(req, res) {
    res.send("bem-vindo ao meu blog")
})

app.get("/ola/:nome/:prof/:cor", (req, res) => {
    res.send(`ola ${req.params.nome}, voce trabalha na ${req.params.prof} e sua cor preferida é ${req.params.cor}`)
})

app.listen(8081, function() {
    console.log("Servidor iniciado em: http://localhost:8081")
});