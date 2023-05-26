const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const { title } = require('process');

const app = express();

app.use(bodyParser.json());

let books = [
    { id: 1, title: "Livre 1", authorId: 1, categoryId: 1},
    { id: 2, title: "Livre 2", authorId: 2, categoryId: 2},
    { id: 3, title: "Livre 3", authorId: 3, categoryId: 3},
    { id: 4, title: "Livre 4", authorId: 4, categoryId: 4},
];

app.get('/books', async (req, res) => {
    res.json(books)
});

app.get('/books/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    const book = books.find(book => book.id === id);

    if(book){
        try {
            const authorResponse = await axios.get(`http://localhost:4000/authors/${book.authorId}`);
            const categoryResponse = await axios.get(`http://localhost:5000/categories/${book.categoryId}`);
            const author = authorResponse.data;
            const category = categoryResponse.data;

            const bookDetails = {
                id: book.id,
                title: book.title,
                author: author.name,
                category: category.name
            };

            res.json(bookDetails);

        } catch (error){
        res.status(500).json({error: 'Erreur lors de la récupération des détails du livre'});
        }      
    }
    else{
        res.status(404).json({error: 'Livre non trouvé'});
    }
});

app.listen(3000, () => {
    console.log("Microservices de gestion des livres démarré sur le port 3000");
});