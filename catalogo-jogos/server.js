const express = require("express");
const app = express();
const jogosRoutes = require("./jogosRoutes");

app.use(express.json());
app.use((req, res, next) =>{
    console.log(`${req.method} ${req.url}`)
    next();
});

app.use("/jogos", jogosRoutes);

app.use((req, res) => {
    res.status(400).json({erro:"Rota não encontrada"});
});

app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000, em http://localhost:3000");
});
