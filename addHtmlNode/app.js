const express = require("express");

const app = express();

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/html/index.html")
});

app.get("/sobre", (req, res) => {
    res.sendFile(__dirname + "/html/sobre.html")
});

app.listen(8081, () => {
    console.log("server iniciou")
});

CREATE TABLE usuarios(
    nome VARCHAR(50),
    email VARCHAR(100),
    idade INT
);

INSERT INTO usuarios(nome, email, idade) VALUES (
    "joao zao",
    "leosojoao@email.com",
    8
);

DELETE FROM usuarios WHERE nome = "Roberto";

UPDATE usuarios SET nome= "JoaozaoZE" WHERE nome = "joao zao";