const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
    try{
        res.render('home', { shortId: null });
    }catch(err){
        res.json({ error: "Home Page can't be loaded"})
    }
  });

  module.exports = router;