const URL = require("../models/url");


async function handleCreateShortUrl(req, res) {
  try{
    const body = req.body;
    console.log(body);
    let originalUrl = body.url.trim();

    const { nanoid } = await import('nanoid');
  
    if (!originalUrl) {
      return res.status(400).json({ error: "Url is needed to be shorten" });
    }

    if (
      !originalUrl.startsWith("http://") &&
      !originalUrl.startsWith("https://")
    ) {
      originalUrl = "http://" + originalUrl;
    }

  
    const shortId = nanoid(8);
    await URL.create({
      shortId: shortId,
      redirectedUrl: originalUrl,
      visitHistory: []
    });
  
    //return res.json({ status: "Success", shortId: shortId });
    return res.render('home',{ shortId: shortId });
  }catch(err){
    console.log('Error Generating Url',err);
    return res.status(500).json({ error: "Cannot generate url, please try again."})
  }

}

async function redirectToOriginalUrl(req,res) {
  try{
    const shortId = req.params.shortId;
    const result = await URL.findOneAndUpdate({shortId},{
      $push:{
        visitHistory:{
          timestamp:Date.now()
        }
      }
    },
    { new: true });

    console.log(result)

    if(!result){
      return res.status(400).json({ message: "Invalid id"});
    }

    const originalUrl = result.redirectedUrl;

    return res.redirect(originalUrl);


  }catch(err){
    console.log('Error Generating Url',err);
    return res.status(500).json({ error: "Cannot get url, please try again."})
  }
}

async function handleGetAnalyticsForId(req,res) {
  try{
    const shortId = req.params.shortId;
    const result = await URL.findOne({shortId});
 
    if(!result){
      return res.status(400).json({ message: "Invalid id"});
    }

    return res.json({
      totalClicks: result.visitHistory.length,
      analytics: result.visitHistory
    });


  }catch(err){
    console.log('Error Generating Url',err);
    return res.status(500).json({ error: "Cannot get url, please try again."})
  }
}


module.exports = {
  handleCreateShortUrl,
  redirectToOriginalUrl,
  handleGetAnalyticsForId
};
