const express = require('express');
const {handleCreateShortUrl, redirectToOriginalUrl, handleGetAnalyticsForId} = require('../controllers/url')

const router = express.Router();

router.post('/',handleCreateShortUrl)

router.get('/:shortId',redirectToOriginalUrl)

router.get('/analytics/:shortId',handleGetAnalyticsForId)

 module.exports = router;