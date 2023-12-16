const Url = require('../models/Url')
const shortid = require("shortid")


module.exports.fetchurl = async (req, res) => {

    try {
        const urls = await Url.find({ user: req.user.id });
        res.json(urls);
    } catch (error) {
        console.log(error);
    }
}


module.exports.shorten = async (req, res) => {
    try {
        const { originalUrl } = req.body;

        const existingUrl = await Url.findOne({ originalUrl });
        if (existingUrl) {
            return res.json({ url: existingUrl });
        }

        // Create a new short URL
        const shortUrl = shortid();
        const newUrl = new Url({ originalUrl, shortUrl, user: req.user.id });

        // Save to the database     
        const saveurl = await newUrl.save();

        res.json({ url: saveurl });
    } catch (er) {
        console.log(er.message)
    }
}

module.exports.click = async (req, res) => {
    try {
        const { shortUrl } = req.params;

        // Find the original URL in the database
        const url = await Url.findOne({ shortUrl });

        if (!url) {
            return res.json({ error: 'URL not found' });
        }

        // Increment click count
        url.clicks++;
        await url.save();

        //res.json("Url has been clicked")
        res.redirect(url.originalUrl);
    } catch (er) {
        console.log(er.message)
    }
}




