const express = require('express');
const bodyParser = require('body-parser'); 
const cors = require('cors');
const knex = require('knex'); 
const bcrypt = require('bcrypt-nodejs');
const Clarifai = require ('clarifai');
const register = require ('./controllers/register');
const signin = require ('./controllers/signin');
const profile = require ('./controllers/profile');
const image = require ('./controllers/image');


const db = knex({
        client: 'pg',
        connection: {
          host : '127.0.0.1',
          user : '',
          password : '',
          database : 'brainface'
        }
      });

const app = express();

app.use(cors())
app.use(bodyParser.json()); 


app.listen(3001, () => {
    console.log('app is running on port 3001');
})

app.post('/signin', (req, res) => { signin.handleSignin(req, res, db, bcrypt) })
app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) })
app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, db)})
app.put('/image', (req, res) => { image.handleImage(req, res, db)}) 
app.post('/imageurl', (req, res) => { image.handleApiCall(req, res)})

