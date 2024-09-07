const express = require('express');
const urlRouter = require('./routes/url')
const {connectMongoDb} = require('./connection')
 

const PORT = process.env.PORT;
const MONGO_URL = process.env.MONGO_URL;

const app = express();

//Connect mongo db
connectMongoDb(MONGO_URL)
.then(()=>console.log('Connected to Mongo Db'))
.catch((err)=>console.log("Failed to connect mongodb",err))

//Any api call starting with /url will be handled by urlRouter
app.use(express.json());
app.use('/url',urlRouter);
 

app.listen(PORT,()=>console.log(`Listening on PORT:${PORT}`));