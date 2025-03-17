const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

const GRUPO1_URL = 'https://3f8c-200-129-71-101.ngrok-free.app';
const GRUPO3_URL = 'http://10.10.187.68:8080';

app.get('/api/historia/1', (req, res) => {
    res.json({ 'historia': "e depois caiu no chão de uma queda," });
});

app.get('/api/historia/2', (req, res) => {
    res.json({ 'historia': "Estudantes de TSI após 6 semestres inteiros," });
});

app.get('/api/historia/3', (req, res) => {
    res.json({ 'historia': "terminou o dia matando cada um e fazendo uma cabidela" });
});

const fetchTrecho = async (url, historia) => {
    try {
        const response = await axios.get(`${url}/api/historia/${historia}`);
        return response.data.historia;
    } catch (error) {
        console.error(`Erro ao buscar ${historia} em ${url}:`, error.message);
        return '[Trecho não disponível]';
    }
};

// Endpoint que retorna a história 1 completa
app.get('/api/historia/1/completa', async (req, res) => {
    const g1 = await fetchTrecho(GRUPO1_URL, '1'); 
    const g2 = "e depois caiu no chão de uma queda,"; 
    const g3 = await fetchTrecho(GRUPO3_URL, '1'); 

    res.json({ historia: `${g1} ${g2} ${g3}` });
});

// Endpoint que retorna a história 2 completa
app.get('/api/historia/2/completa', async (req, res) => {
    const g2 = "Estudantes de TSI após 6 semestres inteiros,"; 
    const g3 = await fetchTrecho(GRUPO3_URL, '2'); 
    const g1 = await fetchTrecho(GRUPO1_URL, '2'); 

    res.json({ historia: `${g2} ${g3} ${g1}` });
});

// Endpoint que retorna a história 3 completa
app.get('/api/historia/3/completa', async (req, res) => {
    const g3 = await fetchTrecho(GRUPO3_URL, '3'); 
    const g1 = await fetchTrecho(GRUPO1_URL, '3'); 
    const g2 = "terminou o dia matando cada um e fazendo uma cabidela"; 

    res.json({ historia: `${g3} ${g1} ${g2}` });
});

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
