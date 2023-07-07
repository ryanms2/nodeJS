const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());

app.use(express.json());

// db connection
const conn = require("./src/db/conn");

conn();

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`servidor rodando na porta ${PORT}`));