const express = require('express');
const urlRouter = require('./routes/url')
const {connectMongoDb} = require('./connection')
require('dotenv').config();


const PORT = process.env.PORT || 3000;
const MONGO_URL = process.env.MONGO_URL;
 
const app = express();

app.get('/', (req, res) => {
    res.send(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>URL Shortener</title>
          <style>
              body {
                  font-family: Arial, sans-serif;
                  margin: 20px;
              }
              h1 {
                  color: #333;
              }
              p {
                  margin: 5px 0;
              }
              .route {
                  font-family: monospace;
                  background-color: #f4f4f4;
                  padding: 10px;
                  border-radius: 5px;
                  margin-top: 10px;
              }
          </style>
      </head>
      <body>
          <h1>URL Shortener</h1>
          <p>Made by: Harsh</p>
          <h2>Routes:</h2>
          <div class="route">
              <strong>POST - /url</strong><br>
              Send a URL as JSON body to shorten.
          </div>
          <div class="route">
              <strong>GET - /url/:shortId</strong><br>
              Redirects to the original URL.
          </div>
          <div class="route">
              <strong>GET - /url/analytics/:shortId</strong><br>
              Retrieves analytics for the given shortId.
          </div>
      </body>
      </html>
    `);
  });
  

//Connect mongo db
connectMongoDb(MONGO_URL)
.then(()=>console.log('Connected to Mongo Db'))
.catch((err)=>console.log("Failed to connect mongodb",err))

//Any api call starting with /url will be handled by urlRouter
app.use(express.json());
app.use('/url',urlRouter);
 

app.listen(PORT,()=>console.log(`Listening on PORT:${PORT}`));