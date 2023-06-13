const Sequelize = require('sequelize');

const sequelize = new Sequelize('teste', 'root','123456',{
    
    host: 'localhost',
    dialect: 'mysql',
});

sequelize.authenticate().then(function(){
    console.log('conectado com sucesso!')
}).catch(function(error){
    console.log("erro ao se conectar: "+ error)
});

const Postagem = sequelize.define('postagens', {
    titulo: {
        type: Sequelize.STRING
    },
    conteudo: {
        type: Sequelize.TEXT
    }
});

//Postagem.sync({force: true})

//Postagem.create({
//    titulo: "Um titulo quququq",
//    conteudo: "lerururlerurue"
//});

const Usuario = sequelize.define('usuarios', {
    nome: {
        type: Sequelize.STRING
    },
    sobrenome: {
        type: Sequelize.STRING
    },
    idade: {
        type: Sequelize.INTEGER
    },
    email: {
        type: Sequelize.STRING
    }
});

/*Usuario.create({
    nome: 'Rian',
    sobrenome: 'santos',
    idade: 19,
    email: 'RianLindao@gemail.com'
});*/

