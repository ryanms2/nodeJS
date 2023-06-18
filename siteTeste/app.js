const express = require("express")
const app = express()
const handlebars = require("express-handlebars")
const bodyParser = require("body-parser")
const path = require("path")
const admin = require("./routes/admin")
const mongoose = require("mongoose")

// Handlebars
app.engine('handlebars', handlebars.engine({
    defaultLayout: 'main', runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true,
    }
}))
app.set('view engine', 'handlebars')

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

mongoose.Promise = global.Promise;
    mongoose.connect("mongodb://127.0.0.1/siteteste", {
        useNewUrlParser: true
    }).then(()=> {
        console.log("conectado com sucesso!")
    }).catch((err) => {
        console.log("Erro ao se conectar: "+ err)
    })

app.use(express.static(path.join(__dirname, "public")))



app.use("/admin", admin)

app.get("/", (req, res) => {
    res.render("index")
})

const PORT = 8089
app.listen(PORT, () => {
    console.log("servidor rodando!")
})