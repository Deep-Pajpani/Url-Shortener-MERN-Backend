const { fetchurl, click ,shorten} = require("../controllers/urlController");
var fetchUserdata = require('../controllers/fetchUserdata');

const router = require("express").Router();

router.get("/fetchurl",fetchUserdata,fetchurl);
router.get("/:shortUrl",click);
router.post("/shorten",fetchUserdata,shorten);

module.exports = router;