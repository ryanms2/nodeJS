import router from "../src/index";

export default [
    router.get('/', (req, res) => {
        res.send("Ola");
    }),

    router.get('/users', (req, res) => {
        res.status(200).send("Olaa")
    })
]

