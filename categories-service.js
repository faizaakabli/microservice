const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

let categories = [
    { id: 1, name: "az"},
    { id: 2, name: "bm"},
    { id: 3, name: "jj"},
    { id: 4, name: "yg"},
];

app.get('/categories', async (req, res) => {
    res.json(categories)
});

app.get('/categories/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    const category = categories.find(category => category.id === id);

    if(category){
        res.json(category)
    }
    else{
        res.status(404).json({error: 'Categorie non trouvé'});
    }
});

app.listen(5000, () => {
    console.log("Microservices de gestion des categories démarré sur le port 5000")
});