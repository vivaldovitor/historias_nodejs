const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

const GRUPO1_URL = 'http://192.168.X.Y:PORT';  
const GRUPO3_URL = 'http://192.168.X.Y:PORT';  

app.get('/h1', (req, res) => {
    res.json({ trecho: "e depois caiu no chão de uma queda," });
});

app.get('/h2', (req, res) => {
    res.json({ trecho: "Estudantes de TSI após 6 semestres inteiros," });
});

app.get('/h3', (req, res) => {
    res.json({ trecho: "terminou o dia matando cada um e fazendo uma cabidela" });
});


const fetchTrecho = async (url, historia) => {
    try {
        const response = await axios.get(`${url}/${historia}`);
        return response.data.trecho;
    } catch (error) {
        console.error(`Erro ao buscar ${historia} em ${url}:`, error.message);
        return '[Trecho não disponível]';
    }
};


app.get('/h1/completa', async (req, res) => {
    const g1 = await fetchTrecho(GRUPO1_URL, 'h1'); 
    const g2 = "e depois caiu no chão de uma queda,"; 
    const g3 = await fetchTrecho(GRUPO3_URL, 'h1'); 

    const historiaCompleta = `${g1} ${g2} ${g3}`;
    res.json({ historia: historiaCompleta });
});

// História 2 completa
app.get('/h2/completa', async (req, res) => {
    const g2 = "Estudantes de TSI após 6 semestres inteiros,"; 
    const g3 = await fetchTrecho(GRUPO3_URL, 'h2'); 
    const g1 = await fetchTrecho(GRUPO1_URL, 'h2'); 

    const historiaCompleta = `${g2} ${g3} ${g1}`;
    res.json({ historia: historiaCompleta });
});

// História 3 completa
app.get('/h3/completa', async (req, res) => {
    const g3 = await fetchTrecho(GRUPO3_URL, 'h3'); 
    const g1 = await fetchTrecho(GRUPO1_URL, 'h3'); 
    const g2 = "terminou o dia matando cada um e fazendo uma cabidela"; 
    const historiaCompleta = `${g3} ${g1} ${g2}`;
    res.json({ historia: historiaCompleta });
});

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
