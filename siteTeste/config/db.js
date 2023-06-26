if(process.env.NODE_ENV == "production"){
    module.exports = {mongoURI: "mongodb://mongo:55Qg92TVm6WH3PU0l7jc@containers-us-west-71.railway.app:6544"}
}else {
    module.exports = {mongoURI: "mongodb://127.0.0.1/siteteste"}
}