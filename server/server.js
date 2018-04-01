const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const axios = require('axios');  
const controller = require('./controller')
const fs = require('fs');
const PORT = 5000;
app.use(bodyParser.json());

app.get('/api/randomImage', controller.getRandomImage);
 app.get('/api/home', controller.readPlayers);
 app.get('/api/fav', controller.getFavList);
 app.post('/api/fav', controller.addPlayerToFavList);
 app.get('/api/home/comments', controller.getGCComments);
 app.post('/api/home', controller.createGCComments);
 app.put('/api/home/:id', controller.updateGCComments);
 app.get('/api/players/:id', controller.goToPlayerPage);
 app.delete('/api/home/:id', controller.deleteGCComments);
 app.delete('/api/fav', controller.deletePlayerFromList);

app.listen(PORT, () => {
    console.log('Listening on port:', PORT);
})