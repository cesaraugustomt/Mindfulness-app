const bodyParser = require('body-parser')
const express = require("express")
const app = express()
const router = require("./src/routes/routes")
const cors = require("cors");
const { PORT, HOST} = process.env;

app.use(cors());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

app.use("/",router);

app.listen(PORT, HOST,() => {
    console.log("Servidor rodando!")
});

//exportação necessária para testar a porta. 
module.exports = app;