import express  from "express";

const app = express();

const router = express.Router();



app.get('/', (req, res) => {
    return res.send("Hello World !!");
})

app.listen(3333);

export default router;