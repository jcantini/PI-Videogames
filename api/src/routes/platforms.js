var express = require('express');
const {apikey} = require('../db');
var router = express.Router();
const axios = require('axios');

//Search all videogames platforms
router.get('/', async (req, res) => {  
    var apiresult = await axios.get(`https://api.rawg.io/api/platforms/lists/parents?key=${apikey}`)
    var apivgplat = apiresult.data.results.map(p => p.name)
    res.send(apivgplat)
})    
module.exports = router;