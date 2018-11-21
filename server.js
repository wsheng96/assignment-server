const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const db = require("./config/Key").mongoURI ;
const axios =require('axios');
const cors = require('cors');

const app = express();
const Item = require('./models/Item');
const Item2 = require('./models/Item2');

//body parser + Cors
app.use(cors());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

const port = 5000;

//Get 3rd Party API 
app.get('/getgame', (req, res) => {
  const URL = 'http://api.crackwatch.com/api/games';
  axios
    .get(URL)
    .then(function(response) {
      res.send(response.data);
      res.status(200).json(response);
    })
    .catch(function(error) {
      res.send(error);
      res.status(404).json(error);
    });
});

//News API Key
//News Api Get
const apiKey = '81d32b01c66a4e208bbcd2f38a6f3888';
const url2 = `https://newsapi.org/v2/top-headlines?sources=ign&apiKey=${apiKey}`;
const url3 = `https://newsapi.org/v2/top-headlines?sources=polygon&apiKey=${apiKey}`;

app.get('/getgamenews', (req, res) => {
  axios.get(url2)
    .then((response) => {
      res.send(response.data);
    })
    .catch((error) => {
      console.log(error);
    })
});

app.get('/getgamenews2', (req, res) => {
  axios.get(url3)
    .then((response) => {
      res.send(response.data);
    })
    .catch((error) => {
      console.log(error);
    })
});

//Connect to mongooseDB
 mongoose
  .connect(
   db, { useNewUrlParser: true })
  .then(() => {
     console.log('Connected to mongodb...');
   })
   .catch(error => {
     console.log('MongoDB connected error' + error);
   });

//Get Mongo DB data
   app.get('/getsavedgames', (req, res) => {
    Item.find()
     .then(game => {
       res.send(game);
       res.status(200),json(game);
     })
     .catch (error => {
        res.send(error);
       res.status(404).json(error);
     })
   })

   app.post('/getsavedgames/add', (req, res) => {
     const array = [{
      title: req.body.title,
      link: req.body.link,
      image: req.body.image,
      releaseDate: req.body.releaseDate,
      originalPrice: req.body.OriginalPrice,
      ratings: req.body.ratings
     }];
     console.log(array);
     Item.insertMany(array)
     .then (res => {
        res.send(res);
        res.status(200).json(res);
     })
     .catch (error => {
       res.send(error);
       res.status(404).json(error);
     });
   })

  app.post('/getsavedgames/delete', (req, res) => {
    console.log(req.body.title);
    const query = {
      title : req.body.title
    };
    Item.deleteOne(query)
    .then(res=>{
      res.send(res);
      res.status(200).json(res);
    })
    .catch(err=>{
      res.send(err);
      res.status(400).json(err);
    });
  })

   //Get Mongo DB data from game news
   app.get('/getsavednews', (req, res) => {
    Item2.find()
     .then(game => {
       res.send(game);
       res.status(200),json(game);
     })
     .catch (error => {
        res.send(error);
       res.status(404).json(error);
     })
   })

   app.post('/getsavednews/add', (req, res) => {
     const array = [{
      title: req.body.title,
      description: req.body.description,
      urlToImage: req.body.urlToImage,
      publishedAt: req.body.publishedAt,
      url: req.body.url
     }];
     console.log(array);
     Item2.insertMany(array)
     .then (res => {
        res.send(res);
        res.status(200).json(res);
     })
     .catch (error => {
       res.send(error);
       res.status(404).json(error);
     });
   })

   app.post('/getsavednews/delete', (req, res) => {
    console.log(req.body.title);
    const query = {
      title : req.body.title
    };
    Item2.deleteOne(query)
    .then(res=>{
      res.send(res);
      res.status(200).json(res);
    })
    .catch(err=>{
      res.send(err);
      res.status(400).json(err);
    });
  })

  var Users = require('./routes/Users');
  app.use(Users);

   app.listen(port, () => {
    console.log(`Connecting to port ${port}...`);
  });
