const express = require("express");
const router = express.Router();

let jogos = [
    {
        id: 1,
        titulo: "Minecraft",
        plataforma: "PC",
        genero:"Sandbox",
        anoLancamento: 2011
    },
    {
        id:2,
        titulo:"Resident Evil 4",
        plataforma:"PC",
        genero:"Ação",
        anoLancamento: 2005
    },
    {
        id:3,
        titulo:"Counter Strike: Global Offensive",
        plataforma:"PC",
        genero:"FPS",
        anoLancamento: 2012
    },
    {
        id:4,
        titulo:"Hollow Knight",
        plataforma:"PC",
        genero:"Aventura",
        anoLancamento: 2017
    },
    {
        id:5,
        titulo:"Super Mario Odyssey",
        plataforma:"Nintendo Switch",
        genero:"Platformer",
        anoLancamento: 2017
    },
    {
        id:6,
        titulo:"The Legend of Zelda: Breath of the Wild",
        plataforma:"Nintendo Switch",
        genero:"Aventura",
        anoLancamento: 2017
    },
    {
        id:7,
        titulo:"Call of Duty: Modern Warfare 4",
        plataforma:"PC",
        genero:"FPS",
        anoLancamento: 2007
    },
    {
        id:8,
        titulo:"God of War 3",
        plataforma:"PS3",
        genero:"Ação",
        anoLancamento: 2010
    }
];

router.get("/", (req, res) => {
    res.json(jogos);
});
router.get("/:id", (req, res) =>{
    const id = Number(req.params.id);
    const jogo = jogos.find( j => j.id === id);

    if(!jogo){
        return res.status(404).json({erro:"Jogo não encontrado"});
    };
    res.json(jogo);
});

router.post("/", (req, res) =>{
    const {titulo, plataforma, genero, anoLancamento} = req.body;

    if(
        !titulo || !plataforma || !genero || 
        anoLancamento === undefined ||
        anoLancamento === null ||
        anoLancamento === ""
    ) {
        return res.status(400).json({erro:"Todos os campos são obrigattórios"});   
    }

    const id = jogos.length > 0
    ? Math.max(...jogos.map(j=> j.id)) + 1
    : 1;

    const novoJogo = {
        id,
        titulo,
        plataforma,
        genero,
        anoLancamento
    };
    jogos.push(novoJogo);

    res.status(201).json(novoJogo);
});

router.put("/:id", (req, res) =>{
    const id = Number(req.params.id);
    const jogo = jogos.find(j => j.id === id);

    if(!jogo){
        return res.status(404).json({erro:"Jogo não existe"});
    }

    const {titulo, plataforma, genero, anoLancamento} = req.body;
    if(
        !titulo || !plataforma || !genero ||
        anoLancamento === undefined ||
        anoLancamento === null ||
        anoLancamento === ""
    ) {
        return res.status(400).json({erro:"Todos precisam ser preenchidos"});
    }

    jogo.titulo = titulo;
    jogo.genero = genero;
    jogo.plataforma = plataforma;
    jogo.anoLancamento = anoLancamento;
    res.json(jogo);
});

router.delete("/:id", (req, res) =>{
    const id = Number(req.params.id);
    const indice = jogos.findIndex(j => j.id === id);

    if(indice === -1) {
        return res.status(404).json({erro:"Jogo não encontrado"});
    }
    jogos.splice(indice, 1);
    res.json({
        mensagem: "Jogo removido com sucesso"
    });
});
module.exports = router;
