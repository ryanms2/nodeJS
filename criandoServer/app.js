var http = require('http');

http.createServer(function(req, res) {
    return res.end("Ola");
}).listen(8081);
// toda alteração tem que reiniciar o servidor do node, nessa estrutura

console.log("Servidor rodando!")