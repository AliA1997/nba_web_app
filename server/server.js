require('dotenv').config();
const express = require('express');
const app = express();
const session = require('express-session');
const cors = require('cors');
const bodyParser = require('body-parser');
const controller = require('./controller')
const fs = require('fs');
const PORT = 5000;
app.use(bodyParser.json());
app.use(cors());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false, 
    cookie: {
        maxAge: 1000 * 60 * 5,
    }
}))

//Define some middleware 
function checkLoggedIn(req, res, next) {
    if(req.user.session) next();
    else res.send(403).json({message: 'unauthorized!!!'});
}

//Login and Logout functionality 
 app.get('/auth/callback', controller.login);
 app.post('/api/logout', controller.logout);
 app.get('/api/user-data', controller.getSessionData);
 //Secure data 
 app.get('/api/user-secure-data', checkLoggedIn, (req, res) => {
    res.status(403).json({message: 'authorized!!'});
 })
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