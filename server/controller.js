const axios = require('axios');
let playerController = require('./players_controller');
let id = 0;
let comments = [];
let favList = [];
let randomImages = [
    'https://i.pinimg.com/originals/9a/c9/60/9ac9604020ae9d218553c777f1ddc59b.gif',
    'https://i9.photobucket.com/albums/a78/nursetpd/TSB/Lost_James_Johnson_Posters.gif',
    'http://media.giphy.com/media/G2eKBTFEIMwes/giphy.gif',
    'http://31.media.tumblr.com/c6c891cb54e76a19ade5ef3615c6b1f1/tumblr_mmmaweqfxS1renuivo1_500.gif',
    'https://78.media.tumblr.com/5aff304e37ad0f35ae371d3e69f92fb3/tumblr_p3myuifqSq1u2klrwo1_400.gif',
    'https://i.pinimg.com/originals/7e/43/a5/7e43a5bf4d0d80ddb0139d39e89d468b.gif'
  ];

//Define a method getting a random ten numbers.
let { players } = playerController;
//randomize the array of players.
let copyOfPlayers = players.slice();

copyOfPlayers.filter((cp, i, a) => a[i] !== a[i + 1] || a[i + 1 !== a[i + 2]])

copyOfPlayers.filter(cp => cp !== undefined)
module.exports = {
    //DO NOT LOOK AT THIS! THIS IS AUTHENTICATION <---- WEEK 5 Stuff
    //////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////
    login: (req, res) => {
        axios.post(`https://${process.env.REACT_APP_AUTH0_DOMAIN}/oauth/token/`, {
            client_id: process.env.REACT_APP_CLIENT_ID,
            client_secret: process.env.REACT_APP_CLIENT_SECRET,
            code: req.query.code,
            grant_type: 'authorization_code',
            redirect_uri: `http://${req.headers.host}/auth/callback`,
        }).then(accessTokenRes => {
            //Use the https protocol in the get request inside in post request. 
            //access_token is a query parameter.
            return axios.get(`https://${process.env.REACT_APP_AUTH0_DOMAIN}/userInfo?access_token=${accessTokenRes.data.access_token}`).then(userInfoRes => {
                const userData = userInfoRes.data;
                console.log('---------------------userData', userData);
                req.session.user = userData;
                console.log(req.session.user);
                res.redirect('/');
            }).catch(err => {
                res.json({message: 'Something gone wrong!'});
            })
        }).catch(err => {
            console.log('------------------error', err);
            res.json({message: 'Something has gone wrong!!!!!'});
        });
    },
    logout: (req, res) => {
        req.session.destroy();
        res.send(req.session.user);
    },
    getSessionData: (req, res) => {
        res.send(req.session.user);
    },
    //////////////////////////////////////
    ////////////////////////////////////
    ////////////////////////////////////
    //Get random image
    getRandomImage: (req, res) => {
        let randomNumber = Math.floor(Math.random() * randomImages.length);
        let img = randomImages[randomNumber];
        res.status(200).send(img);
    },
    //Read Players.
    readPlayers: (req, res) => {

    //Push the first nine players from the array.
    let arr = [];
    for(let i = 0; i < 10; i++) { 
        (arr.includes(copyOfPlayers[i]) ? arr.push(copyOfPlayers[i + 1]) : arr.push(copyOfPlayers[i]))
    }
    let newArr = [arr, copyOfPlayers];
    res.status(200).send(newArr);
    },
    getFavList: (req, res) => {
        res.status(200).send(favList);
    },
    addPlayerToFavList: (req, res) => {
        let { firstName, lastName, id } = req.body;
        favList = favList.filter((p, i, a) => p.id !== id);
        let newFavPlayer = {
            firstName,
            lastName, 
            id
        };
        favList.push(newFavPlayer)
        res.status(200).send(favList);
    },
    deletePlayerFromList: (req, res) => {
        let { id } = req.body;
        favList = favList.filter((p, i, a) =>   p.id !== id );
        console.log(favList);
        res.status(200).send(favList);
    },
    //General Comments<--ON homepage
    getGCComments: (req, res) => {
        res.status(200).send(comments);
    },
    createGCComments: (req, res) => {
        let { comment } = req.body;
        let newCommment = {
            id, 
            comment,
            date: new Date(),
        }
        id++;
        comments.push(newCommment);
        res.status(200).send(comments);
    },
    updateGCComments: (req, res) => {
        let { comment } = req.body;
        let { id } = req.params;
        comments[id] = Object.assign({
            id,
            comment: comment || comments[id].comment,
            date: new Date(),
        })
        res.status(200).send(comments);
    },
    deleteGCComments:(req, res) => {
        let { id } = req.params;
        comments.splice(id, 1);
        id--;
        res.status(200).send(comments);
    },
    goToPlayerPage: (req, res) => {
        let { id } = req.params;
        let playerInfo = players.filter(p => p.id === id)[0];
        res.status(200).send(playerInfo);
    },
}