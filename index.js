require('dotenv').config();

const express = require('express');
const path = require('path');
const urlRouter = require('./routes/url')
const staticRouter = require('./routes/staticRouter')

const {connectMongoDb} = require('./connection');
const exp = require('constants');


const PORT = process.env.PORT || 3000;
const MONGO_URL = process.env.MONGO_URL;
 
const app = express();

app.set("view engine","ejs");
app.set('views',path.resolve('./views'));


//Connect mongo db
connectMongoDb(MONGO_URL)
.then(()=>console.log('Connected to Mongo Db'))
.catch((err)=>console.log("Failed to connect mongodb",err))

//Any api call starting with /url will be handled by urlRouter
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use('/url',urlRouter);
app.use('/',staticRouter);
 

app.listen(PORT,()=>console.log(`Listening on PORT:${PORT}`));